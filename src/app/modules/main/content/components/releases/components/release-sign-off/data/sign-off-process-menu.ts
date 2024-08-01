import { ExamineComponent } from "../child-components/examine/examine.component";
import { PreviewReleaseNotesComponent } from "../child-components/preview/preview.component";

export const signOffProcessMenu = [
    {
        name: 'Examine & Preview',
        icon: 'my_library_books',
        component: ExamineComponent
    },
    // {
    //     name: 'Preview: Release Notes',
    //     icon: 'view_list',
    //     component: PreviewReleaseNotesComponent
    // },
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