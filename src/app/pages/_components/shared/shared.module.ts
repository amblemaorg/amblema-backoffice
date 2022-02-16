import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuillModule } from "ngx-quill";
import { TextEditorComponent } from "./text-editor/text-editor.component";
import { ReactiveFormsModule } from "@angular/forms";

const components = [TextEditorComponent];

@NgModule({
  declarations: components,
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
  exports: components,
})
export class SharedModule {}
