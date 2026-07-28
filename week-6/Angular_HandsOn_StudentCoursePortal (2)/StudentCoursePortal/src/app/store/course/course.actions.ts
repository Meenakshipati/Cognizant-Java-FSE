import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

// The '[Course]' prefix groups these actions in the Redux DevTools timeline
// so you can filter the action log to only course-related activity.
export const loadCourses = createAction('[Course] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);

export const addCourse = createAction('[Course] Add Course', props<{ course: Course }>());
