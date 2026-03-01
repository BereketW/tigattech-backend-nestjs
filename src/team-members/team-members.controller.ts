import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TeamMembersService } from './team-members.service';
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto';

@ApiTags('Team Members')
@Controller('team-members')
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a team member' })
  create(@Body() dto: CreateTeamMemberDto) {
    return this.teamMembersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all team members' })
  findAll() {
    return this.teamMembersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a team member by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamMembersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a team member' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTeamMemberDto,
  ) {
    return this.teamMembersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team member' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamMembersService.remove(id);
  }
}
