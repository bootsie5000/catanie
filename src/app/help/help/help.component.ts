import { Component, OnInit, Inject } from "@angular/core";
import { APP_CONFIG, AppConfig } from "app-config.module";

@Component({
  selector: "help",
  templateUrl: "./help.component.html",
  styleUrls: ["./help.component.scss"]
})
export class HelpComponent implements OnInit {
  facility: string;
  constructor(@Inject(APP_CONFIG) public appConfig: AppConfig) {}

  ngOnInit() {
    this.facility = this.appConfig.facility;
  }
}
