import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
})
export class StudentProfileComponent implements OnInit {
  private enrollmentService = inject(EnrollmentService);
  enrolledCourses: Course[] = [];

  ngOnInit(): void {
    this.enrollmentService.getEnrolledCourses().subscribe((courses) => (this.enrolledCourses = courses));
  }
}
