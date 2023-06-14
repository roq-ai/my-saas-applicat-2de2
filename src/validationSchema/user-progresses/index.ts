import * as yup from 'yup';

export const userProgressValidationSchema = yup.object().shape({
  progress: yup.number().integer().required(),
  flashcard_deck_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
