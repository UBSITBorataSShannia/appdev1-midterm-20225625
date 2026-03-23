import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../task.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  alertMsg = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
    const nav = history.state;
    if (nav?.msg) {
      this.alertMsg = nav.msg;
      setTimeout(() => this.alertMsg = '', 4000);
    }
  }

  loadTasks() {
    this.tasks = this.taskService.getAllTasks();
  }

  countByStatus(status: Task['status']): number {
    return this.tasks.filter(t => t.status === status).length;
  }

  toggleStatus(task: Task) {
    this.taskService.toggleStatus(task.id);
    this.loadTasks();
  }

  deleteTask(task: Task) {
    if (confirm(`Delete "${task.title}"? This action cannot be undone.`)) {
      this.taskService.deleteTask(task.id);
      this.loadTasks();
      this.alertMsg = `"${task.title}" has been deleted.`;
      setTimeout(() => this.alertMsg = '', 4000);
    }
  }

  getPriorityClass(priority: Task['priority']): string {
    const map: Record<string, string> = {
      'High': 'bg-danger',
      'Medium': 'bg-warning text-dark',
      'Low': 'bg-success'
    };
    return map[priority];
  }

  getStatusClass(status: Task['status']): string {
    const map: Record<string, string> = {
      'Pending': 'bg-secondary',
      'In Progress': 'bg-primary',
      'Completed': 'bg-success'
    };
    return map[status];
  }
}
