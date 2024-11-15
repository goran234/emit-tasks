import { Task } from '@/task-two/models/task'

export class StoreService {
  static persistTasks(tasks: Task[]): void {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static retrieveTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks).map((task: Task) => new Task(task)) : [];
  }
}
