import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, Group } from '../../models/task.model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Partial<Task> = {};
  isEdit = false;
  groups: Group[] = [];
  selectedGroupId: number | null = null;
  groupError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.taskService.getTask(+id).subscribe(task => {
        if (task.groups && task.groups.length > 0) {
          const groupObjs = task.groups.map((g: any) => g.group ? g.group : g);
          this.task.groups = groupObjs;
          this.selectedGroupId = groupObjs[0].id;
        }
        if (task.dueDate) {
          const date = new Date(task.dueDate);
          (this.task as any).dueDate = date.toISOString().split('T')[0];
        }
        this.task.id = task.id;
        this.task.title = task.title;
        this.task.description = task.description;
        this.task.completed = task.completed;
      });
    }
  }

  saveTask(): void {
    if (!this.selectedGroupId) {
      this.groupError = 'Please select a group.';
      return;
    }
    this.groupError = null;
    const selectedGroup = this.groups.find(g => g.id === this.selectedGroupId);
    if (!selectedGroup) return;
    this.task.groups = [selectedGroup];
    if (this.isEdit && this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.createTask(this.task as Omit<Task, 'id' | 'groups'> & { groups: Group[] }).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
