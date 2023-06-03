import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PaginationService } from './pagination.service'

@Module({
	providers: [PaginationService, PrismaService],
	exports: [PaginationService],
})
export class PaginationModule {}
