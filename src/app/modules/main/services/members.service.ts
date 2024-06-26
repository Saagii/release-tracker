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
        Get Members List
    */
    getMembersList(memberType: string): any {
        return this._httpClient.get(`${environment.basePath}/api/members/${memberType}`);
    }


    /*
        Get Members List based on type.
    */
    getMembersListByType(memberType: string): any {
        return this._httpClient.get(`${environment.basePath}/api/members/type/${memberType}`);
    }

    
    /*
        Get Members List based on search payload.
    */
    getMembersListBySearch(memberSearchPayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/members/search`, memberSearchPayload);
    }


    /* 
        Get Members Configurations
    */
    getMembersConfig(): any {
        return this._httpClient.get(`${environment.basePath}/api/memberConfig`);
    }


    /*
        Add Member Configuration Title.
    */
    addMemberConfigTitle(memberTitlePayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/memberConfig/titles`, memberTitlePayload);
    }


    /*
        Delete Member Configuration Title.
    */
    deleteMemberConfigTitle(memberTitlePayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/memberConfig/titles`, memberTitlePayload);
    }
}