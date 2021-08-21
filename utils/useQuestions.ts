import * as React from 'react';
import dataQuestions from '../data/questions.json';
import { Question } from '../interfaces/question';

export const useQuestions = () => {
  /**
   * Because this just using data json, so keep it as simple with react state
   * As personally. I'd prefered to used swr to handle api request
   */
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [defaultId, setDefaultId] = React.useState<string>('');
  const [beforeId, setBeforeId] = React.useState<string>('');
  const [nextId, setNextId] = React.useState<string>('');
  const [isLast, setIsLast] = React.useState<boolean>(false);

  function checkCorrectAnswer(id: string, answers: string[]): boolean {
    if (!questions) return false;
    const findQuestions = questions.find(q => q.id === id);
    const filterWrongAnswers = findQuestions.wrong_answers.filter(answer => answers.includes(answer));
    const isCorrectAnswer = filterWrongAnswers.length <= 0;
    return isCorrectAnswer;
  }

  function getQuestion(id: string) {
    const data = dataQuestions.data;
    const ids = data.map(d => d.id);
    const findIndex = ids.findIndex(i => i === id);
    const targetBeforeId = ids[findIndex - 1];
    const targetNextId = ids[findIndex + 1];

    if (findIndex >= 0 && findIndex <= ids.length - 1 && beforeId !== targetBeforeId) {
      setBeforeId(targetBeforeId);
    }
    if (findIndex >= 0 && findIndex < ids.length - 1 && nextId !== targetNextId) {
      setNextId(targetNextId);
    }
    if (findIndex >= 0 && findIndex < ids.length - 1 && isLast) {
      setIsLast(false);
    }
    if (findIndex >= 0 && findIndex === ids.length - 1 && !isLast) {
      setIsLast(true);
    }

    return data.find(q => q.id === id);
  }

  React.useEffect(() => {
    if (!questions || questions !== dataQuestions.data) {
      setQuestions(dataQuestions.data);
      setDefaultId(dataQuestions.data[0].id);
    }
  }, []);

  return { questions, defaultId, beforeId, nextId, isLast, checkCorrectAnswer, getQuestion };
};
