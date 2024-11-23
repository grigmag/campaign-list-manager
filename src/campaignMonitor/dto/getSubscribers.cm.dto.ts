export interface GetSubscribersCmResponseDto {
  Results: SubscriberCmDto[];
  ResultsOrderedBy: string;
  OrderDirection: string;
  PageNumber: number;
  PageSize: number;
  RecordsOnThisPage: number;
  TotalNumberOfRecords: number;
  NumberOfPages: number;
}

interface SubscriberCmDto {
  EmailAddress: string;
  Name: string;
  Date: string;
  ListJoinedDate: string;
  State: string;
  CustomFields: unknown[];
  ReadsEmailWith: string;
}
