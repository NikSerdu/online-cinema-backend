import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { FilmDto } from './dto/film.dto'
import { EnumFilmSort, GetAllFilmDto } from './dto/get-all.film.dto'
import { returnFilmObject, returnFilmObjectFullest } from './return-film.object'
@Injectable()
export class FilmService {
	constructor(
		private prisma: PrismaService,
		private paginationService: PaginationService,
	) {}
	async getAll(dto: GetAllFilmDto = {}) {
		const { sort, searchTerm } = dto
		const prismaSort: Prisma.FilmOrderByWithRelationInput[] = []
		if (sort === EnumFilmSort.OLDEST) prismaSort.push({ createdAt: 'asc' })
		else prismaSort.push({ createdAt: 'desc' })

		const prismaSearchTermFilter: Prisma.FilmWhereInput = searchTerm
			? {
					OR: [
						{
							genres: {
								some: {
									name: {
										contains: searchTerm,
										mode: 'insensitive',
									},
								},
							},
						},
						{
							name: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
						{
							description: {
								contains: searchTerm,
								mode: 'insensitive',
							},
						},
					],
			  }
			: {}
		const { perPage, skip } = this.paginationService.getPagination(dto)
		const films = await this.prisma.film.findMany({
			where: prismaSearchTermFilter,
			orderBy: prismaSort,
			skip,
			take: perPage,
			select: returnFilmObject,
		})
		return {
			films: films,
			length: await this.prisma.film.count({
				where: prismaSearchTermFilter,
			}),
		}
	}
	async byId(id: number) {
		const film = await this.prisma.film.findUnique({
			where: {
				id,
			},
			select: returnFilmObjectFullest,
		})

		if (!film) {
			throw new NotFoundException('Film not found')
		}

		return film
	}
	// async bySlug(slug: string) {
	// 	const film = await this.prisma.film.findUnique({
	// 		where: {
	// 			slug,
	// 		},
	// 		select: filmReturnObjectFullest,
	// 	})

	// 	if (!film) {
	// 		throw new NotFoundException('Film not found')
	// 	}

	// 	return film
	// }

	async byGenre(genreSlug: string) {
		const films = await this.prisma.film.findMany({
			where: {
				genres: {
					some: {
						slug: genreSlug,
					},
				},
			},
			select: returnFilmObjectFullest,
		})

		if (!films) {
			throw new NotFoundException('Films not found')
		}

		return films
	}

	async getSimilar(id: number) {
		const currentFilm = await this.byId(id)
		if (!currentFilm) {
			throw new NotFoundException('Current film not found!')
		}
		const films = await this.prisma.film.findMany({
			where: {
				genres: {
					some: {
						id: {
							in: currentFilm.genres.map(genres => genres.id),
						},
					},
				},
				NOT: {
					id: currentFilm.id,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			select: returnFilmObject,
		})
		return films
		//return currentFilm
	}
	async update(id: number, dto: FilmDto) {
		const { description, image, name, genreId } = dto
		return this.prisma.film.update({
			where: {
				id,
			},
			data: {
				description,
				image,
				name,
				genres: {
					connect: {
						id: genreId,
					},
				},
			},
		})
	}
	async delete(id: number) {
		return this.prisma.film.delete({
			where: {
				id,
			},
		})
	}
	async create() {
		return this.prisma.film.create({
			data: {
				description: '',
				name: '',
				age: +'',
				country: '',
				author: '',
				duration: +'',
				image: '',
				year: +'',
			},
		})
	}
}
