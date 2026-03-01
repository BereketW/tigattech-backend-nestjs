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
import { CareersService } from './careers.service';
import { CreateCareerDto, UpdateCareerDto } from './dto';

@ApiTags('Careers')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a career opening' })
  create(@Body() dto: CreateCareerDto) {
    return this.careersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all career openings' })
  findAll() {
    return this.careersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a career opening by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.careersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a career opening' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCareerDto,
  ) {
    return this.careersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a career opening' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.careersService.remove(id);
  }
}
