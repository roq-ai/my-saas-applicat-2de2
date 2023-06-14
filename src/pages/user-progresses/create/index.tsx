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
import { createUserProgress } from 'apiSdk/user-progresses';
import { Error } from 'components/error';
import { userProgressValidationSchema } from 'validationSchema/user-progresses';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { FlashcardDeckInterface } from 'interfaces/flashcard-deck';
import { UserInterface } from 'interfaces/user';
import { getFlashcardDecks } from 'apiSdk/flashcard-decks';
import { getUsers } from 'apiSdk/users';
import { UserProgressInterface } from 'interfaces/user-progress';

function UserProgressCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: UserProgressInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createUserProgress(values);
      resetForm();
      router.push('/user-progresses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<UserProgressInterface>({
    initialValues: {
      progress: 0,
      flashcard_deck_id: (router.query.flashcard_deck_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: userProgressValidationSchema,
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
            Create User Progress
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="progress" mb="4" isInvalid={!!formik.errors?.progress}>
            <FormLabel>Progress</FormLabel>
            <NumberInput
              name="progress"
              value={formik.values?.progress}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('progress', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.progress && <FormErrorMessage>{formik.errors?.progress}</FormErrorMessage>}
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
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
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
  entity: 'user_progress',
  operation: AccessOperationEnum.CREATE,
})(UserProgressCreatePage);
