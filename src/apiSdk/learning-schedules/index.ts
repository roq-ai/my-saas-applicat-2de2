import axios from 'axios';
import queryString from 'query-string';
import { LearningScheduleInterface, LearningScheduleGetQueryInterface } from 'interfaces/learning-schedule';
import { GetQueryInterface } from '../../interfaces';

export const getLearningSchedules = async (query?: LearningScheduleGetQueryInterface) => {
  const response = await axios.get(`/api/learning-schedules${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLearningSchedule = async (learningSchedule: LearningScheduleInterface) => {
  const response = await axios.post('/api/learning-schedules', learningSchedule);
  return response.data;
};

export const updateLearningScheduleById = async (id: string, learningSchedule: LearningScheduleInterface) => {
  const response = await axios.put(`/api/learning-schedules/${id}`, learningSchedule);
  return response.data;
};

export const getLearningScheduleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/learning-schedules/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLearningScheduleById = async (id: string) => {
  const response = await axios.delete(`/api/learning-schedules/${id}`);
  return response.data;
};
