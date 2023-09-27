import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class ProjectsService {

    constructor(
        private _httpClient: HttpClient,
        private _router:Router
    ){}


    /* 
        Get project Configurations
    */
    getProjectsConfig(): any {
        return this._httpClient.get(`${environment.basePath}/api/projectConfig`);
    }


    /*
        Add project Configuration Types.
    */
    addProjectConfigType(projectTypePayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/projectConfig/types`, projectTypePayload);
    }


    /*
        Delete project Configuration Types.
    */
    deleteProjectConfigType(projectTypePayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/projectConfig/types`, projectTypePayload);
    }


    /* 
        Get Projects List
    */
    getProjectsList(): any {
        return this._httpClient.get(`${environment.basePath}/api/Projects`);
    }

    
    /*
        Save project details.
    */
    saveProjectDetails(projectPayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/Projects`, projectPayload);
    }
}