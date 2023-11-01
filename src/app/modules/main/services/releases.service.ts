import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class ReleasesService {

    constructor(
        private _httpClient: HttpClient,
        private _router:Router
    ){}


    /* 
        Get release Configurations
    */
    getReleasesConfig(): any {
        return this._httpClient.get(`${environment.basePath}/api/releaseConfig`);
    }


    /*
        Add release Configuration Types.
    */
    addReleaseConfigType(releaseTypePayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/releaseConfig/types`, releaseTypePayload);
    }


    /*
        Add release Configuration Status.
    */
    addReleaseConfigStatus(releaseStatusPayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/releaseConfig/status`, releaseStatusPayload);
    }


    /*
        Update release Configuration Members Limit.
    */
    updateReleaseConfigTarget(releaseTargetPayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/releaseConfig/target`, releaseTargetPayload);
    }


    /*
        Delete release Configuration Types.
    */
    deleteReleaseConfigType(releaseTypePayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/releaseConfig/types`, releaseTypePayload);
    }


    /*
        Delete release Configuration Status.
    */
    deleteReleaseConfigStatus(releaseStatusPayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/releaseConfig/status`, releaseStatusPayload);
    }


    /* 
        Get release Details
    */
    getReleaseDetails(releaseId: string): any {
        return this._httpClient.get(`${environment.basePath}/api/releases/${releaseId}`);
    }


    /* 
        Get release list
    */
    getReleasesList(): any {
        return this._httpClient.get(`${environment.basePath}/api/releases`);
    }


    /*
        Add release Configuration Status.
    */
    createReleaseDetails(releaseDetailsPayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/releases`, releaseDetailsPayload);
    }


    /*
        Add release Configuration Status.
    */
    updateReleaseDetails(releaseDetailsPayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/releases`, releaseDetailsPayload);
    }
}