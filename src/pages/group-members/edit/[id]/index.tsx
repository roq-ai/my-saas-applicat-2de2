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
import { getGroupMemberById, updateGroupMemberById } from 'apiSdk/group-members';
import { Error } from 'components/error';
import { groupMemberValidationSchema } from 'validationSchema/group-members';
import { GroupMemberInterface } from 'interfaces/group-member';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { LearningGroupInterface } from 'interfaces/learning-group';
import { getUsers } from 'apiSdk/users';
import { getLearningGroups } from 'apiSdk/learning-groups';

function GroupMemberEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<GroupMemberInterface>(
    () => (id ? `/group-members/${id}` : null),
    () => getGroupMemberById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GroupMemberInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGroupMemberById(id, values);
      mutate(updated);
      resetForm();
      router.push('/group-members');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GroupMemberInterface>({
    initialValues: data,
    validationSchema: groupMemberValidationSchema,
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
            Edit Group Member
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'group_member',
  operation: AccessOperationEnum.UPDATE,
})(GroupMemberEditPage);
