import { Component } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, TaskFormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task-manager';
  showCompleted = false;
  constructor(public taskService: TaskService) {}

  toggleCompletedView() {
    this.showCompleted = !this.showCompleted;
  }
}
