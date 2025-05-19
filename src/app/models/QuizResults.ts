export interface QuizResult {
  id: number;
  totalTime: number;
  correctAnswers: number;
  passStatus: boolean;
  answers: { questionId: number; selectedAnswer: number }[];
}