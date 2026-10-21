
import { Injectable, Logger } from '@nestjs/common';
import { TaskCreatedEvent } from './task-created.event';
import { EventStoreService } from '../event-store/event-store.service';

@Injectable()
export class TasksHandler {
  private readonly logger = new Logger(TasksHandler.name);

  constructor(
    private readonly eventStoreService: EventStoreService,
  ) {}

  async handle(event: TaskCreatedEvent) {
    const result = await this.eventStoreService.saveTaskCreated(
      event.taskId,
      event.title,
    );

    this.logger.log(
      `Task event saved: ${result.taskId}`,
    );
  }
}
