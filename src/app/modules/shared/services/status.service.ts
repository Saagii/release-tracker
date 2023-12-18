import { Injectable } from "@angular/core";

@Injectable()

export class StatusService {

    constructor(){}

    /*
        Get status style
    */
    getStatusStyle(statusValue: string): any {
        if(['Success', 'Completed', 'Done'].includes(statusValue)) {
            return 'bg-blue-100 text-blue-600 font-bold border border-blue-400'
        }
        if(['Delayed', 'Failed', 'Rejected', 'Stopped', 'Terminated'].includes(statusValue)) {
            return 'bg-red-200 text-red-600 font-bold border border-red-400'
        }
        if(['On Hold', 'Pending', 'Waiting', 'Stalled'].includes(statusValue)) {
            return 'bg-gray-100 text-gray-600 font-bold border border-gray-400'
        }
        if(['Active', 'On Track', 'In Progress'].includes(statusValue)) {
            return 'bg-green-200 text-green-700 font-bold border border-green-400'
        }
        if(['Initiated'].includes(statusValue)) {
            return 'bg-yellow-100 text-yellow-600 font-bold border border-yellow-400'
        }
    }

}