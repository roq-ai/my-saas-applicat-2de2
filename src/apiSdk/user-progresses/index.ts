import axios from 'axios';
import queryString from 'query-string';
import { UserProgressInterface, UserProgressGetQueryInterface } from 'interfaces/user-progress';
import { GetQueryInterface } from '../../interfaces';

export const getUserProgresses = async (query?: UserProgressGetQueryInterface) => {
  const response = await axios.get(`/api/user-progresses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUserProgress = async (userProgress: UserProgressInterface) => {
  const response = await axios.post('/api/user-progresses', userProgress);
  return response.data;
};

export const updateUserProgressById = async (id: string, userProgress: UserProgressInterface) => {
  const response = await axios.put(`/api/user-progresses/${id}`, userProgress);
  return response.data;
};

export const getUserProgressById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-progresses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserProgressById = async (id: string) => {
  const response = await axios.delete(`/api/user-progresses/${id}`);
  return response.data;
};
