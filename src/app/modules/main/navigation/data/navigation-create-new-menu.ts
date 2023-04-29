export const navigationNewMenu = [
    {
        icon: 'linear_scale',
        name: 'Release',
        description: 'Create a new Release & start tracking.',
        route: ['../', 'main', 'releases', 'create']
    },
    {
        icon: 'leak_add',
        name: 'Domains',
        description: 'Add new Domain and its details to link with release.',
        route: ['../', 'main', 'domains', 'create']
    },
    {
        icon: 'pages',
        name: 'Project',
        description: 'Kick off new Project with quick and easy tracking.',
        route: ['../', 'main', 'projects', 'create']
    },
    {
        icon: 'streetview',
        name: 'Client',
        description: 'Add new client and start off new project.',
        route: ['../', 'main', 'clients', 'create']
    },
    {
        icon: 'account_circle',
        name: 'Member',
        description: 'Create a new Member and be a part of project.',
        route: ['../', 'main', 'admin', 'members', 'create']
    },
    {
        icon: 'assignment',
        name: 'Phase Requirements',
        description: 'Create a new Phase requirements.',
        route: ['../', 'main', 'clients', 'createRequirement']
    }
];