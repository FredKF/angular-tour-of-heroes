import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    // The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent
    private route: ActivatedRoute,
    private heroService: HeroService,
    // The location is an Angular service for interacting with the browser.
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    // The route.snapshot is a static image of the route information shortly after the component was created.
    // The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
    // The JavaScript (+) operator converts the string to a number, which is what a hero id should be
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }
  
  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack());
  }

}