import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ListTaskComponent } from './components/list-task/list-task.component';
import { TaskComponent } from './task.component';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [
    TaskComponent,
    ListTaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class TaskModule {}
