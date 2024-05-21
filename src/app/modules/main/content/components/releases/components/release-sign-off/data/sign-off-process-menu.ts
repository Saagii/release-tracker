import { ExamineComponent } from "../child-components/examine/examine.component";

export const signOffProcessMenu = [
    {
        name: 'Examine',
        icon: 'my_library_books',
        component: ExamineComponent
    },
    {
        name: 'Preview: Release Notes',
        icon: 'view_list',
        component: ''
    },
    {
        name: 'Sign-Off Approvals',
        icon: 'assignment_turned_in',
        component: ''
    },
    {
        name: 'View & Download',
        icon: 'file_download',
        component: ''
    },
    {
        name: 'Feedback',
        icon: 'rate_review',
        component: ''
    }
];