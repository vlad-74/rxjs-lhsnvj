import { Observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, interval, of, from } from 'rxjs'; 
import { map, multicast, refCount } from 'rxjs/operators';

import {fromEvent} from 'rxjs';

fromEvent(document, 'mousemove').subscribe(ev => {
  console.log('Mouse event: ', ev);
});

of('Hello').subscribe(vl => console.log(vl));

const obs = new Observable(sub => {
  sub.next(1);
  setTimeout(() => { sub.error(3); }, 500);
});

const sub = obs.subscribe(
  vl => console.log(vl),
  err => console.log('Error: ', err),
  () => console.log('Completed') // НЕ ВСЕГДА ОТРАБАТЫВАЕТ!!!!
);

const sbj = new Subject<number>();
  sbj.subscribe(vl => console.log(`S - 1st: ${vl}`));
  sbj.next(3);
  sbj.subscribe(vl => console.log(`S - 2nd: ${vl}`));
  sbj.next(9);
  /* Результат  в консоли: 1st: 3; 1st: 9; 2nd: 9; */

const Bsbj = new BehaviorSubject<number>(5);
  Bsbj.subscribe(vl => console.log(`B - 1st: ${vl}`));
  Bsbj.subscribe(vl => console.log(`B - 2nd: ${vl}`));
  Bsbj.next(7);
  /* Результат  в консоли: 1st: 5; 2nd: 5; 1st: 7; 2nd: 7; */

const Rsbj = new ReplaySubject(2);
  Rsbj.next(5);
  Rsbj.subscribe(vl => console.log(`R - 1st: ${vl}`));
  Rsbj.next(6);
  Rsbj.next(7);
  Rsbj.subscribe(vl => console.log(`R - 2nd: ${vl}`));
  /* Результат  в консоли: 1st: 5; 1st: 6; 1st: 7; 2nd: 6; 2nd: 7; */

const Asbj = new AsyncSubject();
  Asbj.subscribe(vl => console.log(`Async: ${vl}`));
  Asbj.next(7);
  Asbj.next(8);
  Asbj.next(9);
  setTimeout(() => Asbj.complete(), 3000);
  /* Результат  в консоли (по истечении 3 сек): Async: 9 */

const subject = new Subject();
  const multicasted = from([2, 4, 6]).pipe(multicast(subject));
  multicasted.subscribe(vl => console.log(`M - 1st: ${vl}`));
  multicasted.subscribe(vl => console.log(`M - 2nd: ${vl}`));
  multicasted.connect()
  /* Результат  в консоли: 1st: 2; 1st: 2; 1st: 4; 2nd: 4; 1st: 6; 2nd: 6; */

const subjectMy = new Subject();
  const refCounted = interval(3).pipe(multicast(subjectMy), refCount());
  let sub1, sub2;
  
  //выполнение Observable начинается
  sub1 = refCounted.subscribe(vl => console.log(`RM - 1st: ${vl}`));
  setTimeout( () => sub2 = refCounted.subscribe(vl => console.log(`RM - 2nd: ${vl}`)), 500 );
  
  //выполнение Observable завершается
  setTimeout(() => sub1.unsubscribe(), 1500);
  setTimeout(() => sub2.unsubscribe(), 2000);