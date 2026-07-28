import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesAvailable = 0;

  private courseService = inject(CourseService);

  ngOnInit(): void {
    console.log('HomeComponent initialised - courses loaded');
    this.courseService.getCourses().subscribe({
      next: (courses) => (this.coursesAvailable = courses.length),
      error: () => (this.coursesAvailable = 0),
    });
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  // [property] is a one-way binding: data flows from the component to the
  // DOM only (e.g. [disabled]="!isPortalActive"). [(ngModel)] is two-way:
  // it both sets the DOM element's value from the component AND listens
  // for DOM changes to update the component property, keeping both in sync.
}
