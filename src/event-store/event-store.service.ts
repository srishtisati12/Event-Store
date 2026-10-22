
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import {
  KurrentDBClient,
  jsonEvent,
} from '@kurrent/kurrentdb-client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EventStoreService implements OnModuleDestroy {
  private readonly client = KurrentDBClient.connectionString(
    'kurrentdb://admin:changeit@localhost:2113?tls=false',
  );

  async saveTaskCreated(taskId: string, title: string) {
    const payload = {
      taskId,
      title,
    };

    const event = jsonEvent({
      id: uuidv4(),
      type: 'TaskCreated',
      data: payload,
    });

    await this.client.appendToStream(`task-${taskId}`, event);

    return { taskId, payload };
  }

  async getTaskById(taskId: string) {
    const events = [];

    for await (const resolvedEvent of this.client.readStream(
      `task-${taskId}`,
    )) {
      events.push(resolvedEvent);
    }

    return events.map((event) => ({
      type: event.event?.type,
      data: event.event?.data,
    }));
  }
  async deleteTask(taskId: string) {
  const event = jsonEvent({
    id: uuidv4(),
    type: 'TaskDeleted',
    data: { taskId },
  });

  await this.client.appendToStream(`task-${taskId}`, event);

  return {
    message: 'Task deleted successfully',
    taskId,
  };
}
async updateTask(taskId: string, title: string) {
  const event = jsonEvent({
    id: uuidv4(),
    type: 'TaskUpdated',
    data: {
      taskId,
      title,
    },
  });

  await this.client.appendToStream(`task-${taskId}`, event);

  return { taskId, title };
}

  async onModuleDestroy() {
    await this.client.dispose();
  }
}
