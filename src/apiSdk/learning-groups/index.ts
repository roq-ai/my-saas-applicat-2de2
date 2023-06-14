import axios from 'axios';
import queryString from 'query-string';
import { LearningGroupInterface, LearningGroupGetQueryInterface } from 'interfaces/learning-group';
import { GetQueryInterface } from '../../interfaces';

export const getLearningGroups = async (query?: LearningGroupGetQueryInterface) => {
  const response = await axios.get(`/api/learning-groups${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLearningGroup = async (learningGroup: LearningGroupInterface) => {
  const response = await axios.post('/api/learning-groups', learningGroup);
  return response.data;
};

export const updateLearningGroupById = async (id: string, learningGroup: LearningGroupInterface) => {
  const response = await axios.put(`/api/learning-groups/${id}`, learningGroup);
  return response.data;
};

export const getLearningGroupById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/learning-groups/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLearningGroupById = async (id: string) => {
  const response = await axios.delete(`/api/learning-groups/${id}`);
  return response.data;
};
