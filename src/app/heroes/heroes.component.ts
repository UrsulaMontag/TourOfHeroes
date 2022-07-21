import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero?: Hero;
    
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    /**call getHeroes() here and not in constructor (constructor just for minimal initialization such as wiring constructor parameters to properties)!
     * If called inside ngOnInit, Angular call this at an appropriate time after constructing a HeroesComponent instance!*/
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
