import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CareersModule } from './careers/careers.module';
import { ProjectsModule } from './projects/projects.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { TestimonialsModule } from './testimonials/testimonials.module';

@Module({
  imports: [
    PrismaModule,
    CareersModule,
    ProjectsModule,
    TeamMembersModule,
    TestimonialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
