import { BadRequestException, Injectable } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common/exceptions'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { returnUserObject } from './return-user.object'
import { UserDto } from './user.dto'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	async getWatchLater(id: number) {
		const watchLater = await this.prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				watchLater: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		})
		return watchLater
	}
	async byId(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				...returnUserObject,
				watchLater: {
					select: {
						id: true,
						name: true,
					},
				},
				...selectObject,
			},
		})

		if (!user) {
			throw new Error('User not found')
		}

		return user
	}
	async updateProfile(id: number, dto: UserDto) {
		const isSameUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
			},
		})
		if (isSameUser && id != isSameUser.id) {
			throw new BadRequestException('Email already in use')
		}
		const user = await this.byId(id)

		return this.prisma.user.update({
			where: {
				id,
			},
			data: {
				email: dto.email,
				name: dto.name,
				avatarPath: dto.avatarPath,
				phone: dto.phone,
				password: dto.password ? await hash(dto.password) : user.password,
				isAdmin:
					dto.isAdmin || dto.isAdmin === false ? dto.isAdmin : user.isAdmin,
			},
		})
	}

	async toggleWatchLater(userId: number, filmId: number) {
		const user = await this.byId(userId)
		if (!user) throw new NotFoundException('User not found')
		const isExists = user.watchLater.some(film => film.id == filmId)
		await this.prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				watchLater: {
					[isExists ? 'disconnect' : 'connect']: {
						id: filmId,
					},
				},
			},
		})
		return 'Success'
	}
}
