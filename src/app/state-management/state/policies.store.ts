import { PolicyFilters, Policy } from 'state-management/models';



export interface PolicyState {
    policies: Policy[];
    selectedPolicies: Policy[];
    currentPolicy: Policy;
    policySubmission: Policy;
    submissionResponse: Policy;
    totalCount: number;
    submitComplete: boolean;

    policiesLoading: boolean;
    error: Error;

    filters: PolicyFilters;


}

export const initialPolicyState: PolicyState = {
    policies: [],
    selectedPolicies: [],
    currentPolicy: null,
    policySubmission: null,
    submissionResponse: null,
    totalCount: 0,
    submitComplete: false,

    policiesLoading: true,
    error: undefined,
    filters: {
      skip: 0,
      limit: 30,
      sortField: "ownerGroup:desc"
    }
};
