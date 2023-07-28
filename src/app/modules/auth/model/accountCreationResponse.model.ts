export interface AccountVerificationResponse {
    isTenantCreated: boolean;
    token: {
        memberDetails: object;
        token: string;
    };
}