import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";
import { RegExpEnum, StringHelper } from "src/app/_helpers/string.helper";
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
  previousValue = "";
  show = false;

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    if (this.control) {
      this.show = true;

      // this.control.setValidators(Validators.maxLength(10));
      this.control.setValidators(this.maxLengthValidator(10));

      if (this.maxLength > 0) {
        this.control.valueChanges.subscribe((valueChanges) => {
          if (this.length <= this.maxLength) {
            this.value = this.control.value ? this.control.value : "";
          }

          this.length = StringHelper.replaceHtmlTags(this.value).length;

          // if (this.length <= this.maxLength) {
          //   this.control.setValidators;
          // }

          console.log("this.value", this.value);
          console.log("this.control.valid", this.control.valid);
        });
      }
    }
  }

  ngAfterContentChecked() {
    // if (this.control) {
    //   this.show = true;
    //   if (this.maxLength > 0) {
    //     this.value = this.control.value ? this.control.value : "";
    //     this.length = StringHelper.replaceHtmlTags(this.value).length;
    //     // if (this.length > this.maxLength) {
    //     //   // this.value = this.control.value;
    //     //   if(this.value.match(RegExpEnum.htmlTags)) {
    //     //   }
    //     // }
    //     // console.clear();
    //     // console.log("this.control", this.control);
    //     // console.log("this.length", this.length);
    //     // console.log("this.value", this.control.value);
    //   }
    // }
    // this.cd.detectChanges();
  }

  private maxLengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (
        // (control.value !== undefined || control.value !== null) &&
        StringHelper.replaceHtmlTags(control.value).length > maxLength
      ) {
        return { planeTextMaxLength: true };
      }
      return null;
    };
  }
}
