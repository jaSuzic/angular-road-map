export interface NavItem {
    title: string;
    path: string;
    icon: string;
    description?: string;
}

export const NAV_ITEMS: NavItem[] = [
    {
        title: 'Angular State',
        path: '/angular-state',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
        description: 'Explore state management in Angular'
    },
    {
        title: 'Change Detection',
        path: '/change-detection',
        icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
        description: 'Learn about change detection strategies'
    },
    {
        title: 'Dependency Injection',
        path: '/dependency-injection',
        icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
        description: 'Learn about dependency injection in Angular'
    },
    {
        title: 'RxJS',
        path: '/rxjs',
        icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
        description: 'Learn about RxJS in Angular'
    },
    {
        title: 'Modular Architecture',
        path: '/modular-architecture/overview',
        icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
        description: 'Learn about modular architecture in Angular'
    },
    {
        title: 'Separation of Concerns',
        path: '/separation-of-concerns',
        icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
        description: 'Learn about separation of concerns in Angular'
    },
    {
        title: 'Module Federation',
        path: '/module-federation',
        icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
        description: 'Learn about module federation in Angular'
    },
    {
        title: 'API Development',
        path: '/api-development',
        icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
        description: 'Compare REST and GraphQL in Angular'
    },
];
