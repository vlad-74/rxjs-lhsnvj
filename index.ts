import { Observable, of, from } from 'rxjs'; 
import { map } from 'rxjs/operators';

 import {fromEvent} from 'rxjs';

    fromEvent(document, 'mousemove').subscribe(ev => {
     console.log('Mouse event: ', ev);
    });
