import { Module } from '@nestjs/common'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { FilmController } from './film.controller'
import { FilmService } from './film.service'

@Module({
	controllers: [FilmController],
	providers: [FilmService, PrismaService, PaginationService],
})
export class FilmModule {}
