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
}