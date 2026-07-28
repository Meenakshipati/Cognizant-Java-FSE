import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { loadCourses, loadCoursesFailure, loadCoursesSuccess } from './course.actions';

// Effects are the only place side effects (HTTP calls, navigation, storage)
// should happen in NgRx - reducers must stay pure functions.
@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => loadCoursesSuccess({ courses })),
          catchError((error) => of(loadCoursesFailure({ error: error.message })))
        )
      )
    )
  );
}
