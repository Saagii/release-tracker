export interface verifyAndCreateAccount {
    tenants: {
        orgName: string;
        orgType: string;
        tag: string;
        memberType: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        verificationCode: string;
    }[];
}