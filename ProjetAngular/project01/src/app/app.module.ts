import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonnageComponent } from './contenu/personnage/personnage.component';
import { CreationPersonnageComponent } from './contenu/creation-personnage/creation-personnage.component';
import { NavigationComponent } from './contenu/navigation/navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FightAreaComponent } from './contenu/fight-area/fight-area.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonnageComponent,
    CreationPersonnageComponent,
    NavigationComponent,
    FightAreaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
