export const AppRoutes = {
  home: '',
  login: 'login',
  logout: 'logout',
  register: 'register',
  users: 'users',
  dashboard: 'dashboard',
  roles: 'roles',
  gamezone: 'gamezone',
  timeslots: 'timeslots',
  gamezoneProfile: (id: string | number) => `gamezone/${id}`,
};
