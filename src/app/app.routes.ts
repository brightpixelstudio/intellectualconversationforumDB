import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MembersPage } from './pages/members/members';

export const routes: Routes = [
  { path: '', component: Home, title: 'Registration' },
  { path: 'members', component: MembersPage, title: 'Members' },
];
