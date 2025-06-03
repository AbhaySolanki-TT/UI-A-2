export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  mobileNo: string;
  roleId?: number;
}
