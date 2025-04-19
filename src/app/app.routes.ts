import { Routes } from '@angular/router';
import { ReglementsComponent } from './components/reglements/reglements.component';
import { ClassementMensuelComponent } from './components/classement-mensuel/classement-mensuel.component';

export const routes: Routes = [
    { path: '', redirectTo: 'classement/default/mois', pathMatch: 'full' },
    { path: 'classement/:competition/:mois', component: ClassementMensuelComponent },
    { path: 'reglements', component: ReglementsComponent }
];
