import { StringHelper } from "./../_helpers/string.helper";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "removeHtmlTags",
})
export class RemoveHtmlTagsPipe implements PipeTransform {
  transform(value: string, replaceTo = ""): string {
    return StringHelper.replaceHtmlTags(value, replaceTo);
  }
}
