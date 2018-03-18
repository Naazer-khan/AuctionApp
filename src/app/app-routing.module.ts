import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { PlayerManagementComponent } from './PlayerManagement/PlayerManagement.component';
import { TeamManagementComponent } from './TeamManagement/TeamManagement.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'player-management', component: PlayerManagementComponent },
  { path: 'team-management', component: TeamManagementComponent},
  { path: 'teams', component: TeamsComponent},
  // { path: 'signup-login', component: TeamsComponent},
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }
