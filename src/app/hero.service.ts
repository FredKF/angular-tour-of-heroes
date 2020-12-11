import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService,
              private http: HttpClient
  ) { }

  private heroesUrl = 'api/heroes'; //WebApi Url

  getHeroes(): Observable<Hero[]> {      
    return this.http.get<Hero[]>(this.heroesUrl)
    //To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator.
    .pipe(
      tap(_ => this.log('fetched heroes')),
      //The catchError() operator intercepts an Observable that failed. 
      //The operator then passes the error to the error handling function.
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );    
  }

  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      /*They'll do that with the RxJS tap() operator, which looks at the observable value
      does something with those values, and passes them along. 
      The tap() call back doesn't touch the values themselves.*/
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );    
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  //The following handleError() method reports the error and 
  //then returns an innocuous result so that the application keeps working.
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
