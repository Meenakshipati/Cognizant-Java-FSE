import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  private enrollmentService = inject(EnrollmentService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log('course changed - previous:', changes['course'].previousValue, 'current:', changes['course'].currentValue);
    }
  }

  get cardClasses() {
    // A getter keeps the template free of inline object literals, making
    // it easier to read and unit test the class logic in isolation.
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course.credits >= 4,
      expanded: this.isExpanded,
    };
  }

  get borderStyle() {
    const colors: Record<string, string> = { passed: 'green', failed: 'red', pending: 'grey' };
    return { 'border-left-color': colors[this.course.gradeStatus] };
  }

  get isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  onEnrollClick(): void {
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
    this.enrollRequested.emit(this.course.id);
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }
}
