export enum RegExpEnum {
  htmlTags = "/(<([^>]+)>)/gi",
}

// const replaceHtmlTags = (string: string, replaceTo = "") => {
//     return string.replace(/(<([^>]+)>)/gi, replaceTo);
// };

export class StringHelper {
  /**
   * @description Return the string replacing html tags for "" or optional string
   * @author Christopher Dallar Document This
   * @date 16/02/2022
   * @static
   * @param {string} string
   * @param {string} [replaceTo=""]
   * @return {string}
   * @memberof StringHelper
   */
  static replaceHtmlTags(string: string, replaceTo = ""): string {
    string = string ? string : "";
    return string.replace(/(<([^>]+)>)/gi, replaceTo);
  }

  /**
   * @description Return string without accents or diacritics (Except ñ)
   * @author Christopher Dallar Document This
   * @date 14/03/2022
   * @static
   * @param {string} text
   * @return
   * @memberof StringHelper
   */
  static rmDiacritics(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
        "$1"
      )
      .normalize();
  }
}
