import * as React from 'react';
import { useField } from 'formik';
import { Alert, AlertIcon, Flex, Text } from '@chakra-ui/react';
import { Answer, AnswerStatus } from '../../components/Answer';
import { OptionAnswer } from '../../interfaces/question';

interface AnswerListProps {
  name: string;
  optionAnswers: OptionAnswer[];
  status?: AnswerStatus;
  disabled?: boolean;
}

const AnswerList: React.FC<AnswerListProps> = ({ name, optionAnswers, status, ...rest }) => {
  const [field, meta, helpers] = useField(name);
  const [checkedItems, setCheckedItems] = React.useState<Map<string, boolean>>(new Map());
  // Do force update component, because checked will not auto reload with changes
  const [, forceRender] = React.useState({});

  function handleChecked(checked: boolean, key: string) {
    if (checked) {
      setCheckedItems(checkedItems.set(key, checked));
    } else {
      checkedItems.delete(key);
    }
    const arrayItems = Array.from(checkedItems.keys());
    helpers.setValue([...arrayItems]);
    forceRender({});
  }

  React.useEffect(() => {
    /**
     * Cleared checked items when status changed to be empty.
     * It's indicate that we already cleared from outside
     * */
    if (!status) {
      checkedItems.clear();
    }
  }, [status]);

  return (
    <Flex py="1" direction="column" justify="center" align="flex-start" gridGap="2">
      <Text as="span" fontSize="xs" textTransform="uppercase" color="black.200">
        Select one or more
      </Text>
      {optionAnswers &&
        optionAnswers.map(option => (
          <Answer
            {...option}
            {...rest}
            {...field}
            key={option.id}
            status={status}
            checked={checkedItems.get(option.id)}
            onChecked={checked => handleChecked(checked, option.id)}
          />
        ))}
      {meta.error && meta.touched && (
        <Alert status="error" mt="2" borderRadius="md" color="grey.100">
          <AlertIcon />
          {meta.error}
        </Alert>
      )}
    </Flex>
  );
};

export default AnswerList;
