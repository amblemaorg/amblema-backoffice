import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
} from "@angular/core";
import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";
import { QuillEditorComponent } from "ngx-quill";
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
  @ViewChild("quillEditor") quillEditor: QuillEditorComponent;

  length = 0;
  value = "";
  show = false;

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  async ngOnInit() {
    if (this.control) {
      this.show = true;

      if (this.maxLength > 0) {
        this.control.setValidators(this.maxLengthValidator(this.maxLength)); // added validator about maxLength custom to quill
        this.control.valueChanges.subscribe((valueChanges) => {
          this.value = this.control.value ? this.control.value : "";
          this.length = StringHelper.replaceHtmlTags(this.value).length; // set length to small counter

          if (this.quillEditor) {
            // that avoids entering more characters if user has reached the limit
            this.quillEditor.elementRef.nativeElement.addEventListener(
              "keypress",
              (event) => {
                if (this.length + 1 <= this.maxLength) {
                  return true;
                }

                event.preventDefault();

                return false;
              }
            );
          }
        });
      }
    }
  }

  ngAfterContentChecked() {}

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
