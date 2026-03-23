import { Routes } from '@angular/router';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { TaskDetailComponent } from './Components/task-detail/task-detail.component';
import { TaskAddComponent } from './Components/task-add/task-add.component';
import { TaskInfoComponent } from './Components/task-info/task-info.component';
import { TaskEditComponent } from './Components/task-edit/task-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskAddComponent },
  {
    path: 'tasks/:id',
    component: TaskDetailComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: TaskInfoComponent },
      { path: 'edit', component: TaskEditComponent }
    ]
  },
  { path: '**', redirectTo: '/tasks' }
];

