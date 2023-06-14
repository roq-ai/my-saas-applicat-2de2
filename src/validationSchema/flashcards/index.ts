import * as yup from 'yup';

export const flashcardValidationSchema = yup.object().shape({
  question: yup.string().required(),
  answer: yup.string().required(),
  flashcard_deck_id: yup.string().nullable().required(),
});
