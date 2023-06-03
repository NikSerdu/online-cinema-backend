import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FilmDto } from './dto/film.dto'
import { GetAllFilmDto } from './dto/get-all.film.dto'
import { FilmService } from './film.service'

@Controller('films')
export class FilmController {
	constructor(private readonly filmService: FilmService) {}
	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query() queryDto: GetAllFilmDto) {
		return this.filmService.getAll(queryDto)
	}

	@Get('similar/:id')
	async getSimilar(@Param('id') id: string) {
		return this.filmService.getSimilar(+id)
	}

	@Get('by-genre-slug/:genreSlug')
	async getFilmByCategory(@Param('genreSlug') genreSlug: string) {
		return this.filmService.byGenre(genreSlug)
	}

	@Auth('admin')
	@Post()
	async createFilm() {
		return this.filmService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth('admin')
	async updateFilm(@Param('id') id: string, @Body() dto: FilmDto) {
		return this.filmService.update(+id, dto)
	}
	@HttpCode(200)
	@Delete(':id')
	@Auth('admin')
	async deleteFilm(@Param('id') id: string) {
		return this.filmService.delete(+id)
	}

	@Get(':id')
	async getFilm(@Param('id') id: string | number) {
		return this.filmService.byId(+id)
	}
}
