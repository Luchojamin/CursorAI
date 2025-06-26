import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  group: Group = {
    id: 0,
    name: ''
  };
  
  isEditing = false;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const groupId = this.route.snapshot.params['id'];
    console.log('Route params:', this.route.snapshot.params);
    console.log('Group ID from route:', groupId);
    
    if (groupId) {
      this.isEditing = true;
      const id = parseInt(groupId, 10);
      if (isNaN(id)) {
        this.errorMessage = 'Invalid group ID';
        return;
      }
      this.loadGroup(id);
    }
  }

  loadGroup(id: number): void {
    this.loading = true;
    console.log('Loading group with ID:', id);
    this.groupService.getGroup(id).subscribe({
      next: (group) => {
        console.log('Group loaded successfully:', group);
        this.group = group;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading group:', error);
        this.errorMessage = 'Failed to load group: ' + (error.message || error);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateGroup();
    } else {
      this.createGroup();
    }
  }

  createGroup(): void {
    this.loading = true;
    this.groupService.createGroup(this.group).subscribe({
      next: () => {
        this.successMessage = 'Group created successfully!';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/groups']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Failed to create group';
        this.loading = false;
        console.error('Error creating group:', error);
      }
    });
  }

  updateGroup(): void {
    this.loading = true;
    this.groupService.updateGroup(this.group.id, this.group).subscribe({
      next: () => {
        this.successMessage = 'Group updated successfully!';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/groups']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Failed to update group';
        this.loading = false;
        console.error('Error updating group:', error);
      }
    });
  }
}
