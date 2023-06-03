import { Injectable } from '@nestjs/common'
import { PaginationDto } from './pagination.dto'

@Injectable()
export class PaginationService {
	getPagination(dto: PaginationDto, defaultPage = 30) {
		const page = dto.page ? +dto.page : 1
		const perPage = dto.page ? +dto.perPage : defaultPage
		const skip = (page - 1) * perPage
		return { perPage, skip }
	}
}
