import { Prisma } from '@prisma/client'
import { IsNumber, IsString } from 'class-validator'

export class ActorDto implements Prisma.ActorUpdateInput {
	@IsString()
	name: string
	@IsString()
	image: string
	@IsNumber()
	filmId: number
}
