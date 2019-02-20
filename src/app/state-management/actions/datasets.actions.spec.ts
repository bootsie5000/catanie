import { Dataset } from "shared/sdk/models";
import { ArchViewMode } from "state-management/models";
import {
  CLEAR_SELECTION,
  ClearSelectionAction,
  CurrentSetAction,
  DATABLOCKS,
  DATABLOCKS_FAILED,
  DatablocksAction,
  DatablocksFailedAction,
  DESELECT_DATASET,
  DeselectDatasetAction,
  EXPORT_TO_CSV,
  ExportToCsvAction,
  FILTER_UPDATE,
  SEARCH_ID_COMPLETE,
  SearchIDCompleteAction,
  SELECT_CURRENT,
  SELECT_DATASET,
  SelectDatasetAction,
  SET_VIEW_MODE,
  SetViewModeAction,
  SORT_BY_COLUMN,
  SortByColumnAction,
  UpdateFilterAction
} from "./datasets.actions";

describe("UpdateFilterAction", () => {
  it("should create an action", () => {
    const payload = [{ id: "1" }];
    const action = new UpdateFilterAction(payload);
    expect({ ...action }).toEqual({ type: FILTER_UPDATE, payload });
  });
});

describe("SearchIDCompleteAction", () => {
  it("should create an action", () => {
    const dataset = new Dataset();
    const action = new SearchIDCompleteAction(dataset);
    expect({ ...action }).toEqual({ type: SEARCH_ID_COMPLETE, dataset });
  });
});

describe("DatablocksAction", () => {
  it("should create an action in datablocks", () => {
    const id = "idstring";
    const action = new DatablocksAction(id);
    expect({ ...action }).toEqual({ type: DATABLOCKS, id });
  });
});

describe("DatablocksFailedAction", () => {
  it("should create an action", () => {
    const error = new Error();
    const action = new DatablocksFailedAction(error);
    expect({ ...action }).toEqual({ type: DATABLOCKS_FAILED, error });
  });
});

describe("CurrentSetAction", () => {
  it("should create an action", () => {
    const dataset = new Dataset();
    const action = new CurrentSetAction(dataset);
    expect({ ...action }).toEqual({ type: SELECT_CURRENT, dataset });
  });
});

describe("SelectDatasetAction", () => {
  it("should create an action", () => {
    const dataset = new Dataset();
    const action = new SelectDatasetAction(dataset);
    expect({ ...action }).toEqual({ type: SELECT_DATASET, dataset });
  });
});

describe("DeselectDatasetAction", () => {
  it("should create an action", () => {
    const dataset = new Dataset();
    const action = new DeselectDatasetAction(dataset);
    expect({ ...action }).toEqual({ type: DESELECT_DATASET, dataset });
  });
});

describe("ClearSelectionAction", () => {
  it("should create an action", () => {
    const action = new ClearSelectionAction();
    expect({ ...action }).toEqual({ type: CLEAR_SELECTION });
  });
});

describe("ExportToCsvAction", () => {
  it("should create an action", () => {
    const action = new ExportToCsvAction();
    expect({ ...action }).toEqual({ type: EXPORT_TO_CSV });
  });
});

describe("SortByColumnAction", () => {
  it("should create an action", () => {
    const column = "3";
    const direction = "1";
    const action = new SortByColumnAction(column, direction);
    expect({ ...action }).toEqual({ type: SORT_BY_COLUMN, column, direction });
  });
});

describe("SetViewModeAction", () => {
  it("should create an action", () => {
    const modeToggle = ArchViewMode.all;
    const action = new SetViewModeAction(modeToggle);
    expect({ ...action }).toEqual({ type: SET_VIEW_MODE, modeToggle });
  });
});
