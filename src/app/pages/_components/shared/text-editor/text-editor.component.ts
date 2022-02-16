import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
} from "@angular/core";
import { StringHelper } from "src/app/_helpers/string.helper";
import { AbstractReactive } from "../../form-components/abstract-reactive";

@Component({
  selector: "app-text-editor",
  templateUrl: "./text-editor.component.html",
  styleUrls: ["./text-editor.component.scss"],
})
export class TextEditorComponent
  extends AbstractReactive
  implements AfterContentChecked
{
  @Input() state: boolean | null = false;
  @Input() maxLength: number | null = null;

  length = 0;
  value: string;
  show = false;

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {}

  ngAfterContentChecked() {
    if (this.control) {
      this.show = true;
      if (this.maxLength > 0) {
        this.value = this.control.value ? this.control.value : null;
        this.length = this.value
          ? StringHelper.replaceHtmlTags(this.value).length
          : 0;
      }
    }
    this.cd.detectChanges();
  }
}
