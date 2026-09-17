import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MembersPage } from './pages/members/members';
import { EditProfilePage } from './pages/editprofile/editprofilepage';

export const routes: Routes = [
  { path: '', component: Home, title: 'Registration' },
  { path: 'members', component: MembersPage, title: 'Members' },
  { path: 'editprofile', component: EditProfilePage, title: 'Edit Profile' },
];
