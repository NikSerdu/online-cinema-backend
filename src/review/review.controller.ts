import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ReviewDto } from './review.dto'
import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}
	@Get()
	async getAll() {
		return this.reviewService.getAll()
	}

	@Get(':id')
	async getByFilmId(@Param('id') id: string) {
		return this.reviewService.getByFilmId(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('leave/:filmId')
	@Auth()
	async leaveReview(
		@CurrentUser('id') id: number,
		@Body() dto: ReviewDto,
		@Param('filmId') filmId: string,
	) {
		return this.reviewService.create(id, dto, +filmId)
	}
}
