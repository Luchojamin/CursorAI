import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Omit<Task, 'id' | 'groups'>): Observable<Task> {
    debugger;
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Partial<Omit<Task, 'id' | 'groups'>>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
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
}
