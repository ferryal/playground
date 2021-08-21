import * as React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';

interface QuestionProps {
  title?: string;
  image?: string;
}

const Question: React.FC<QuestionProps> = ({ title, image }) => {
  if (!title && !image) {
    throw new Error('title or image should be filled');
  }

  return (
    <Flex direction="column" bg="transparent" py="1" mb="2" w="full">
      {title && (
        <Text as="h4" fontWeight="medium" color="black.400">
          {title}
        </Text>
      )}
      {image && <Image src={image} alt={title} boxSize="100%" objectFit="cover" mt="2" borderRadius="md" />}
    </Flex>
  );
};

export default Question;
