import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ModalService } from 'src/app/services/helper/modal.service';
import { Subscription } from 'rxjs';
import { PROJECT_PHASE } from 'src/app/_helpers/convention/phase';

@Component({
  selector: 'app-project-modules',
  templateUrl: './project-modules.component.html',
  styleUrls: ['./project-modules.component.scss'],
})
export class ProjectModulesComponent implements OnInit, OnDestroy {
  projectId: string;
  loading: boolean = true;
  projectData: any = null;
  modules: any[] = [];
  subscription: Subscription;

  // Selected module for Quiz modal
  selectedModule: any = null;
  selectedAttemptIndex: number = 0;
  selectedAttempt: any = null;

  MODAL_QUIZ = 'quiz-answers-modal';
  PROJECT_PHASE = PROJECT_PHASE;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.id;
    if (this.projectId) {
      this.loadData();
    }
  }

  loadData(): void {
    this.loading = true;
    this.subscription = this.projectService.getProjectLearningModules(this.projectId).subscribe(
      (response) => {
        this.projectData = response.project;
        this.modules = response.modules || [];
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching project learning modules:', error);
        this.loading = false;
      }
    );
  }

  getPhaseName(phase: string): string {
    return phase === PROJECT_PHASE.STEPS.CODE
      ? PROJECT_PHASE.STEPS.VALUE
      : PROJECT_PHASE.PECA.VALUE;
  }

  openQuizModal(mod: any): void {
    this.selectedModule = mod;
    if (mod.attempts && mod.attempts.length > 0) {
      this.selectedAttemptIndex = mod.attempts.length - 1;
      this.selectedAttempt = mod.attempts[this.selectedAttemptIndex];
    } else {
      this.selectedAttemptIndex = 0;
      this.selectedAttempt = null;
    }
    this.modalService.open(this.MODAL_QUIZ);
  }

  selectAttempt(index: number): void {
    this.selectedAttemptIndex = index;
    if (this.selectedModule && this.selectedModule.attempts) {
      this.selectedAttempt = this.selectedModule.attempts[index];
    }
  }

  getCoordinatorOption(quizId: string): string {
    if (!this.selectedAttempt || !this.selectedAttempt.answers) return null;
    const ans = this.selectedAttempt.answers.find((a: any) => a.quizId === quizId);
    return ans ? ans.option : null;
  }

  isAnswerCorrect(quiz: any): boolean {
    const coordOption = this.getCoordinatorOption(quiz.id);
    return coordOption === quiz.correctOption;
  }

  goBack(): void {
    this.router.navigate(['/pages/projects']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
