import {
    BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { IsNumber } from 'class-validator';
import { ProfileUpdateDto } from 'src/dto/requests/profileUpdateDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async updateProfile(userId: string, request: ProfileUpdateDto) {
    var user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: request.name,
        pronouns: request.pronouns,
        cinemaWorker: request.isCinemaWorker,
        roles: request.roles,
        updatedAt: new Date(),
      },
    });

    if (!user)
      throw new PreconditionFailedException(
        'Profile update was not successful.',
      );

    return user;
  }

  async updateTourStage(userId: string, stage: number) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) throw new NotFoundException('User not found.');

    if (existingUser.tourStage > 5)
      throw new BadRequestException('Tour stages have been completed.');

    var user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        tourStage: stage,
        updatedAt: new Date(),
      },
    });

    if (!user)
      throw new PreconditionFailedException(
        'Tour stage update was not successful.',
      );

    return true;
  }
}
