
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidv4 } from 'uuid';
import { TaskCreatedEvent } from './task-created.event';

@Injectable()
export class TasksService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
  ) {}

  createTask(title: string) {
    const taskId = uuidv4();

    const event = new TaskCreatedEvent(taskId, title);

    this.eventEmitter.emitAsync('task.created', event);

    return {
      message: 'Task created successfully',
      taskId,
      title,
    };
  }
}
