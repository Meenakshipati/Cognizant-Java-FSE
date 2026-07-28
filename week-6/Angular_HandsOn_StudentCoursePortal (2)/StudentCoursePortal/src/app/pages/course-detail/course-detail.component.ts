import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  course: Course | null = null;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe({
      next: (course) => (this.course = course),
      error: () => (this.errorMessage = 'Course not found.'),
    });
  }
}
