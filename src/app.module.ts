import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { FilmModule } from './film/film.module'
import { GenreModule } from './genre/genre.module'
import { PaginationModule } from './pagination/pagination.module'
import { PrismaService } from './prisma.service'
import { ReviewModule } from './review/review.module'
import { UserModule } from './user/user.module'
import { ActorModule } from './actor/actor.module';
import { FileModule } from './file/file.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		UserModule,
		AuthModule,
		GenreModule,
		FilmModule,
		ReviewModule,
		PaginationModule,
		ActorModule,
		FileModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
