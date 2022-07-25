import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private heroService: HeroService) { }

  //Push search term to observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /**If passing search term directly to the searchHeroes() excessive HTTP requests will occure. 
   * But passing it into ngOnInit() method pipes the searchTerms observable through a sequence of RxJS operators that reduce the number of calls to the searchHeroes() */
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //wait 300ms after each keystroke before considering term
      debounceTime(300),
      //ignore new term if same as previous term
      distinctUntilChanged(),
      //switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    )
  }

}
