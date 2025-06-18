export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: 'auth/login',
        REGISTER: 'auth/register',
        UPDATE: 'auth/',
        CHANGE_PASSWORD: 'auth/change-password',
    },
    USER: {
        GETALL: 'admin/users/GetAll',
        USERCOUNT: 'admin/users/usercount',
        GET_BY_ID: (id: string | number) => `admin/users/Get/${id}`,

        UPDATE: 'admin/users/Update',
        CREATE: 'admin/users/Create',
        DELETE: (id: string | number) => `admin/users/Delete/${id}`,
    },
    ROLE: {
        GETALL: 'Role/GetAll',
        USERCOUNT: 'Role/usercount',
        GET_BY_ID: (id: string | number) => `Role/Get/${id}`,

        CREATE: 'Role/Create',
        UPDATE: 'Role/Update',
        DELETE: (id: string | number) => `Role/Delete/${id}`,
    },
    TIMESLOT: {
        GET_ALL: 'TimeSlot/getAll',
        GET_AVAILABLE: 'TimeSlot/getAvailable',

        CREATE: 'TimeSlot/register',
        STATS: 'TimeSlot/booking-stats',

        UPDATE_BY_ID: (id: string | number) => `TimeSlot/update/${id}`,
        DELETE: (id: string | number) => `TimeSlot/delete/${id}`,
    },

    GAMEZONE: {
        GET_ALL: 'GameZone/GetAll',
        GET_BY_ID: (id: string | number) => `GameZone/Get/${id}`,
        CREATE: 'GameZone',
        UPDATE_BY_ID: (id: string | number) => `GameZone/${id}`,
        DELETE: (id: string | number) => `GameZone/${id}`,
        COUNT: 'GameZone/gamezonecount',
    }

};