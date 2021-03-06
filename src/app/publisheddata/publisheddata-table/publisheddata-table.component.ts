import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { PublishedData } from "shared/sdk";
import { Subscription } from "rxjs";
import {
  FetchAllPublishedData,
  ChangePagePub
} from "state-management/actions/published-data.actions";
import {
  selectAllPublished,
  getCount
} from "state-management/selectors/published-data.selectors";
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material";
import { PageChangeEvent } from "datasets";

export interface PubElement {
  doi: string;
  affiliation: string;
  creator: string;
  publisher: string;
  publicationYear: number;
  title: string;
}

const ELEMENT_DATA: PubElement[] = [
  {
    doi: "10.17199/BRIGHTNESS/BeamInstrumentation0001",
    affiliation: "ESS",
    creator: "Clement Derrez",
    publisher: "ESS",
    publicationYear: 2018,
    title: "Sample Data from BeamInstrumentation"
  },
  {
    doi: "10.17199/BRIGHTNESS/BeamInstrumentation0002",
    affiliation: "ESS",
    creator: "Clement Derrez",
    publisher: "ESS",
    publicationYear: 2018,
    title: "Sample Data from BeamInstrumentation"
  }
];

@Component({
  selector: "publisheddata-table",
  templateUrl: "./publisheddata-table.component.html",
  styleUrls: ["./publisheddata-table.component.scss"]
})
export class PublisheddataTableComponent implements OnInit, OnDestroy {
  public publishedData$ = this.store.pipe(select(selectAllPublished));
  public count$ = this.store.pipe(select(getCount));
  public publishedData: PublishedData[];
  private sub: Subscription[];
  public event: any;
  public constData = [
    {
      name: "x1",
      owner: "owner1"
    }
  ];
  public displayedColumns: string[] = [
    "doi",
    "creator",
    "title",
    "publicationYear"
  ];
  public dataSource = ELEMENT_DATA;
  // MatPaginator Inputs
  public length = 100;
  public pageSize = 10;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  public pageEvent: PageEvent;

  constructor(
    private store: Store<PublishedData>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(new FetchAllPublishedData());
    // this.publishedData$ = this.pubApi.find({ limit: 7 });
    /*this.pubApi.find({ limit: 11 }).subscribe(res => {
      this.publishedData = <PublishedData[]>res;
    });*/
  }

  onClick(published: PublishedData) {
    this.router.navigateByUrl(
      "/publishedDataset/" + encodeURIComponent(published.doi)
    );
  }

  ngOnDestroy() {
    // this.sub.forEach(subscription => subscription.unsubscribe());
  }

  onPageChange(event: PageChangeEvent): void {
    this.store.dispatch(
      new ChangePagePub({ page: event.pageIndex, limit: event.pageSize })
    );
    // this.store.dispatch(new FetchAllPublishedData());
  }
}
