export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage',
        menus: [
            {
                name: 'menu.admin.crud',link:'/system/user-manage',
               
            },
            { name: 'menu.admin.manage-doctor', link: '/system/user-crud' },
            { name: 'menu.admin.manage-docInfo', link: '/system/user-crud-doc' },
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