import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/task`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(tasks => tasks.map(task => this.convertToTask(task)))
    );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(task => this.convertToTask(task))
    );
  }

  createTask(task: Partial<Task>): Observable<Task> {
    const payload = this.convertToApiPayload(task);
    return this.http.post<any>(this.apiUrl, payload).pipe(
      map(task => this.convertToTask(task))
    );
  }

  updateTask(id: number, task: Partial<Task>): Observable<void> {
    const payload = this.convertToApiPayload(task);
    return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignGroup(taskId: number, groupId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${taskId}/groups/${groupId}`, {});
  }

  unassignGroup(taskId: number, groupId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}/groups/${groupId}`);
  }

  private convertToTask(apiTask: any): Task {
    return {
      id: apiTask.id,
      title: apiTask.title,
      description: apiTask.description,
      dueDate: new Date(apiTask.dueDate),
      completed: apiTask.completed,
      groups: apiTask.groups || []
    };
  }

  private convertToApiPayload(task: Partial<Task>): any {
    return {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate instanceof Date ? task.dueDate.toISOString() : task.dueDate,
      completed: task.completed
    };
  }
}
