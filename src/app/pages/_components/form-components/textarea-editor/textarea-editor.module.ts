import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { QuillModule } from "ngx-quill";
import { TextareaEditorComponent } from "./textarea-editor.component";

@NgModule({
  declarations: [TextareaEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          // [{ list: "ordered" }, { list: "bullet" }],
          // [{ header: [2, 3, 4, 5, 6, false] }],
          ["link"],
          ["blockquote"],
        ],
      },
    }),
  ],
  exports: [TextareaEditorComponent],
})
export class TextareaEditorModule {}
