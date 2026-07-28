import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  courses$: Observable<Course[]> = this.store.select(selectAllCourses);
  isLoading$: Observable<boolean> = this.store.select(selectCoursesLoading);
  error$: Observable<string | null> = this.store.select(selectCoursesError);

  searchTerm = '';
  selectedCourseId: number | null = null;

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
  }

  // trackBy avoids Angular re-rendering every card on any array change -
  // with trackBy, only cards whose id changed are re-rendered, which
  // matters a lot for large course lists.
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onSearch(): void {
    this.router.navigate(['courses'], { queryParams: { search: this.searchTerm || null } });
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }

  openDetail(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }
}
