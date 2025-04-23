export interface User {
    id: number;
    fullName: string;
    dateOfBirth: string;
    email: string;
    password?: string;
    createdAt: string;
  }
  
  export interface CreateUserDto {
    fullName: string;
    dateOfBirth: string;
    email: string;
    password: string;
  }
  
  export interface UpdateUserDto {
    fullName?: string;
    dateOfBirth?: string;
    email?: string;
    password?: string;
  }
