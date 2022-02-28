import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CmsComponent } from './components/cms/cms.component';
import { CarComponent } from './components/cms/car/car.component';
import { OfferComponent } from './components/cms/offer/offer.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'cms',
    canActivate: [AuthGuard],
    component: CmsComponent,
    children: [
      { path: '', redirectTo: '/cms/car', pathMatch: 'full' },
      { path: 'car', component: CarComponent },
      { path: 'offer', component: OfferComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
