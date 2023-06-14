import { FlashcardInterface } from 'interfaces/flashcard';
import { UserProgressInterface } from 'interfaces/user-progress';
import { UserInterface } from 'interfaces/user';
import { LearningGroupInterface } from 'interfaces/learning-group';
import { GetQueryInterface } from 'interfaces';

export interface FlashcardDeckInterface {
  id?: string;
  title: string;
  description?: string;
  content_creator_id: string;
  learning_group_id: string;
  created_at?: any;
  updated_at?: any;
  flashcard?: FlashcardInterface[];
  user_progress?: UserProgressInterface[];
  user?: UserInterface;
  learning_group?: LearningGroupInterface;
  _count?: {
    flashcard?: number;
    user_progress?: number;
  };
}

export interface FlashcardDeckGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  content_creator_id?: string;
  learning_group_id?: string;
}
