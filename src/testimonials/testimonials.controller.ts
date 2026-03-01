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
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto, UpdateTestimonialDto } from './dto';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a testimonial' })
  create(@Body() dto: CreateTestimonialDto) {
    return this.testimonialsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all testimonials' })
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a testimonial by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a testimonial' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTestimonialDto,
  ) {
    return this.testimonialsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a testimonial' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonialsService.remove(id);
  }
}
