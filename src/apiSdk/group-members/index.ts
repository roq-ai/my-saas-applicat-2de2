import axios from 'axios';
import queryString from 'query-string';
import { GroupMemberInterface, GroupMemberGetQueryInterface } from 'interfaces/group-member';
import { GetQueryInterface } from '../../interfaces';

export const getGroupMembers = async (query?: GroupMemberGetQueryInterface) => {
  const response = await axios.get(`/api/group-members${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGroupMember = async (groupMember: GroupMemberInterface) => {
  const response = await axios.post('/api/group-members', groupMember);
  return response.data;
};

export const updateGroupMemberById = async (id: string, groupMember: GroupMemberInterface) => {
  const response = await axios.put(`/api/group-members/${id}`, groupMember);
  return response.data;
};

export const getGroupMemberById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/group-members/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGroupMemberById = async (id: string) => {
  const response = await axios.delete(`/api/group-members/${id}`);
  return response.data;
};
