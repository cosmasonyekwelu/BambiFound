import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class OnboardingService {
  constructor(private readonly usersService: UsersService) {}

  private formatResponse(user: any) {
    return {
      onboardingCompleted: user.onboardingCompleted,
      onboardingSkipped: user.onboardingSkipped,
      onboardingStep: user.onboardingStep,
      onboardingData: user.onboardingData,
    };
  }

  async getOnboardingStatus(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.formatResponse(user);
  }

  async updateOnboardingData(
    userId: string,
    data: { onboardingStep?: number; onboardingData?: any },
  ) {
    const updatedUser = await this.usersService.updateOnboardingData(userId, {
      onboardingStep: data.onboardingStep,
      onboardingData: data.onboardingData,
    });
    return this.formatResponse(updatedUser);
  }

  async completeOnboarding(userId: string, data?: { onboardingData?: any }) {
    const updatedUser = await this.usersService.updateOnboardingData(userId, {
      onboardingCompleted: true,
      onboardingSkipped: false,
      onboardingData: data?.onboardingData,
    });
    return this.formatResponse(updatedUser);
  }

  async skipOnboarding(userId: string) {
    const updatedUser = await this.usersService.updateOnboardingData(userId, {
      onboardingSkipped: true,
      onboardingCompleted: false,
    });
    return this.formatResponse(updatedUser);
  }
}
