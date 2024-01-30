import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { verifyAndCreateAccount } from "../model/verifyAndAccountCreation.model";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {

    constructor(
        private _httpClient: HttpClient,
        private _router:Router
    ){}


    /*
        Set & Get Token from local storage.
    */
    set token(token: any) {
        localStorage.setItem('token', token);
    }

    get tokenValue(): string | null {
        const token = localStorage.getItem('token') ?? null;

        return token ? token : null;
    }

    /*
        Set & Get Token from local storage.
    */
    set memberId(memberId: any) {
        localStorage.setItem('memberId', memberId);
    }

    get memberIdValue(): string | null {
        const token = localStorage.getItem('memberId') ?? null;

        return token ? token : null;
    }

    /*
        Remove token from local storage for logging out.
    */
    memberSignOut(memberId: string): any {
        return this._httpClient.post(`${environment.basePath}/api/members/${memberId}/logout`, {});
    }

    
    /*
        Verify Unique Tag
    */
    verifyUniqueTag(tag: string): any {
        return this._httpClient.get(`${environment.basePath}/api/onboarding/${tag}`);
    }


    /*
        Code Verification & Creating a new Tenant
    */
    verifyAndCreateTenant(tenantPayload: verifyAndCreateAccount): any {
        return this._httpClient.post(`${environment.basePath}/api/onboarding`, tenantPayload);
    }


    /*
        Member SignIn.
    */
    memberSignin(signinPayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/auth/signIn`, signinPayload);
    }
}