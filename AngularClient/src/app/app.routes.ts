import { Routes } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { HomePageComponent } from '../components/home-page/home-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: SignInComponent },
];