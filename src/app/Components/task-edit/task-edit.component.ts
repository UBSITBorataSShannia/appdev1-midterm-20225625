import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {
  task: Task | undefined;
  formData: Partial<Task> = {};
  submitted = false;
  successMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    const id = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
    if (this.task) {
      this.formData = { ...this.task };
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.formData.title || !this.formData.description || !this.formData.dueDate) return;
    this.taskService.updateTask(this.task!.id, this.formData);
    this.successMsg = 'Task updated successfully!';
    setTimeout(() => {
      this.router.navigate(['/tasks', this.task!.id, 'info']);
    }, 1200);
  }

  cancel() {
    this.router.navigate(['/tasks', this.task!.id, 'info']);
  }
}
