import { FlashcardDeckInterface } from 'interfaces/flashcard-deck';
import { GetQueryInterface } from 'interfaces';

export interface FlashcardInterface {
  id?: string;
  question: string;
  answer: string;
  flashcard_deck_id: string;
  created_at?: any;
  updated_at?: any;

  flashcard_deck?: FlashcardDeckInterface;
  _count?: {};
}

export interface FlashcardGetQueryInterface extends GetQueryInterface {
  id?: string;
  question?: string;
  answer?: string;
  flashcard_deck_id?: string;
}
