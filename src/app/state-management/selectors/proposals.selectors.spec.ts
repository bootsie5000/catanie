import * as fromProposalSelectors from "./proposals.selectors";
import { Proposal, RawDataset } from "../../shared/sdk/models";

interface ProposalsState {
  proposals: { [proposalId: string]: Proposal };
  datasets: { [datasetId: string]: RawDataset };
  hasFetched: boolean;
  selectedId: string;
}


const initialProposalsState: ProposalsState = {
  proposals: {},
  datasets: {},
  hasFetched: false,
  selectedId: null
};

describe("test Proposal Selectors", () => {
  it("should get HasFetched", () => {
    expect(fromProposalSelectors.getHasFetched.projector(initialProposalsState)).toEqual(false);
  });
});
