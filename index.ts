import { Observable, of, from } from 'rxjs'; 
import { map } from 'rxjs/operators';

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