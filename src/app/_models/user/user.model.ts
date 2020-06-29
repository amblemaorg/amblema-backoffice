export interface User extends Address {
  id?: string;
  name?: string;
  email: string;
  password: string;
  userType: string;
  phone: string;
  role: string;
  status?: string;
}

export interface Address {
  addressState: string;
  addressMunicipality: string;
  addressCity?: string;
  address: string;
}
