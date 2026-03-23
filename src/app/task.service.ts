import { Injectable } from "@angular/core";
import { Task } from "./task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService{
    private tasks: Task[] = [
          {
      id: 1,
      title: 'Design System Architecture',
      description: 'Plan and document the overall system architecture for the new platform. Include data flow diagrams and component hierarchy.',
      dueDate: '2025-08-01',
      status: 'In Progress',
      priority: 'High',
      createdAt: '2025-07-10'
    },
    {
      id: 2,
      title: 'Write Unit Tests',
      description: 'Create comprehensive unit tests for all service methods and critical components using Jasmine and Karma.',
      dueDate: '2025-07-25',
      status: 'Pending',
      priority: 'Medium',
      createdAt: '2025-07-12'
    },
    {
      id: 3,
      title: 'Deploy to Production',
      description: 'Deploy the finalized application to the production server using CI/CD pipeline. Ensure zero downtime deployment.',
      dueDate: '2025-07-15',
      status: 'Completed',
      priority: 'High',
      createdAt: '2025-07-01'
    },
    {
      id: 4,
      title: 'Update Documentation',
      description: 'Update the README and API documentation to reflect recent changes in the codebase and deployment procedures.',
      dueDate: '2025-08-10',
      status: 'Pending',
      priority: 'Low',
      createdAt: '2025-07-14'
    },
    {
      id: 5,
      title: 'Code Review Sprint 3',
      description: 'Review all pull requests from Sprint 3, provide constructive feedback, and approve or request changes.',
      dueDate: '2025-07-20',
      status: 'In Progress',
      priority: 'Medium',
      createdAt: '2025-07-13'
    }
    ];
    
  private nextId = 6;

  getAllTasks(): Task[]{
    return [...this.tasks];
  }
  getTaskById(id: number): Task| undefined {
    return this.tasks.find(t => t.id === id);
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): Task {
    const newTask: Task = {
        ...task, 
        id: this.nextId++,
        createdAt: new Date().toISOString().split('T')[0]
    };
    this.tasks.push(newTask);
    return newTask;
  }

   updateTask(id: number, updates: Partial<Task>): Task | undefined {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    this.tasks[index] = { ...this.tasks[index], ...updates };
    return this.tasks[index];
  }

  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  toggleStatus(id: number): Task | undefined {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return undefined;
    const cycle: Task['status'][] = ['Pending', 'In Progress', 'Completed'];
    const currentIndex = cycle.indexOf(task.status);
    task.status = cycle[(currentIndex + 1) % cycle.length];
    return task;
  }
}