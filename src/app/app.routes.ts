import { Routes } from '@angular/router';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { QuestionComponent } from './components/question/question.component';
import { ResultsComponent } from './components/results/results.component';

export const routes: Routes = [
    { path: '', component: StartScreenComponent },
    { path: 'question', component: QuestionComponent },
    { path: 'results', component: ResultsComponent }
];
