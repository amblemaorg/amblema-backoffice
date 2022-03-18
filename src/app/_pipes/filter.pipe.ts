import { StringHelper } from "../_helpers/string.helper";

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "Filter",
})
export class FilterPipe implements PipeTransform {
  /**
   * @param  items
   * Extraído de un items *ngFor
   * @param text: string
   * Valor con el que se buscan coincidencias
   * @param column: string
   * Atributo o column del items donde se encontrara el valor a coincidir
   * @param notFound: string opcional default = ""
   * Mensaje a mostrar cuando no se encuentran coincidencias
   * @returns arreglo filtrado por el atributo, a partir de un text
   */
  transform(
    items: any[],
    text: string,
    columns: string | string[],
    method: "some" | "every" = "some",
    notFound?: any
  ): any[] {
    if (text === "" || !text) {
      return items;
    }

    text = StringHelper.rmDiacritics(text);

    let keyWords;
    keyWords = text.split(/[ |,|_|-|/]/).filter((keyWord) => keyWord !== "");
    keyWords = keyWords.join("|");

    keyWords = new RegExp(keyWords, "gi");

    items = items.filter((items) => {
      if (!Array.isArray(columns)) {
        return StringHelper.rmDiacritics(items[columns]).match(keyWords);
      }

      // if (method === "every") {
      //   return columns.every((column) => {
      //     return items[column].match(keyWords);
      //   });
      // }

      return columns.some((column) => {
        return StringHelper.rmDiacritics(items[column]).match(keyWords);
      });
    });

    if (items.length === 0 && notFound) {
      return [notFound];
    }

    return items;
  }
}
