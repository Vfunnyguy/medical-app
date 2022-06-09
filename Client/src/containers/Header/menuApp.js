export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage',
        menus: [
            {
                name: 'menu.admin.crud',link:'/system/user-manage',
               
            },
            { name: 'menu.admin.manage-doctor', link: '/system/user-doctor' },
            { name: 'menu.admin.manage-user', link: '/system/user-admin' },
        ]
    },
    {
        name:'menu.admin.spectality',
        link:'/system/spectality-manage',
        
    },
    {
        name:'menu.admin.manage-clinic',
        link:'/system/clinic-manage',
    }
];