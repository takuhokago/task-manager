import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  @Input() tasks: Task[] = [];
  @Input() statusType: 'active' | 'completed' = 'active';

  onToggle(task: Task) {
    if (task.status === 'active') {
      this.taskService.toggleTask(task.id);
    } else if (task.status === 'completed') {
      this.taskService.restoreTask(task.id);
    }
  }

  onDelete(task: Task) {
    this.taskService.deleteTask(task.id);
  }
}
