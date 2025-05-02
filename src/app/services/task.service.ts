import { Injectable, signal, computed, effect } from '@angular/core';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'task-manager-tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private nextId = 1;

  private loadFromStorage(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private tasks = signal<Task[]>(this.loadFromStorage());

  readonly activeTasks = computed(() => {
    return this.tasks().filter((t) => t.status === 'active');
  });

  readonly completedTasks = computed(() => {
    return this.tasks().filter((t) => t.status === 'completed');
  });

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks()));
    });

    const maxId = this.tasks().reduce((max, t) => Math.max(max, t.id), 0);
    this.nextId = maxId + 1;
  }

  addTask(title: string) {
    const newTask: Task = {
      id: this.nextId++,
      title,
      status: 'active',
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  toggleTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, status: 'completed' } : task
      )
    );
  }

  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  restoreTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, status: 'active' } : task
      )
    );
  }

  completedTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, status: 'completed' } : task
      )
    );
  }
}
