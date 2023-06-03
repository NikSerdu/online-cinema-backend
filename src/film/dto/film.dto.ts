import { Prisma } from '@prisma/client'
import { IsNumber, IsString } from 'class-validator'

export class FilmDto implements Prisma.FilmUpdateInput {
	@IsString()
	name: string
	@IsString()
	description: string
	@IsString()
	image: string
	@IsNumber()
	genreId: number
}
