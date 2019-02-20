import { Observable, of, Subject } from "rxjs";
import { Sample } from "./sdk/models";

export class MockUserApi {
  getCurrentId() {
    return 123;
  }

  getCurrent() {
    return of([{ username: "admin" }]);
  }

  getCurrentToken() {
    return { user: { username: "admin" } };
  }

  getCachedCurrent() {
    return { username: "admin" };
  }

  jwt() {
    return of("");
  }
}

export class MockDatasetApi {
  getDatasets() {
    return of([]);
  }

  getDatablocks() {
    return of([]);
  }

  find() {
    return of([]);
  }

  findById() {
    return of([]);
  }
}

export class MockDatasetAttachmentApi {}

export class MockMatDialogRef {}

export class MockMatDialogData {}

export class MockDatablockApi {
  getDatafiles() {
    return of([]);
  }
}

export class MockAuthService {}

export class MockSampleService {
  sample: Sample;

  getSamples(): Observable<Sample[]> {
    this.sample = {
      samplelId: "string",
      owner: "string",
      description: "string",
      createdAt: new Date,
      sampleCharacteristics: "string",
      attachments: ["string"],
      ownerGroup: "string",
      accessGroups: ["string"],
      createdBy: "string",
      updatedBy: "string",
      updatedAt: new Date
    };

    return of([this.sample]);
  }

  getSample(): Observable<Sample> {
    this.sample = {
      samplelId: "string",
      owner: "string",
      description: "string",
      createdAt: new Date,
      sampleCharacteristics: "string",
      attachments: ["string"],
      ownerGroup: "string",
      accessGroups: ["string"],
      createdBy: "string",
      updatedBy: "string",
      updatedAt: new Date
    };

    return of(this.sample);
  }

}

export class MockLoopBackAuth {
  user = {};

  getUser() {
    return of([{ username: "admin" }]);
  }

  setUser(user) {
    this.user = user;
  }
}

export class MockLocation {}

export class MockActivatedRoute {
  // stub detail goes here
  snapshot = { queryParams: { returnUrl: "/" } };
  params = of([{ id: 1 }]);
  queryParams = of([{ limit: 10 }]);
}

export class MockRouter {
  navigate = function(url, params) {};

  // jasmine.createSpy('navigate');
  navigateByUrl(url: string) {
    return url;
  }
}

export class MockHttp {}

export class MockJobApi {
  find() {
    return of([
      [
        {
          creationTime: "2017-06-19T08:38:14.671Z",
          emailJobInitiator: "test.user@psi.ch",
          id: "59478d76d7bbe2dd2e619cb6",
          type: "retrieve"
        }
      ]
    ]);
  }
}


export class MockSampleApi {
  find() {
    return of(
      [
        {
          samplelId: "string",
          owner: "string",
          description: "string",
          createdAt: Date,
          sampleCharacteristics: "string",
          attachments: ["string"],
          ownerGroup: "string",
          accessGroups: ["string"],
          createdBy: ["string"],
          updatedBy: ["string"],
          updatedAt: Date
        }
      ]
    );
  }
}

export class MockConfigService {
  getConfigFile() {
    return of([undefined]);
  }
}

export class MockJobHandlerService {}

export class MockParamsService {}

export class MockDatasetService {
  datasetChange: Subject<string> = new Subject<string>();

  // TODO hold datasets and return array of samples
  searchDatasets() {
    return null;
  }

  searchDatasetsObservable() {
    return of([]);
  }

  getBlockObservable() {
    return of([]);
  }
}

export class MockProposalApi {
  // TODO hold datasets and return array of samples
  find(filter?: any) {
    return of([]);
  }
}

export class MockUserMsgService {
  private subject = new Subject<any>();

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  sendMessage(message: object, delay = 0) {}

  clearMessage() {}
}

export class MockStore {
  public dispatch(obj) {}

  public select(obj) {
    return of([]);
  }

  public pipe(obj) {
    return of([]);
  }
}

export class MockNotificationService {
  public dispatch(obj) {}

  public select(obj) {
    return of([]);
  }
}

export class MockArchivingService {
  public dispatch(obj) {
  }

  public select(obj) {
    return of([]);
  }
}

export class MockLoginService {}
