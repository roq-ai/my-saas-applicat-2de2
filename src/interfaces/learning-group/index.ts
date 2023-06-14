import { FlashcardDeckInterface } from 'interfaces/flashcard-deck';
import { GroupMemberInterface } from 'interfaces/group-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface LearningGroupInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  flashcard_deck?: FlashcardDeckInterface[];
  group_member?: GroupMemberInterface[];
  user?: UserInterface;
  _count?: {
    flashcard_deck?: number;
    group_member?: number;
  };
}

export interface LearningGroupGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  user_id?: string;
}
