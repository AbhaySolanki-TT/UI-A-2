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
        Name: 'TimeSlot',
        Icon: 'event',
        Link: '/timeslots'
    },
];