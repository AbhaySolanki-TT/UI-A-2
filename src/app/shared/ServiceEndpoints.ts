export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: 'auth/login',
        REGISTER: 'auth/register',
        UPDATE: 'auth/',
        CHANGE_PASSWORD: 'auth/change-password',
    },
    USER: {
        GETALL: 'admin/users/GetAll',
        GET_BY_ID: (id: string | number) => `auth/Get/${id}`,

    }
};