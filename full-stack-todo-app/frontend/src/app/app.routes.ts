import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupFormComponent } from './components/group-form/group-form.component';

export const routes: Routes = [
    { path: 'tasks', component: TaskListComponent },
    { path: 'tasks/new', component: TaskFormComponent },
    { path: 'tasks/:id/edit', component: TaskFormComponent },
    { path: 'groups', component: GroupListComponent },
    { path: 'groups/new', component: GroupFormComponent },
    { path: 'groups/:id/edit', component: GroupFormComponent },
    { path: '', redirectTo: '/tasks', pathMatch: 'full' }
]; 