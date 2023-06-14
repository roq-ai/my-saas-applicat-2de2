import * as yup from 'yup';
import { flashcardValidationSchema } from 'validationSchema/flashcards';
import { userProgressValidationSchema } from 'validationSchema/user-progresses';

export const flashcardDeckValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  content_creator_id: yup.string().nullable().required(),
  learning_group_id: yup.string().nullable().required(),
  flashcard: yup.array().of(flashcardValidationSchema),
  user_progress: yup.array().of(userProgressValidationSchema),
});
