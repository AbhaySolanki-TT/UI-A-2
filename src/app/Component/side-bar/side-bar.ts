export interface SideBarMenu {
    Name: string;
    Icon: string;
    Link: string;
}

export const side_bar: SideBarMenu[] = [
    {
        Name: 'Dashboard',
        Icon: 'dashboard',
        Link: '/dashboard'
    },
    {
        Name: 'Users',
        Icon: 'group',
        Link: '/users'
    },
    {
        Name: 'Roles',
        Icon: 'assignment_ind',
        Link: '/roles'
    },
    {
        Name: 'Time Slot',
        Icon: 'event',
        Link: '/timeslots'
    },
    {
        Name: 'Game Zone',
        Icon: 'videogame_asset',
        Link: '/gamezone'
    },
];