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
        Save Client details.
    */
    saveClientDetails(): void {
        
    }
}