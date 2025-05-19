import { Component } from '@angular/core';
import { QuizResult } from '../../models/QuizResults';
import { Question } from '../../models/Question';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  result: QuizResult | null = history.state.result;
  questions: Question[] = history.state.questions || [];

  constructor(private router: Router) { }

  formatTime(seconds: number | undefined): string {
    if (!seconds) return '0s';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
  }

  exit() {
    this.router.navigate(['/']);
  }

}
