import * as yup from 'yup';
import { flashcardDeckValidationSchema } from 'validationSchema/flashcard-decks';
import { groupMemberValidationSchema } from 'validationSchema/group-members';

export const learningGroupValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  user_id: yup.string().nullable().required(),
  flashcard_deck: yup.array().of(flashcardDeckValidationSchema),
  group_member: yup.array().of(groupMemberValidationSchema),
});
