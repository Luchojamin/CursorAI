import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { GroupService } from '../../services/group.service';
import { Task } from '../../models/task';
import { Group } from '../../models/group';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  groups: Group[] = [];
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private taskService: TaskService,
    private groupService: GroupService,
    private router: Router
  ) {
    console.log('TaskListComponent constructor');
  }

  ngOnInit() {
    this.loadTasks();
    this.loadGroups();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load tasks';
        this.loading = false;
        console.error('Error loading tasks:', error);
      }
    });
  }

  loadGroups() {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  deleteTask(id: number) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    this.successMessage = null;
    this.errorMessage = null;
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.successMessage = 'Task deleted successfully.';
        this.loadTasks();
      },
      error: () => this.errorMessage = 'Failed to delete task. Please try again.'
    });
  }

  markComplete(task: Task) {
    if (!confirm('Mark this task as complete?')) return;
    this.successMessage = null;
    this.errorMessage = null;
    this.taskService.updateTask(task.id, { ...task, completed: true }).subscribe({
      next: () => {
        this.successMessage = 'Task marked as complete.';
        this.loadTasks();
      },
      error: () => this.errorMessage = 'Failed to mark task as complete. Please try again.'
    });
  }

  assignGroup(task: Task, groupId: string) {
    this.taskService.assignGroup(task.id, Number(groupId)).subscribe(() => this.loadTasks());
  }

  unassignGroup(task: Task, groupId: number) {
    this.taskService.unassignGroup(task.id, groupId).subscribe(() => this.loadTasks());
  }

  completeTask(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, completed: true };
      this.taskService.updateTask(taskId, updatedTask).subscribe({
        next: () => {
          task.completed = true;
          this.successMessage = 'Task marked as complete!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Failed to update task';
          console.error('Error updating task:', error);
        }
      });
    }
  }

  uncompleteTask(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, completed: false };
      this.taskService.updateTask(taskId, updatedTask).subscribe({
        next: () => {
          task.completed = false;
          this.successMessage = 'Task marked as incomplete!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Failed to update task';
          console.error('Error updating task:', error);
        }
      });
    }
  }

  editTask(taskId: number): void {
    this.router.navigate(['/tasks', taskId, 'edit']);
  }
}
