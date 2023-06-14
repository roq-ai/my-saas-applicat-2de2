import axios from 'axios';
import queryString from 'query-string';
import { DataSourceInterface, DataSourceGetQueryInterface } from 'interfaces/data-source';
import { GetQueryInterface } from '../../interfaces';

export const getDataSources = async (query?: DataSourceGetQueryInterface) => {
  const response = await axios.get(`/api/data-sources${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDataSource = async (dataSource: DataSourceInterface) => {
  const response = await axios.post('/api/data-sources', dataSource);
  return response.data;
};

export const updateDataSourceById = async (id: string, dataSource: DataSourceInterface) => {
  const response = await axios.put(`/api/data-sources/${id}`, dataSource);
  return response.data;
};

export const getDataSourceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/data-sources/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDataSourceById = async (id: string) => {
  const response = await axios.delete(`/api/data-sources/${id}`);
  return response.data;
};
