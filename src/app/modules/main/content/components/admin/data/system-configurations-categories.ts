import { ReleaseConfigBasicCategoryComponent } from "../child-components/system-configurations/releases-configuration/categories/basic/basic.component";

export const systemConfigurationsCategories = {
    releases: {
        categories: [
            {
                title: 'Types, Targets, Status, Priority',
                type: 'BASIC',
                
            },
            {
                title: 'Compatibility, Usablility, Localization',
                type: 'BASIC'
            },
            {
                title: 'Objectives, Enhancements, Defects',
                type: 'CORE'
            },
            {
                title: 'Performance, Deployment',
                type: 'STRATEGY'
            },
            {
                title: 'Version Control, Compilance, Security',
                type: 'CORE'
            },
            {
                title: 'Rollback Plan, User Support',
                type: 'STRATEGY'
            },
            {
                title: 'Release Sign-off',
                type: 'CORE'
            }
        ],
        component: ReleaseConfigBasicCategoryComponent
    },
    projects: [],
    domains: [],
    clients: [],
    members: []
}