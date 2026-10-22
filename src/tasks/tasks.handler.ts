import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OnEvent } from '@nestjs/event-emitter';
import { Model } from 'mongoose';
import { TaskCreatedEvent } from './task-created.event';
import { Task } from './task.schema';
import { TaskUpdatedEvent } from './task-updated.event';

@Injectable()
export class TasksHandler {
  private readonly logger = new Logger(TasksHandler.name);

  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  @OnEvent('task.created', { suppressErrors: false })
  async handleTaskCreated(event: TaskCreatedEvent) {
    
    const res = await this.taskModel.updateOne(
      { taskId: event.taskId },
      { $set: { title: event.title } },
      { upsert: true },
    );

    
    this.logger.log(`Saved task projection: ${event.taskId}`);
  }
  @OnEvent('task.deleted', { suppressErrors: false })
async handleTaskDeleted(event: { taskId: string }) {

  console.log(event)
  await this.taskModel.deleteOne({ taskId: event.taskId });

  this.logger.log(`Deleted task projection: ${event.taskId}`);
}
@OnEvent('task.updated', { suppressErrors: false })
async handleTaskUpdated(event: TaskUpdatedEvent) {
  await this.taskModel.updateOne(
    { taskId: event.taskId },
    { $set: { title: event.title } },
  );

  this.logger.log(`Updated task projection: ${event.taskId}`);
}
}