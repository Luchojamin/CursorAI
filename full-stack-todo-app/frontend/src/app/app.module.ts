import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupFormComponent } from './components/group-form/group-form.component';

@NgModule({
  // declarations: [
  //   AppComponent,
  //   TaskListComponent,
  //   TaskFormComponent,
  //   GroupListComponent,
  //   GroupFormComponent
  // ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    GroupListComponent,
    GroupFormComponent
  ],
  providers: []
  // bootstrap: [AppComponent]
})
export class AppModule { }
