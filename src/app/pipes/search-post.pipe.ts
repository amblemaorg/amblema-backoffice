import {Pipe, PipeTransform} from '@angular/core';
import { Post } from '../models/web/blog.model';
import { stringify } from 'querystring';

@Pipe({
  name: 'search'
})
export class SearchPostPipe implements PipeTransform {
    transform(items: Post[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        filter = filter.toUpperCase();
        // filter items array, items which match and return true will be
        // kept, false will be filtered out});
        return items.filter(item => item.title.toUpperCase().indexOf(filter as string) !== -1
        || item.tag.toUpperCase().indexOf(filter as string) !== -1);
    }
}
