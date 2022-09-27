import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

const routes: Routes = [
    {
        path: '',
        component: NavMenuComponent,
        children: [
            {
                path: 'task',
                loadChildren: () => import('../../../modules/task/task.module').then(m => m.TaskModule)
            },
        ]
    },

    {
        path: '**', redirectTo: 'login', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule { }
