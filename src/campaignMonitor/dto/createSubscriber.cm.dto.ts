export interface CreateSubscriberCmRequestDto {
  EmailAddress: string;
  Name: string;
  MobileNumber?: string;
  CustomFields?: CustomField[];
  Resubscribe?: boolean;
  RestartSubscriptionBasedAutoresponders?: boolean;
  ConsentToTrack: "Yes" | "No"; // Using literal types for consent
  ConsentToSendSms?: "Yes" | "No";
}

interface CustomField {
  Key: string;
  Value: string;
}
