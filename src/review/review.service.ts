import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnReviewObject } from './return-review.object'
import { ReviewDto } from './review.dto'

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.review.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			select: returnReviewObject,
		})
	}

	async getAverageValueByFilmId(filmId: number) {
		return this.prisma.review
			.aggregate({
				where: { filmId },
				_avg: { rating: true },
			})
			.then(data => data._avg)
	}
	async create(userId: number, dto: ReviewDto, filmId: number) {
		return this.prisma.review.create({
			data: {
				...dto,
				film: {
					connect: {
						id: filmId,
					},
				},
				user: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}
	async getByFilmId(filmId: number) {
		return this.prisma.review.findMany({
			where: {
				filmId,
			},
			select: returnReviewObject,
		})
	}
}
