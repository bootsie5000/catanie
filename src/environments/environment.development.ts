// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=development` then `environment.development.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: true,
  lbBaseURL: 'https://dacat-development.psi.ch',
  archiveWorkflowEnabled: true,
  externalAuthEndpoint: '/auth/msad',
  editMetadataEnabled: true,
  editSampleEnabled: true,
  csvEnabled: true,
  scienceSearchEnabled: true,
  disabledDatasetColumns: [],
  facility: "PSI",
  multipleDownloadEnabled: true,
  shoppingCartEnabled: true,
  columnSelectEnabled: true
};
