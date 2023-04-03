export const navigationNewMenu = [
    {
        icon: 'linear_scale',
        name: 'Release',
        description: 'Create a new Release & start tracking.',
        route: ['releases', 'create']
    },
    {
        icon: 'leak_add',
        name: 'Instance',
        description: 'Add new Instance and its details to link with release.',
        route: ['instances', 'create']
    },
    {
        icon: 'pages',
        name: 'Project',
        description: 'Kick off new Project with quick and easy tracking.',
        route: ['projects', 'create']
    },
    {
        icon: 'streetview',
        name: 'Client',
        description: 'Add new client and start off new project.',
        route: ['clients', 'create']
    },
    {
        icon: 'account_circle',
        name: 'Member',
        description: 'Create a new Member and be a part of project.',
        route: ['members', 'create']
    }
];