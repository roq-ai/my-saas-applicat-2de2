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
import { createGroupMember } from 'apiSdk/group-members';
import { Error } from 'components/error';
import { groupMemberValidationSchema } from 'validationSchema/group-members';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { LearningGroupInterface } from 'interfaces/learning-group';
import { getUsers } from 'apiSdk/users';
import { getLearningGroups } from 'apiSdk/learning-groups';
import { GroupMemberInterface } from 'interfaces/group-member';

function GroupMemberCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GroupMemberInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGroupMember(values);
      resetForm();
      router.push('/group-members');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GroupMemberInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      learning_group_id: (router.query.learning_group_id as string) ?? null,
    },
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
            Create Group Member
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'group_member',
  operation: AccessOperationEnum.CREATE,
})(GroupMemberCreatePage);
