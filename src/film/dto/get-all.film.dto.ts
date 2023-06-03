import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from 'src/pagination/pagination.dto'

export enum EnumFilmSort {
	HIGH_PRICE = 'high-pripe',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest',
}
export class GetAllFilmDto extends PaginationDto {
	@IsOptional()
	@IsEnum(EnumFilmSort)
	sort?: EnumFilmSort
	@IsOptional()
	@IsString()
	searchTerm?: string
}
