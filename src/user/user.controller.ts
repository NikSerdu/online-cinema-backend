import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}
	@Get('profile/watch-later')
	@Auth()
	async getWatchLater(@CurrentUser('id') id: number) {
		return this.userService.getWatchLater(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put('profile')
	async update(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Patch('profile/watch-later/:filmId')
	async toggleWatchLater(
		@CurrentUser('id') id: number,
		@Param('filmId') filmId: string,
	) {
		return this.userService.toggleWatchLater(id, +filmId)
	}
}
