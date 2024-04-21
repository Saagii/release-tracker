import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class ClientsService {

    constructor(
        private _httpClient: HttpClient,
        private _router:Router
    ){}


    /* 
        Get Client Configurations
    */
    getClientsConfig(): any {
        return this._httpClient.get(`${environment.basePath}/api/clientConfig`);
    }


    /*
        Add Client Configuration Types.
    */
    addClientConfigType(clientTypePayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/clientConfig/types`, clientTypePayload);
    }


    /*
        Delete Client Configuration Types.
    */
    deleteClientConfigType(clientTypePayload: any): any {
        return this._httpClient.put(`${environment.basePath}/api/clientConfig/types`, clientTypePayload);
    }


    /* 
        Get Clients List
    */
    getClientsList(): any {
        return this._httpClient.get(`${environment.basePath}/api/clients`);
    }

    
    /*
        Save Client details.
    */
    saveClientDetails(clientPayload: any): any {
        return this._httpClient.post(`${environment.basePath}/api/clients`, clientPayload);
    }


    /*
        Get Client details by ID.
    */
    getClientDetailsByID(clientId: string): any {
        return this._httpClient.get(`${environment.basePath}/api/clients/${clientId}`);
    }
}