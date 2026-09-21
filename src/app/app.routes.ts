import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MembersPage } from './pages/members/members';
import { EditProfilePage } from './pages/editprofile/editprofilepage';
import { MemberStatisticsPage } from './pages/memberstatistics/memberstatistics';
import { StatisticsPage } from './pages/statistics/statisticspage';

export const routes: Routes = [
  { path: '', component: Home, title: 'Registration' },
  { path: 'members', component: MembersPage, title: 'Members' },
  { path: 'editprofile', component: EditProfilePage, title: 'Edit Profile' },
  { path: 'memberstatistics', component: MemberStatisticsPage, title: 'View Member Statistics' },
  { path: 'statistics', component: StatisticsPage, title: 'View Statistics' },
];
