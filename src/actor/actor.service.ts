import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ActorDto } from './actor.dto'
import { returnActorObject } from './return-actor.object'

@Injectable()
export class ActorService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.actor.findMany({
			select: returnActorObject,
		})
	}
	async getById(id: number) {
		return this.prisma.actor.findUnique({
			where: {
				id,
			},
		})
	}
	async create() {
		return this.prisma.actor.create({
			data: {
				name: '',
				image: '',
			},
		})
	}
	async update(id: number, dto: ActorDto) {
		const { name, image, filmId } = dto
		return this.prisma.actor.update({
			where: {
				id,
			},
			data: {
				name,
				image,
				films: {
					connect: {
						id: filmId,
					},
				},
			},
		})
	}
	async delete(id: number) {
		return this.prisma.actor.delete({
			where: {
				id,
			},
		})
	}
}
