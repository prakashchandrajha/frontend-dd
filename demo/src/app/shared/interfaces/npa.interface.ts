export interface BorrowerDetails {
  borrowerName: string;
  npaDate: string; // Can be any date in the past (1 month, 2 months, etc.)
}

export interface NPADetails {
  id?: number;
  borrowerDetails: BorrowerDetails;
  createdBy?: string;
  createdDate?: string;
  status?: string;
}
