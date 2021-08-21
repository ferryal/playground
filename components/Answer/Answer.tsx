import * as React from 'react';
import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { OptionAnswer } from '../../interfaces/question';

export type AnswerStatus = 'correct' | 'incorrect';

interface AnswerProps extends OptionAnswer {
  checked?: boolean;
  disabled?: boolean;
  status?: AnswerStatus;
  onChecked?: (checked: boolean) => void;
}

const Answer: React.FC<AnswerProps> = ({ id, title, checked = false, disabled = false, status, onChecked }) => {
  function handleSelected(check: boolean) {
    if (onChecked && !disabled) {
      onChecked(check);
    }
  }

  const colorVariants: Record<AnswerStatus, string> = {
    correct: 'green.300',
    incorrect: 'red.300',
  };
  const colorSchemas: Record<AnswerStatus, string> = {
    correct: 'green',
    incorrect: 'red',
  };
  const isStatusValid = status && checked;
  const color = isStatusValid ? colorVariants[status] : 'black.400';
  const borderColor = isStatusValid ? colorVariants[status] : 'black.50';
  const colorScheme = isStatusValid ? colorSchemas[status] : 'blue';

  return (
    <Flex
      w="full"
      p="4"
      justify="space-between"
      align="center"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      borderRadius="md"
      borderWidth="thin"
      color={color}
      borderColor={borderColor}
      bgColor={checked ? 'gray.100' : 'white'}
    >
      <Text as="p" w="95%" lineHeight="tight" color="black.400" onClick={() => handleSelected(!checked)}>
        {title}
      </Text>
      <Checkbox
        w="5%"
        value={id}
        isChecked={checked}
        onChange={e => {
          handleSelected(Boolean(e.target.checked));
        }}
        colorScheme={colorScheme}
        disabled={disabled}
      />
    </Flex>
  );
};

export default Answer;
