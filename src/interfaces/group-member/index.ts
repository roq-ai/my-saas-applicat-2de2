import { UserInterface } from 'interfaces/user';
import { LearningGroupInterface } from 'interfaces/learning-group';
import { GetQueryInterface } from 'interfaces';

export interface GroupMemberInterface {
  id?: string;
  user_id: string;
  learning_group_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  learning_group?: LearningGroupInterface;
  _count?: {};
}

export interface GroupMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  learning_group_id?: string;
}
