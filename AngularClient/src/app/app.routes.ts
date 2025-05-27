import { Routes } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { UserManagementComponent } from '../components/user-management/user-management.component';
import { UserDialogComponent } from '../components/user-dialog/user-dialog.component';
import { UserAnalyticsComponent } from '../components/user-analytics/user-analytics.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: SignInComponent },
    { path: 'userManagement', component: UserManagementComponent },
    { path: 'userDialog', component: UserDialogComponent },
    { path: 'analistycs', component: UserAnalyticsComponent }
];
