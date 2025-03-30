import { Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

export const routes: Routes = [
  { path: '', component: PersonListComponent },
  { path: 'create', component: RegistrationFormComponent },
  { path: 'edit/:id', component: RegistrationFormComponent },
];