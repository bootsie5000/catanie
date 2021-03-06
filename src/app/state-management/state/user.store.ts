import { Settings, Message, User} from "../models";

// NOTE It IS ok to make up a state of other sub states
export interface UserState {
  currentUser: User;
  profile?: any;
  isLoggingIn: boolean;
  selectingColumn: boolean;
  deletingColumn: boolean;
  currentUserGroups: string[];
  email: string;
  message: Message;
  settings: Settings;
  isLoggedIn: boolean;
  accountType?: string;
  columns: string[];
  displayedColumns: string[];
}

export const initialUserState: UserState = {
  currentUser: null,
  profile: null,
  currentUserGroups: [],
  email: undefined,
  isLoggingIn: false,
  selectingColumn: false,
  deletingColumn: false,
  message: { content: undefined, type: undefined, duration: undefined },
  settings: {
    tapeCopies: "one",
    datasetCount: 30,
    jobCount: 30,
    darkTheme: false
  }, // TODO sync with server settings?
  isLoggedIn: false,
  columns: [
    "select",
    "datasetName",
    "sourceFolder",
    "size",
    "creationTime",
    "type",
    "image",
    "metadata",
    "proposalId",
    "ownerGroup",
    "dataStatus"
  ],
  displayedColumns: [
    "select",
    "datasetName",
    "sourceFolder",
    "size",
    "creationTime",
    "type",
    "image",
    "metadata",
    "proposalId",
    "ownerGroup",
    "dataStatus"
  ]
};
