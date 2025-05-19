import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Question } from '../../models/Question';
import { QuestionsService } from '../../services/questions.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-question',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  currentQuestion: Question | null = null;
  selectedAnswer: number | null = null;
  feedback: string | null = null;
  answers: { questionId: number; selectedAnswer: number }[] = [];
  startTime: number = Date.now();

  constructor(private quizService: QuestionsService, private routes: Router) { }

  ngOnInit() {
    this.quizService.getQuestions().subscribe((questions) => {
      this.questions = questions;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    });
  }

  selectAnswer(index: number) {
    if (this.feedback) return;
    this.selectedAnswer = index;
    const isCorrect = index === this.currentQuestion?.correctAnswer;
    this.feedback = isCorrect ? 'Correct!' : `Incorrect. ${this.currentQuestion?.explanation}`;
    this.answers.push({ questionId: this.currentQuestion!.id, selectedAnswer: index });
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.selectedAnswer = null;
      this.feedback = null;
    } else {
      const totalTime = Math.floor((Date.now() - this.startTime) / 1000);
      const correctAnswers = this.answers.filter(
        (ans, i) => ans.selectedAnswer === this.questions[i].correctAnswer
      ).length;
      const passStatus = correctAnswers / this.questions.length >= 0.7; // 70% pass criteria
      const result = { id: Date.now(), totalTime, correctAnswers, passStatus, answers: this.answers };
      this.quizService.saveResult(result).subscribe(() => {
        this.routes.navigate(['/results'], { state: { result, questions: this.questions } });
      });
    }
  }

}
