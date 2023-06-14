import { FlashcardDeckInterface } from 'interfaces/flashcard-deck';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface UserProgressInterface {
  id?: string;
  flashcard_deck_id: string;
  user_id: string;
  progress: number;
  created_at?: any;
  updated_at?: any;

  flashcard_deck?: FlashcardDeckInterface;
  user?: UserInterface;
  _count?: {};
}

export interface UserProgressGetQueryInterface extends GetQueryInterface {
  id?: string;
  flashcard_deck_id?: string;
  user_id?: string;
}
