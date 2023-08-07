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
        localStorage.setItem('token', token);
    }

    get tokenValue(): string | null {
        const token = localStorage.getItem('token') ?? null;

        return token ? token : null;
    }

    /*
        Remove token from local storage for logging out.
    */
    memberSignOut(): boolean {
        localStorage.removeItem('token');
        return true;
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
        Member SignIn.
    */
    memberSignin(signinPayload: any): any {
        return this._httpClient.post(`http://localhost:3000/api/auth/signIn`, signinPayload);
    }


    /* 
        Sample Testing
    */
    getMemberDetails(): any {
        return this._httpClient.get(`http://localhost:3000/api/members/64c94c600503fef7969a388f`);
    }
}