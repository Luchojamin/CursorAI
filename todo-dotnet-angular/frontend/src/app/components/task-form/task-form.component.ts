import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    completed: false,
    groups: []
  };
  
  isEditing = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  // Getter and setter for datetime-local input
  get dueDateString(): string {
    return this.task.dueDate.toISOString().slice(0, 16);
  }

  set dueDateString(value: string) {
    this.task.dueDate = new Date(value);
  }

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.params['id'];
    console.log('Route params:', this.route.snapshot.params);
    console.log('Task ID from route:', taskId);
    
    if (taskId) {
      this.isEditing = true;
      const id = parseInt(taskId, 10);
      if (isNaN(id)) {
        this.errorMessage = 'Invalid task ID';
        return;
      }
      this.loadTask(id);
    }
  }

  loadTask(id: number): void {
    this.loading = true;
    console.log('Loading task with ID:', id);
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        console.log('Task loaded successfully:', task);
        this.task = task;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading task:', error);
        this.errorMessage = 'Failed to load task: ' + (error.message || error);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  createTask(): void {
    this.loading = true;
    this.taskService.createTask(this.task).subscribe({
      next: () => {
        this.successMessage = 'Task created successfully!';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Failed to create task';
        this.loading = false;
        console.error('Error creating task:', error);
      }
    });
  }

  updateTask(): void {
    this.loading = true;
    this.taskService.updateTask(this.task.id, this.task).subscribe({
      next: () => {
        this.successMessage = 'Task updated successfully!';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Failed to update task';
        this.loading = false;
        console.error('Error updating task:', error);
      }
    });
  }
}
