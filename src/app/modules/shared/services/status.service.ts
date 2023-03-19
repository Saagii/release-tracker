import { Injectable } from "@angular/core";

@Injectable()

export class StatusService {

    constructor(){}

    /*
        Get status style
    */
    getStatusStyle(statusValue: string): any {
        if(['Success', 'Completed', 'Done'].includes(statusValue)) {
            return 'bg-blue-100 text-blue-600 font-bold border border-blue-200'
        }
        if(['Delayed', 'Failed', 'Rejected', 'Stopped', 'Terminated'].includes(statusValue)) {
            return 'bg-red-100 text-red-600 font-bold border border-red-200'
        }
        if(['On Hold', 'Pending', 'Waiting', 'Stalled'].includes(statusValue)) {
            return 'bg-gray-100 text-gray-600 font-bold border border-gray-200'
        }
        if(['Active', 'On Track', 'In Progress'].includes(statusValue)) {
            return 'bg-green-100 text-green-600 font-bold border border-green-200'
        }
    }

}