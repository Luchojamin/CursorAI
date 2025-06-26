import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css'
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.loading = true;
    this.groupService.getGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load groups';
        this.loading = false;
        console.error('Error loading groups:', error);
      }
    });
  }

  editGroup(groupId: number) {
    this.router.navigate(['/groups', groupId, 'edit']);
  }

  deleteGroup(id: number) {
    if (!confirm('Are you sure you want to delete this group?')) return;
    this.successMessage = null;
    this.errorMessage = null;
    this.groupService.deleteGroup(id).subscribe({
      next: () => {
        this.groups = this.groups.filter(g => g.id !== id);
        this.successMessage = 'Group deleted successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete group';
        console.error('Error deleting group:', error);
      }
    });
  }
}
