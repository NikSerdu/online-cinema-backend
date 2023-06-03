import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GenreDto } from './genre.dto'
import { GenreService } from './genre.service'

@Controller('genres')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}
	@Get()
	async getAll() {
		return this.genreService.getAll()
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.genreService.bySlug(slug)
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.genreService.byId(+id)
	}
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: GenreDto) {
		return this.genreService.update(+id, dto)
	}

	@HttpCode(200)
	@Auth('admin')
	@Post()
	async create() {
		return this.genreService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.genreService.delete(+id)
	}
}
