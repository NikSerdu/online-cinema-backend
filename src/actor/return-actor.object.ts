import { Prisma } from '@prisma/client'
import { returnFilmObject } from 'src/film/return-film.object'

export const returnActorObject: Prisma.ActorSelect = {
	id: true,
	name: true,
	image: true,
}

export const returnActorFullestObject: Prisma.ActorSelect = {
	...returnActorObject,
	films: {
		select: returnFilmObject,
	},
}
