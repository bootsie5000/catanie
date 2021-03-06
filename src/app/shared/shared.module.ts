import { BreadcrumbModule } from "shared/modules/breadcrumb/breadcrumb.module";
import { ConfigFormModule } from "shared/modules/config-form/config-form.module";
import { ConfigService } from "./services";
import { DialogModule } from "shared/modules/dialog/dialog.module";
import { ErrorPageModule } from "shared/modules/error-page/error-page.module";
import { FileSizePipe } from "./pipes/filesize.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { KeysPipe } from "./pipes";
import { JsonHeadPipe } from "./pipes/json-head.pipe";
import { ThumbnailPipe } from "./pipes/thumbnail.pipe";
import { StripProposalPrefixPipe } from "shared/pipes/stripProposalPrefix.pipe";
import { ScientificMetadataPipe } from "./pipes/scientific-metadata.pipe";
import { ReplaceUnderscorePipe } from "./pipes/replace-underscore.pipe";

@NgModule({
  imports: [
    BreadcrumbModule,
    ConfigFormModule,
    ErrorPageModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule
  ],
  declarations: [
    FileSizePipe,
    KeysPipe,
    JsonHeadPipe,
    ThumbnailPipe,
    StripProposalPrefixPipe,
    ScientificMetadataPipe,
    ReplaceUnderscorePipe
  ],
  providers: [ConfigService],
  exports: [
    BreadcrumbModule,
    ConfigFormModule,
    FileSizePipe,
    DialogModule,
    ErrorPageModule,
    KeysPipe,
    JsonHeadPipe,
    ThumbnailPipe,
    ScientificMetadataPipe,
    StripProposalPrefixPipe,
    ReplaceUnderscorePipe
  ]
})
export class SharedCatanieModule {}
