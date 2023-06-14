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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getUserProgressById, updateUserProgressById } from 'apiSdk/user-progresses';
import { Error } from 'components/error';
import { userProgressValidationSchema } from 'validationSchema/user-progresses';
import { UserProgressInterface } from 'interfaces/user-progress';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { FlashcardDeckInterface } from 'interfaces/flashcard-deck';
import { UserInterface } from 'interfaces/user';
import { getFlashcardDecks } from 'apiSdk/flashcard-decks';
import { getUsers } from 'apiSdk/users';

function UserProgressEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<UserProgressInterface>(
    () => (id ? `/user-progresses/${id}` : null),
    () => getUserProgressById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: UserProgressInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateUserProgressById(id, values);
      mutate(updated);
      resetForm();
      router.push('/user-progresses');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<UserProgressInterface>({
    initialValues: data,
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
            Edit User Progress
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'user_progress',
  operation: AccessOperationEnum.UPDATE,
})(UserProgressEditPage);
