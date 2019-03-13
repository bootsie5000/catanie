import { APP_CONFIG, AppConfig } from "app-config.module";
import { ArchivingService } from "../archiving.service";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { Dataset, MessageType, ArchViewMode } from "state-management/models";
import { DialogComponent } from "shared/modules/dialog/dialog.component";
import { MatCheckboxChange, MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { ResizeEvent } from 'angular-resizable-element';
import { ShowMessageAction } from "state-management/actions/user.actions";
import { Subscription } from "rxjs";
import {
  getDisplayedColumns
} from "../../state-management/selectors/users.selectors";
import { getError, submitJob } from "state-management/selectors/jobs.selectors";
import { select, Store } from "@ngrx/store";
import {
  AddToBatchAction,
  ChangePageAction,
  ClearSelectionAction,
  DeselectDatasetAction,
  ExportToCsvAction,
  SelectAllDatasetsAction,
  SelectDatasetAction,
  SetViewModeAction,
  SortByColumnAction
} from "state-management/actions/datasets.actions";

import {
  getDatasets,
  getDatasetsPerPage,
  getIsLoading,
  getPage,
  getSelectedDatasets,
  getTotalSets,
  getViewMode
} from "state-management/selectors/datasets.selectors";
import { StylesCompileDependency } from "@angular/compiler";

export interface PageChangeEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

export interface SortChangeEvent {
  active: keyof Dataset;
  direction: "asc" | "desc" | "";
}
@Component({
  selector: "dataset-table",
  templateUrl: "dataset-table.component.html",
  styleUrls: ["dataset-table.component.scss"]
})
export class DatasetTableComponent implements OnInit, OnDestroy {
  datasets$ = this.store.pipe(select(getDatasets));
  currentPage$ = this.store.pipe(select(getPage));
  datasetsPerPage$ = this.store.pipe(select(getDatasetsPerPage));
  datasetCount$ = this.store.select(getTotalSets);
  loading$ = this.store.pipe(select(getIsLoading));

  public currentMode: ArchViewMode;
  private selectedSets$ = this.store.pipe(select(getSelectedDatasets));
  private mode$ = this.store.pipe(select(getViewMode));
  private selectedPids: string[] = [];
  private selectedPidsSubscription = this.selectedSets$.subscribe(datasets => {
    this.selectedPids = datasets.map(dataset => dataset.pid);
  });
  private inBatchPids: string[] = [];
  public viewModes =  ArchViewMode;
  private modes = [
    ArchViewMode.all,
    ArchViewMode.archivable,
    ArchViewMode.retrievable,
    ArchViewMode.work_in_progress
  ];
  private modeLabels = [
    ArchViewMode.all,
    ArchViewMode.archivable,
    ArchViewMode.retrievable,
    ArchViewMode.work_in_progress
  ];
  // compatibility analogs of observables
  private selectedSets: Dataset[] = [];
  private selectedSetsSubscription = this.selectedSets$.subscribe(
    selectedSets => (this.selectedSets = selectedSets)
  );
  private modeSubscription = this.mode$.subscribe((mode: ArchViewMode) => {
    this.currentMode = mode;
  });
  // and eventually be removed.
  private submitJobSubscription: Subscription;
  private jobErrorSubscription: Subscription;
  private defaultColumns: string[];
  public visibleColumns: string[];
  columns$ = this.store.pipe(select(getDisplayedColumns));
  public columnSize: string;

  constructor(
    private router: Router,
    private store: Store<any>,
    private archivingSrv: ArchivingService,
    public dialog: MatDialog,
    @Inject(APP_CONFIG) public appConfig: AppConfig
  ) {}

  ngOnInit() {
    this.columns$.subscribe(columns => {
      this.defaultColumns = columns;
      this.visibleColumns = this.defaultColumns.filter(
        column => this.appConfig.disabledDatasetColumns.indexOf(column) === -1
      );
    });
    this.submitJobSubscription = this.store.pipe(select(submitJob)).subscribe(
      ret => {
        if (ret && Array.isArray(ret)) {
          console.log(ret);
          this.store.dispatch(new ClearSelectionAction());
        }
      },
      error => {
        this.store.dispatch(
          new ShowMessageAction({
            type: MessageType.Error,
            content: "Job not Submitted",
            duration: 5000
          })
        );
      }
    );

    this.jobErrorSubscription = this.store
      .pipe(select(getError))
      .subscribe(err => {
        if (err) {
          this.store.dispatch(
            new ShowMessageAction({
              type: MessageType.Error,
              content: err.message,
              duration: 5000
            })
          );
        }
      });
  }

  ngOnDestroy() {
    this.modeSubscription.unsubscribe();
    this.selectedSetsSubscription.unsubscribe();
    this.submitJobSubscription.unsubscribe();
    this.jobErrorSubscription.unsubscribe();
    this.selectedPidsSubscription.unsubscribe();
  }

  onExportClick(): void {
    this.store.dispatch(new ExportToCsvAction());
  }

  onResizeEnd(event: ResizeEvent): void {
    this.columnSize = event.rectangle.width + "px";
    console.log('Element was resized', this.columnSize);
  }

  /**
   * Handle changing of view mode and disabling selected rows
   * @param event
   * @param mode
   */
  onModeChange(event, mode: ArchViewMode): void {
    this.store.dispatch(new SetViewModeAction(mode));
  }

  /**
   * Sends archive command for selected datasets (default includes all
   * datablocks for now) to Dacat API
   * @param {any} event - click handler (not currently used)
   * @memberof DashboardComponent
   */
  archiveClickHandle(event): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "auto",
      data: { title: "Really archive?", question: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.archivingSrv.archive(this.selectedSets).subscribe(
          () => this.store.dispatch(new ClearSelectionAction()),
          err =>
            this.store.dispatch(
              new ShowMessageAction({
                type: MessageType.Error,
                content: err.message,
                duration: 5000
              })
            )
        );
      }
      // this.onClose.emit(result);
    });
  }

  /**
   * Sends retrieve command for selected datasets
   * @param {any} event - click handler (not currently used)
   * @memberof DashboardComponent
   */
  retrieveClickHandle(event): void {
    const destPath = "/archive/retrieve";
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "auto",
      data: {
        title: "Really retrieve?",
        question: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.archivingSrv.retrieve(this.selectedSets, destPath).subscribe(
          () => this.store.dispatch(new ClearSelectionAction()),
          err =>
            this.store.dispatch(
              new ShowMessageAction({
                type: MessageType.Error,
                content: err.message,
                duration: 5000
              })
            )
        );
      }
    });
  }

  onClick(dataset: Dataset): void {
    const pid = encodeURIComponent(dataset.pid);
    this.router.navigateByUrl("/datasets/" + pid);
  }

  isSelected(dataset: Dataset): boolean {
    return this.selectedPids.indexOf(dataset.pid) !== -1;
  }

  isInBatch(dataset: Dataset): boolean {
    return this.inBatchPids.indexOf(dataset.pid) !== -1;
  }

  onSelect(event: MatCheckboxChange, dataset: Dataset): void {
    if (event.checked) {
      this.store.dispatch(new SelectDatasetAction(dataset));
    } else {
      this.store.dispatch(new DeselectDatasetAction(dataset));
    }
  }

  onSelectAll(event: MatCheckboxChange) {
    if (event.checked) {
      this.store.dispatch(new SelectAllDatasetsAction());
    } else {
      this.store.dispatch(new ClearSelectionAction());
    }
  }

  onPageChange(event: PageChangeEvent): void {
    this.store.dispatch(new ChangePageAction(event.pageIndex, event.pageSize));
  }

  onSortChange(event: SortChangeEvent): void {
    const { active: column, direction } = event;
    this.store.dispatch(new SortByColumnAction(column, direction));
  }

  onAddToBatch(): void {
    this.store.dispatch(new AddToBatchAction());
    this.store.dispatch(new ClearSelectionAction());
  }

  setWidthColor(datasetSize) {
    let width = 10;
    let color = "red";
    if (datasetSize > 1000000000) {
      width = 10;
      color = "red";
    } else {
      width = 5;
      color = "green";
    }
    const styles = {
      "background-color": "red",
      "width.px": width
    };
    return styles;
  }
}
