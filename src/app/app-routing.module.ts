import { NgModule } from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';
import { RouterModule, Routes } from '@angular/router';

//Routes tell the Router which view to display
//when a user clicks a link or pastes a URL into the browser address bar.

// path: a string that matches the URL in the browser address bar.
// component: the component that the router should create when navigating to this route.
const routes: Routes = [
  {path: 'heores', component: HeroesComponent}
];


@NgModule({
  imports: [
    // The method is called forRoot() because you configure the router 
    // at the application's root level. The forRoot() 
    // method supplies the service providers and directives needed for routing, 
    // and performs the initial navigation based on the current browser URL.
    RouterModule.forRoot(routes)    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }