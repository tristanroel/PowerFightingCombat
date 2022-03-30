import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationPersonnageComponent } from './contenu/creation-personnage/creation-personnage.component';
import { EditPersonnageComponent } from './contenu/edit-personnage/edit-personnage.component';
import { FightAreaComponent } from './contenu/fight-area/fight-area.component';
import { NavigationComponent } from './contenu/navigation/navigation.component';
import { PersonnageComponent } from './contenu/personnage/personnage.component';

const routes: Routes = [
  {path:"contenu/personnage", component: PersonnageComponent},
  {path: "contenu/creation-personnage", component: CreationPersonnageComponent},
  {path: "contenu/fight-area", component: FightAreaComponent},
  {path: "contenu/edit-personnage", component: EditPersonnageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
