import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Alert, AlertIcon, Box, Button, Center, Flex, Text, VStack } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import { Question } from '../../components/Question';
import { AnswerList } from '../../components/AnswerList';

import styles from '../../styles/Home.module.css';
import { AnswerStatus } from '../../components/Answer';
import { useQuestions } from '../../utils';

interface FormValues {
  optionAnswers: [];
}

const validationSchema = yup.object().shape({
  optionAnswers: yup
    .array()
    .of(yup.string().required('Answer is required'))
    .min(1, 'Please choose single or multiple answer'),
});

const QuestionsPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { id = '' },
  } = router;
  const [status, setStatus] = React.useState<AnswerStatus>();
  const [isDisabled, setIsDisabled] = React.useState<boolean>();
  const [currentOptions, setCurrentOptions] = React.useState<string[]>([]);
  const { getQuestion, checkCorrectAnswer, beforeId, nextId, isLast } = useQuestions();
  const question = getQuestion(String(id));

  const handleSubmitForm = async (values: FormValues, { setSubmitting, setFieldValue }: FormikHelpers<FormValues>) => {
    if (isDisabled) {
      setIsDisabled(false);
      setCurrentOptions([]);
      setFieldValue('optionAnswers', []);
      setStatus(undefined);

      if (status === 'correct') {
        if (isLast) {
          router.push(`/questions/finish`);
        } else if (nextId) {
          router.push(`/questions/${nextId}`);
        }
      }
    } else {
      const result = checkCorrectAnswer(String(id), values.optionAnswers);
      setStatus(result ? 'correct' : 'incorrect');
      setCurrentOptions(values.optionAnswers);
      setSubmitting(true);
      setIsDisabled(true);
    }
  };

  if (id === 'finish') {
    return (
      <Flex justify="center" align="center" w="full" h="100vh" bgColor="black.50">
        <VStack m="6">
          <Text as="h1" fontWeight="extrabold" fontSize="xx-large">
            Finished
          </Text>
          <Text as="p" fontSize="large" align="center">
            Yay... great job. <br /> You already answered all question. <br /> Congratulations...
          </Text>
          <Link href="/">
            <Button size="md" type="button" variant="solid" bgColor="yellow.200">
              Back to home page
            </Button>
          </Link>
        </VStack>
      </Flex>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Questions Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Formik initialValues={{ optionAnswers: [] }} onSubmit={handleSubmitForm} validationSchema={validationSchema}>
          {({ values }) => {
            return (
              <Form>
                <Flex direction="column">
                  <Box w="full" bgColor="#fefbf4" p={10}>
                    {question && (
                      <Flex direction="column" key={question.id} maxW="600px">
                        <Flex direction="column" justify="center" align="flex-start">
                          <Question title={question.question} image={question.image} />
                          <AnswerList
                            name="optionAnswers"
                            optionAnswers={question.option_answers}
                            status={status}
                            disabled={isDisabled}
                          />
                        </Flex>
                        {status && status === 'correct' && currentOptions === values.optionAnswers && (
                          <Alert status="success" borderRadius="md" color="grey.100" mt="2">
                            <AlertIcon />
                            {question.success_message}
                          </Alert>
                        )}
                        {status && status === 'incorrect' && currentOptions === values.optionAnswers && (
                          <Alert status="error" borderRadius="md" color="grey.100" mt="2">
                            <AlertIcon />
                            {question.error_message}
                          </Alert>
                        )}
                      </Flex>
                    )}
                  </Box>

                  <Flex w="full" direction="row" align="center" gridColumnGap="4" mt="6">
                    <Button
                      size="md"
                      type="button"
                      variant="solid"
                      bgColor="yellow.200"
                      onClick={() => {
                        if (beforeId) {
                          router.push(`/questions/${beforeId}`);
                        } else {
                          const result = confirm('Are you sure want to leave questions page?');
                          if (result) {
                            router.push('/');
                          }
                        }
                      }}
                    >
                      <ArrowBackIcon aria-hidden="true" aria-label="Back" />
                    </Button>
                    <Button
                      w="full"
                      size="md"
                      type="submit"
                      variant="solid"
                      bgColor="yellow.200"
                      textTransform="uppercase"
                    >
                      {isDisabled ? (status === 'incorrect' ? 'Change answer' : 'Continue') : 'Submit'}
                    </Button>
                  </Flex>
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </main>
    </div>
  );
};

export default QuestionsPage;
