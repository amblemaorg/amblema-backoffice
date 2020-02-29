import {Pipe, PipeTransform} from '@angular/core';
import { Post } from '../models/web/blog.model';

@Pipe({
  name: 'search'
})
export class SearchPostPipe implements PipeTransform {
    transform(items: Post[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out});
        return items.filter(item => item.title.indexOf(filter as string) !== -1 || item.tag.indexOf(filter as string) !== -1);
    }
}