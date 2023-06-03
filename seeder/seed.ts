import { faker } from '@faker-js/faker'
import { Film, PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const generateSlug = (str: string): string => {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^\w\sа-яёА-ЯЁ-]/g, '-')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

const prisma = new PrismaClient()

const createFilms = async (quantity: number) => {
	const films: Film[] = []
	for (let i = 0; i < quantity; i++) {
		const filmName = `Стражи галактики${i}`
		const genreName = `Genre ${i}`
		const film = await prisma.film.create({
			data: {
				name: filmName,
				description: faker.lorem.paragraph(),
				image: faker.image.imageUrl(),
				age: faker.datatype.number({ min: 1, max: 18 }),
				author: faker.name.fullName(),
				year: faker.datatype.number({ min: 2015, max: 2023 }),
				country: faker.address.country(),
				duration: faker.datatype.number({ min: 0, max: 3600 }),
				genres: {
					create: {
						name: genreName,
						slug: generateSlug(genreName),
					},
				},
				reviews: {
					create: [
						{
							rating: faker.datatype.number({ min: 1, max: 5 }),
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 2,
								},
							},
						},
						{
							rating: faker.datatype.number({ min: 1, max: 5 }),
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1,
								},
							},
						},
					],
				},
			},
		})
		films.push(film)
	}
	console.log(`Created ${films.length} films`)
}

async function main() {
	console.log('Start seeding...')
	await createFilms(10)
}

main()
	.catch(e => console.log(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
