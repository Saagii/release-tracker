import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class MembersService {

    constructor(
        private _httpClient: HttpClient,
        private _router:Router
    ){}


    /* 
        Get Signed-in member's details
    */
    getMemberDetails(memberId: string | null): any {
        return this._httpClient.get(`${environment.basePath}/api/members/${memberId}`);
    }


    /*
        Get Members List based on type.
    */
    getMembersList(memberType: string): any {
        return this._httpClient.get(`${environment.basePath}/api/members/${memberType}`);
    }
}