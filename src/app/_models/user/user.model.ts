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

export interface Address extends Coordinate {
  addressState: string;
  addressMunicipality: string;
  addressCity?: string;
  address: string;
}

export interface Coordinate {
  latitude?: number;
  longitude?: number;
}
