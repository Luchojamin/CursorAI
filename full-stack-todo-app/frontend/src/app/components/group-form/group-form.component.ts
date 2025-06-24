import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/task.model';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  group: Partial<Group> = {};
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.groupService.getGroup(+id).subscribe(group => {
        this.group = group;
      });
    }
  }

  saveGroup(): void {
    if (this.isEdit && this.group.id) {
      this.groupService.updateGroup(this.group.id, this.group).subscribe(() => {
        this.router.navigate(['/groups']);
      });
    } else {
      this.groupService.createGroup(this.group as Omit<Group, 'id'>).subscribe(() => {
        this.router.navigate(['/groups']);
      });
    }
  }
}
