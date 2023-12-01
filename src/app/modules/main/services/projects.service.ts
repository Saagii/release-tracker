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
        Add project Configuration Status.
    */
    addProjectConfigStatus(projectStatusPayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/projectConfig/status`, projectStatusPayload);
    }


    /*
        Update project Configuration Members Limit.
    */
    updateProjectConfigMembersLimit(projectMembersLimitPayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/projectConfig/membersLimit`, projectMembersLimitPayload);
    }


    /*
        Delete project Configuration Types.
    */
    deleteProjectConfigType(projectTypePayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/projectConfig/types`, projectTypePayload);
    }


    /*
        Delete project Configuration Status.
    */
    deleteProjectConfigStatus(projectStatusPayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/projectConfig/status`, projectStatusPayload);
    }


    /*
        Update project Configuration members limit.
    */
    deleteProjectConfigMembersLimit(projectMembersLimitPayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/projectConfig/membersLimit`, projectMembersLimitPayload);
    }


    /*
        Create project details.
    */
    createProjectDetails(projectDetailsPayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/projects`, projectDetailsPayload);
    }


    /*
        Get projects list.
    */
    getProjectsList(): any {
        return this._httpClient.get(`${environment.basePath}/api/projects`);
    }


    /*
        Get project details by client Id and project Id.
    */
    getProjectDetailsByProjectId(projectId: string): any {
        return this._httpClient.get(`${environment.basePath}/api/projects/${projectId}`);
    }

}