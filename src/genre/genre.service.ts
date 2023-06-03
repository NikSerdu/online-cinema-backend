import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { GenreDto } from './genre.dto'
import { returnGenreObject } from './return-genre.object'

@Injectable()
export class GenreService {
	constructor(private prisma: PrismaService) {}
	async byId(id: number) {
		const genre = await this.prisma.genre.findUnique({
			where: {
				id,
			},
			select: returnGenreObject,
		})

		if (!genre) {
			throw new NotFoundException('Category not found')
		}

		return genre
	}
	async bySlug(slug: string) {
		const category = await this.prisma.genre.findUnique({
			where: {
				slug,
			},
			select: returnGenreObject,
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}
	async getAll() {
		return this.prisma.genre.findMany({
			select: returnGenreObject,
		})
	}
	async update(id: number, dto: GenreDto) {
		return this.prisma.genre.update({
			where: {
				id,
			},
			data: {
				name: dto.name,
				slug: generateSlug(dto.name),
			},
		})
	}
	async delete(id: number) {
		return this.prisma.genre.delete({
			where: {
				id,
			},
		})
	}
	async create() {
		return this.prisma.genre.create({
			data: {
				name: '',
				slug: '',
			},
		})
	}
}
