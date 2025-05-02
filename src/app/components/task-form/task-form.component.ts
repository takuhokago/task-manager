import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  private taskService = inject(TaskService);
  title: string = '';

  addTask() {
    const trimmed = this.title.trim();
    if (trimmed) {
      this.taskService.addTask(trimmed);
      this.title = '';
    }
  }
}
