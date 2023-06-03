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
import { ActorDto } from './actor.dto'
import { ActorService } from './actor.service'

@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}
	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.actorService.getAll()
	}

	@Auth('admin')
	@Post()
	async createActor() {
		return this.actorService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth('admin')
	async updateFilm(@Param('id') id: string, @Body() dto: ActorDto) {
		return this.actorService.update(+id, dto)
	}
	@HttpCode(200)
	@Delete(':id')
	@Auth('admin')
	async deleteFilm(@Param('id') id: string) {
		return this.actorService.delete(+id)
	}

	@Get(':id')
	async getFilm(@Param('id') id: string) {
		return this.actorService.getById(+id)
	}
}
