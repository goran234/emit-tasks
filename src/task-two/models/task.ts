import { Priority } from '@/task-two/models/priority.enum'

export class Task {
  public id: number
  public title: string
  public description: string
  public completed: boolean
  public priority: Priority

  constructor(taskData?: {
    id: number
    title: string
    description: string
    priority: Priority
    completed: boolean
  }) {
    this.id = taskData?.id || Date.now();
    this.title = taskData?.title || '';
    this.description = taskData?.description || '';
    this.priority = taskData?.priority || Priority.MEDIUM;
    this.completed = taskData?.completed || false;
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      completed: this.completed,
    }
  }
}
