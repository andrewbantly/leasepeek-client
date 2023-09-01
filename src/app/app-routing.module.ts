import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'profile', component: UserComponent},
  {path: 'data/:objectId', component: DataVisualizationComponent},
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
