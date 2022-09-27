import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { TaskComponent } from './task.component';

const routes: Routes = [
    {
        path: '',
        component: TaskComponent,
        children: [
            {
                path: '',
                component: ListTaskComponent
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TaskRoutingModule { }
