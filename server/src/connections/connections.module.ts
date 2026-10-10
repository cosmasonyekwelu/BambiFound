import { Module } from '@nestjs/common';
import { ConnectionsService } from './connections.service.js';
import { ConnectionsController } from './connections.controller.js';

@Module({
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
  exports: [ConnectionsService],
})
export class ConnectionsModule {}
