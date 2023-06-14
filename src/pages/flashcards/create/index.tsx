import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createFlashcard } from 'apiSdk/flashcards';
import { Error } from 'components/error';
import { flashcardValidationSchema } from 'validationSchema/flashcards';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { FlashcardDeckInterface } from 'interfaces/flashcard-deck';
import { getFlashcardDecks } from 'apiSdk/flashcard-decks';
import { FlashcardInterface } from 'interfaces/flashcard';

function FlashcardCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FlashcardInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFlashcard(values);
      resetForm();
      router.push('/flashcards');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FlashcardInterface>({
    initialValues: {
      question: '',
      answer: '',
      flashcard_deck_id: (router.query.flashcard_deck_id as string) ?? null,
    },
    validationSchema: flashcardValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Flashcard
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="question" mb="4" isInvalid={!!formik.errors?.question}>
            <FormLabel>Question</FormLabel>
            <Input type="text" name="question" value={formik.values?.question} onChange={formik.handleChange} />
            {formik.errors.question && <FormErrorMessage>{formik.errors?.question}</FormErrorMessage>}
          </FormControl>
          <FormControl id="answer" mb="4" isInvalid={!!formik.errors?.answer}>
            <FormLabel>Answer</FormLabel>
            <Input type="text" name="answer" value={formik.values?.answer} onChange={formik.handleChange} />
            {formik.errors.answer && <FormErrorMessage>{formik.errors?.answer}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<FlashcardDeckInterface>
            formik={formik}
            name={'flashcard_deck_id'}
            label={'Select Flashcard Deck'}
            placeholder={'Select Flashcard Deck'}
            fetcher={getFlashcardDecks}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'flashcard',
  operation: AccessOperationEnum.CREATE,
})(FlashcardCreatePage);
