export interface Question {
  id: string;
  question: string;
  image?: string;
  option_answers: OptionAnswer[];
  correct_answers: string[];
  wrong_answers: string[];
  error_message: string;
  success_message: string;
}

export interface OptionAnswer {
  id: string;
  title: string;
}
