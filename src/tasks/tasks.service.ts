
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidv4 } from 'uuid';
import { EventStoreService } from '../event-store/event-store.service';
import { TaskCreatedEvent } from './task-created.event';
import { TaskUpdatedEvent } from './task-updated.event';

@Injectable()
export class TasksService {
  constructor(
    private readonly eventStoreService: EventStoreService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getById(id: string) {
    const events = await this.eventStoreService.getTaskById(id);

    return {
      taskId: id,
      events,
    };
  }

  async createTask(title: string) {
    const taskId = uuidv4();
    const result = await this.eventStoreService.saveTaskCreated(taskId, title);

    await this.eventEmitter.emitAsync(
      'task.created',
      new TaskCreatedEvent(taskId, title),
    );

    return result;
  }
  async updateTask(id: string, title: string) {
  const result = await this.eventStoreService.updateTask(id, title);

  await this.eventEmitter.emitAsync(
    'task.updated',
    new TaskUpdatedEvent(id, title)
  );

  return result;
}
  async deleteTask(id: string) {
  const result = await this.eventStoreService.deleteTask(id);

  await this.eventEmitter.emitAsync('task.deleted', {
    taskId: id,
  });

  return result;
}

}
