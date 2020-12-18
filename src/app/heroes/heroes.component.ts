import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService} from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes : Hero[]; 

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  } 

  //The new version waits for the Observable to emit the array of heroes—which could happen now or several minutes from now. The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void{
    name = name.trim();
    if(!name){return;}
    this.heroService.addHero({name} as Hero).subscribe(hero => {this.heroes.push(hero)});
  }
  // When the given name is non-blank, the handler creates a Hero-like object from the
  //  name (it's only missing the id) and passes it to the services addHero() method.

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h=>h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }




}
