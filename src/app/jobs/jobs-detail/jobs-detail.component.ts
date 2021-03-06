import { Component, OnDestroy, OnInit } from "@angular/core";
import * as JobActions from "state-management/actions/jobs.actions";
import { Job } from "shared/sdk/models";
import { select, Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import * as selectors from "state-management/selectors";
import { getCurrentJob } from "../../state-management/selectors/jobs.selectors";

@Component({
  selector: "app-jobs-detail",
  templateUrl: "./jobs-detail.component.html",
  styleUrls: ["./jobs-detail.component.scss"]
})
export class JobsDetailComponent implements OnInit, OnDestroy {
  job$ = this.store.pipe(select(getCurrentJob));
  job: Job = undefined;
  subscriptions = [];


  constructor(private route: ActivatedRoute, private store: Store<any>) {}

  ngOnInit() {
    this.subscriptions.push(
      this.store.pipe(select(selectors.jobs.getCurrentJob)).subscribe(job => {
        if (job && Object.keys(job).length > 0) {
          this.job = <Job>job;
        } else {
          console.log("Searching from URL params");
          this.route.params.subscribe(params => {
            this.store.dispatch(new JobActions.SearchIDAction(params.id));
          });
        }
      })
    );
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
    this.store.dispatch(new JobActions.CurrentJobAction(undefined));
  }
}
