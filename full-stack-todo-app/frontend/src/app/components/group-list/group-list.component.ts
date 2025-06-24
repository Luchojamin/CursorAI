import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/task.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  errorMessage: string | null = null;

  constructor(private groupService: GroupService) {
    console.log("GroupListComponent constructor");
   }

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  deleteGroup(id: number): void {
    this.errorMessage = null;
    this.groupService.deleteGroup(id).subscribe({
      next: () => {
        this.groups = this.groups.filter(group => group.id !== id);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to delete group.';
      }
    });
  }
}
