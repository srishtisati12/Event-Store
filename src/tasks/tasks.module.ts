import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksSubscriber } from './tasks.subscriber';
import { TasksHandler } from './tasks.handler';
import { EventStoreService } from '../event-store/event-store.service';

@Module({
  
  controllers: [TasksController],
  providers: [TasksService,
    TasksSubscriber,
    TasksHandler,
    EventStoreService
  ]
})
export class TasksModule {}
