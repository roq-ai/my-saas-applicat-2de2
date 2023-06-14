import axios from 'axios';
import queryString from 'query-string';
import { FlashcardDeckInterface, FlashcardDeckGetQueryInterface } from 'interfaces/flashcard-deck';
import { GetQueryInterface } from '../../interfaces';

export const getFlashcardDecks = async (query?: FlashcardDeckGetQueryInterface) => {
  const response = await axios.get(`/api/flashcard-decks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFlashcardDeck = async (flashcardDeck: FlashcardDeckInterface) => {
  const response = await axios.post('/api/flashcard-decks', flashcardDeck);
  return response.data;
};

export const updateFlashcardDeckById = async (id: string, flashcardDeck: FlashcardDeckInterface) => {
  const response = await axios.put(`/api/flashcard-decks/${id}`, flashcardDeck);
  return response.data;
};

export const getFlashcardDeckById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/flashcard-decks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFlashcardDeckById = async (id: string) => {
  const response = await axios.delete(`/api/flashcard-decks/${id}`);
  return response.data;
};
