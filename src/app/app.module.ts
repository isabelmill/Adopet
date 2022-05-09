import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './cmps/app-root/app.component';
import { PetAppComponent } from './pages/pet-app/pet-app.component';
import { PetListComponent } from './cmps/pet-list/pet-list.component';
import { PetPreviewComponent } from './cmps/pet-preview/pet-preview.component';
import { PetFilterComponent } from './cmps/pet-filter/pet-filter.component';
import { FormsModule } from '@angular/forms';
import { PetDetailsComponent } from './pages/pet-details/pet-details.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { AboutComponent } from './pages/about/about.component';
import { UserMsgComponent } from './cmps/user-msg/user-msg.component';
import { PetEditComponent } from './pages/pet-edit/pet-edit.component';
import { DonateComponent } from './pages/donate/donate.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        PetAppComponent,
        PetListComponent,
        PetPreviewComponent,
        PetFilterComponent,
        PetDetailsComponent,
        AppHeaderComponent,
        AboutComponent,
        UserMsgComponent,
        PetEditComponent,
        DonateComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
