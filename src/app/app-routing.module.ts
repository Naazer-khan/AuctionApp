import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { PlayerManagementComponent } from './PlayerManagement/PlayerManagement.component';
import { TeamManagementComponent } from './TeamManagement/TeamManagement.component';
import { TeamsComponent } from './teams/teams.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuctionSettingComponent } from './auction-setting/auction-setting.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'player-management', component: PlayerManagementComponent },
  { path: 'team-management', component: TeamManagementComponent},
  { path: 'teams', component: TeamsComponent},
  { path: 'signup-login', component: AuthenticationComponent},
  {path: 'settings', component: AuctionSettingComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'home', component: HomeComponent},
  {path:'adminLogin', component: AdminLoginComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ] 
})
export class AppRoutingModule { }
