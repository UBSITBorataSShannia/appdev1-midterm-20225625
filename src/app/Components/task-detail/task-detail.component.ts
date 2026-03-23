import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TaskService } from '../../task.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
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
