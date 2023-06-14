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
import { createFlashcardDeck } from 'apiSdk/flashcard-decks';
import { Error } from 'components/error';
import { flashcardDeckValidationSchema } from 'validationSchema/flashcard-decks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { LearningGroupInterface } from 'interfaces/learning-group';
import { getUsers } from 'apiSdk/users';
import { getLearningGroups } from 'apiSdk/learning-groups';
import { FlashcardDeckInterface } from 'interfaces/flashcard-deck';

function FlashcardDeckCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FlashcardDeckInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFlashcardDeck(values);
      resetForm();
      router.push('/flashcard-decks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FlashcardDeckInterface>({
    initialValues: {
      title: '',
      description: '',
      content_creator_id: (router.query.content_creator_id as string) ?? null,
      learning_group_id: (router.query.learning_group_id as string) ?? null,
    },
    validationSchema: flashcardDeckValidationSchema,
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
            Create Flashcard Deck
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
            {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
          </FormControl>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'content_creator_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<LearningGroupInterface>
            formik={formik}
            name={'learning_group_id'}
            label={'Select Learning Group'}
            placeholder={'Select Learning Group'}
            fetcher={getLearningGroups}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
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
  entity: 'flashcard_deck',
  operation: AccessOperationEnum.CREATE,
})(FlashcardDeckCreatePage);
