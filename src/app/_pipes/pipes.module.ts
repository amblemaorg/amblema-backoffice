import { RemoveHtmlTagsPipe } from "./remove-html-tags.pipe";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const pipes = [RemoveHtmlTagsPipe];

@NgModule({
  declarations: pipes,
  imports: [CommonModule],
  exports: pipes,
})
export class PipesModule {}
