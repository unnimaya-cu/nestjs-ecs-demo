import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

@Injectable()
export class AppService {
    getHello(): string {
    return 'Hello World!';
  }
  private tasks: Task[] = [];

  getTasks(): Task[] {
    console.log(this.tasks);
    
    return this.tasks;
  }

  createTask(title: string): Task {
    const task: Task = {
      id: randomUUID(),
      title,
      completed: false,
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, completed: boolean): Task {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.completed = completed;
    return task;
  }

  deleteTask(id: string) {
    const index = this.tasks.findIndex(t => t.id === id);

    if (index === -1) {
      throw new NotFoundException('Task not found');
    }

    this.tasks.splice(index, 1);

    return { message: 'Task deleted successfully' };
  }
}
