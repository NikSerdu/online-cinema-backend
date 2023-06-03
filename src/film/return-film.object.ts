import { Prisma } from '@prisma/client'
import { returnGenreObject } from 'src/genre/return-genre.object'
import { returnReviewObject } from 'src/review/return-review.object'

export const returnFilmObject: Prisma.FilmSelect = {
	image: true,
	description: true,
	id: true,
	name: true,
	createdAt: true,
	age: true,
	author: true,
	country: true,
	year: true,
}
export const returnFilmObjectFullest: Prisma.FilmSelect = {
	...returnFilmObject,
	reviews: {
		select: returnReviewObject,
	},
	genres: {
		select: returnGenreObject,
	},
}
