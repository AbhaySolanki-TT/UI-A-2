export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        UPDATE: '',
        GET_BY_ID: (id: string | number) => `/Get/${id}`,
        CHANGE_PASSWORD: '/change-password',
    }
};