import axios from 'axios';
import { CreateUserDto, UpdateUserDto, User } from '../types';

const API_URL = 'http://localhost:3001';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const fetchUser = async (id: number): Promise<User> => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

export const createUser = async (user: CreateUserDto): Promise<User> => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const updateUser = async (id: number, user: UpdateUserDto): Promise<User> => {
  const response = await axios.patch(`${API_URL}/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/users/${id}`);
};