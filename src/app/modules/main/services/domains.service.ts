import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class DomainsService {

    constructor(
        private _httpClient: HttpClient,
        private _router:Router
    ){}


    /* 
        Get domain Configurations
    */
    getDomainsConfig(): any {
        return this._httpClient.get(`${environment.basePath}/api/domainConfig`);
    }


    /*
        Add domain Configuration Types.
    */
    addDomainConfigType(domainTypePayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/domainConfig/types`, domainTypePayload);
    }


    /*
        Add domain Configuration Status.
    */
    addDomainConfigStatus(domainStatusPayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/domainConfig/status`, domainStatusPayload);
    }


    /*
        Delete domain Configuration Types.
    */
    deleteDomainConfigType(domainTypePayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/domainConfig/types`, domainTypePayload);
    }


    /*
        Delete domain Configuration Status.
    */
    deleteDomainConfigStatus(domainStatusPayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/domainConfig/status`, domainStatusPayload);
    }
}