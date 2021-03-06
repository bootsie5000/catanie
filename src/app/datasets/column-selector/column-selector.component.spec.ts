import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ColumnSelectorComponent } from "./column-selector.component";
import { APP_CONFIG } from "app-config.module";
import { Store } from "@ngrx/store";
import { MockStore } from "shared/MockStubs";
import { MatCheckboxModule, MatCardModule } from "@angular/material";

describe("ColumnSelectorComponent", () => {
  let component: ColumnSelectorComponent;
  let fixture: ComponentFixture<ColumnSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnSelectorComponent],
      imports: [MatCardModule, MatCheckboxModule]
    });
    TestBed.overrideComponent(ColumnSelectorComponent, {
      set: {
        providers: [
          {
            provide: APP_CONFIG,
            useValue: {
              editMetadataEnabled: true
            }
          },
          { provide: Store, useClass: MockStore }
        ]
      }
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
