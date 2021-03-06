import { APP_CONFIG, AppConfigModule } from "app-config.module";
import { ActivatedRoute } from "@angular/router";
import { ConfigFormComponent } from "shared/modules/config-form/config-form.component";
import { DatafilesComponent } from "datasets/datafiles/datafiles.component";
import { DatasetDetailComponent } from "./dataset-detail.component";
import { FileSizePipe } from "../../shared/pipes/filesize.pipe";
import { LinkyPipe } from "ngx-linky";
import { MatTableModule } from "@angular/material";
import { MockActivatedRoute, MockStore } from "shared/MockStubs";
import { MockRouter } from "shared/MockStubs";
import { Router } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ObjKeysPipe, TitleCasePipe, ReplaceUnderscorePipe } from "shared/pipes/index";
import { ReactiveFormsModule } from "@angular/forms";
import { Store, StoreModule } from "@ngrx/store";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { rootReducer } from "state-management/reducers/root.reducer";

describe("DatasetDetailComponent", () => {
  let component: DatasetDetailComponent;
  let fixture: ComponentFixture<DatasetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        AppConfigModule,
        ReactiveFormsModule,
        MatTableModule,
        StoreModule.forRoot({ rootReducer })
      ],
      declarations: [
        DatasetDetailComponent,
        DatafilesComponent,
        ConfigFormComponent,
        LinkyPipe,
        ObjKeysPipe,
        TitleCasePipe,
        FileSizePipe,
        ReplaceUnderscorePipe
      ]
    });
    TestBed.overrideComponent(DatasetDetailComponent, {
      set: {
        providers: [
          {provide: Router, useClass: MockRouter},
          {
            provide: APP_CONFIG,
            useValue: {
              editMetadataEnabled: true
            }
          },
          { provide: ActivatedRoute, useClass: MockActivatedRoute },
          { provide: Store, useClass: MockStore }
        ]
      }
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });


  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
