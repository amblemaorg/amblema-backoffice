import { FilterPipe } from "./filter.pipe";
import { RemoveHtmlTagsPipe } from "./remove-html-tags.pipe";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const pipes = [RemoveHtmlTagsPipe, FilterPipe];

@NgModule({
  declarations: pipes,
  imports: [CommonModule],
  exports: pipes,
})
export class PipesModule {}
