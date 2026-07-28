import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseService } from './course.service';

interface Student {
  id: number;
  name: string;
  email: string;
  gpa: number;
}

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  // Service-to-service injection: EnrollmentService depends on CourseService
  // to resolve enrolled course IDs into full Course objects.
  private courseService = inject(CourseService);
  private http = inject(HttpClient);

  private enrolledCourseIds: number[] = [];

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.courseService
      .getCourses()
      .pipe(map((courses) => courses.filter((c) => this.enrolledCourseIds.includes(c.id))));
  }

  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`http://localhost:3000/enrollments?courseId=${courseId}`).pipe(
      switchMap(() => this.http.get<Student[]>('http://localhost:3000/students'))
    );
  }

  // switchMap cancels the previous inner Observable whenever a new courseId
  // arrives, so if a user selects course A then quickly selects course B,
  // the (now-stale) in-flight request for course A's students is discarded
  // and only course B's response reaches the subscriber - preventing
  // out-of-order/stale responses from overwriting newer ones.
}
