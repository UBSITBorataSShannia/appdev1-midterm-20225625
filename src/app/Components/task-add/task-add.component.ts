import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../task.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {
  submitted = false;
  formData: Omit<Task, 'id' | 'createdAt'> = {
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Medium'
  };

  constructor(private taskService: TaskService, private router: Router) {}

  isInvalid(): boolean {
    return !this.formData.title || !this.formData.description || !this.formData.dueDate;
  }

  onSubmit() {
    this.submitted = true;
    if (this.isInvalid()) return;
    const task = this.taskService.addTask(this.formData);
    this.router.navigate(['/tasks'], { state: { msg: `"${task.title}" added successfully!` } });
  }

  getPriorityClass(priority: Task['priority']): string {
    const map: Record<string, string> = {
      'High': 'bg-danger',
      'Medium': 'bg-warning text-dark',
      'Low': 'bg-success'
    };
    return map[priority] ?? 'bg-secondary';
  }

  getStatusClass(status: Task['status']): string {
    const map: Record<string, string> = {
      'Pending': 'bg-secondary',
      'In Progress': 'bg-primary',
      'Completed': 'bg-success'
    };
    return map[status] ?? 'bg-secondary';
  }
}