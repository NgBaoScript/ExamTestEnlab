import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/Question';
import { Observable } from 'rxjs';
import { QuizResult } from '../models/QuizResults';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions`);
  }

  saveResult(result: QuizResult): Observable<QuizResult> {
    return this.http.post<QuizResult>(`${this.apiUrl}/quizResults`, result);
  }
}
