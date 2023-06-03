import { Prisma } from '@prisma/client'

export const returnGenreObject: Prisma.GenreSelect = {
	id: true,
	name: true,
	slug: true,
}
