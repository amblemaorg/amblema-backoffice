import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
} from "@angular/core";
import { StringHelper } from "src/app/_helpers/string.helper";
import { AbstractReactive } from "../abstract-reactive";

@Component({
  selector: "app-textarea-editor",
  templateUrl: "./textarea-editor.component.html",
  styleUrls: ["./textarea-editor.component.scss"],
})
export class TextareaEditorComponent
  extends AbstractReactive
  implements AfterContentChecked
{
  @Input() state: boolean | null = false;
  @Input() maxLength: number | null = null;
  @Input() styles = { "min-height": "250px" };

  length = 0;
  value = "";
  show = false;

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {}

  ngAfterContentChecked() {
    if (this.control) {
      this.show = true;
      if (this.maxLength > 0) {
        // if (!this.control.value) {
        //   this.value = "";
        // }

        // const planeText = StringHelper.replaceHtmlTags(this.value);

        // if (planeText.length < this.maxLength) {
        //   this.value = this.control.value;
        // }

        // // this.value =
        // //   planeText.length < this.maxLength ? this.control.value : this.value;
        // // this.value = this.control.value ? this.control.value : "";

        // this.length = this.value ? planeText.length : 0;

        this.value = this.control.value ? this.control.value : "";
        this.length = StringHelper.replaceHtmlTags(this.value).length;

        // console.clear();
        // console.log("this.control.value", this.control);
        // console.log("this.length", this.length);
        // console.log("this.value", this.value);
      }
    }
    this.cd.detectChanges();
  }
}
