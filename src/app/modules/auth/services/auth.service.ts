import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { verifyAndCreateAccount } from "../model/verifyAndAccountCreation.model";

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
        localStorage.setItem('token', JSON.stringify(token));
    }

    get tokenValue(): string | null {
        const token = localStorage.getItem('token') ?? null;

        return token ? token : null;
    }

    
    /*
        Verify Unique Tag
    */
    verifyUniqueTag(tag: string): any {
        return this._httpClient.get(`http://localhost:3000/api/onboarding/${tag}`);
    }


    /*
        Code Verification & Creating a new Tenant
    */
    verifyAndCreateTenant(tenantPayload: verifyAndCreateAccount): any {
        return this._httpClient.post(`http://localhost:3000/api/onboarding`, tenantPayload);
    }


    /*
        Member login.
    */
    memberSignin(signinPayload: any): any {
        return this._httpClient.post(`http://localhost:3000/api/auth/login`, signinPayload);
    }
}