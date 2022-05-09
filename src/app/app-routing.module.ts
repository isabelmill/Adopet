import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { PetAppComponent } from './pages/pet-app/pet-app.component';
import { PetDetailsComponent } from './pages/pet-details/pet-details.component';
import { PetEditComponent } from './pages/pet-edit/pet-edit.component';
import { PetResolverService } from './services/pet-resolver.service';
import { DonateComponent } from './pages/donate/donate.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {
        path: 'pets/pet/:id',
        component: PetDetailsComponent,
        resolve: { pet: PetResolverService },
        canActivate: [AuthGuard]
    },
    { path: 'about', component: AboutComponent },
    { path: 'donate', component: DonateComponent },
    { path: '', component: HomeComponent },
    {
        path: 'pets', component: PetAppComponent, children: [
            { path: 'edit/:id', component: PetEditComponent, resolve: { pet: PetResolverService } },
            { path: 'edit', component: PetEditComponent, resolve: { pet: PetResolverService } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
