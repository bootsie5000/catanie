// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  lbBaseURL: "http://127.0.0.1:3000",
  fileserverBaseURL: "http://127.0.0.1:8889",
  externalAuthEndpoint: "/auth/msad",
  archiveWorkflowEnabled: true,
  editMetadataEnabled: true,
  editSampleEnabled: true,
  csvEnabled: true,
  scienceSearchEnabled: true,
  disabledDatasetColumns: [],
  facility: "ESS",
  multipleDownloadEnabled: true,
  shoppingCartEnabled: true,
  columnSelectEnabled: true,
  userProfileImageEnabled: false,
  logbookEnabled: true,
  tableSciDataEnabled: true
};
