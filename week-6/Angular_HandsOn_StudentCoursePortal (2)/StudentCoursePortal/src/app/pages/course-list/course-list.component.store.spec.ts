import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CourseListComponent } from './course-list.component';
import { Course } from '../../models/course.model';

describe('CourseListComponent (NgRx store)', () => {
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
  ];

  const initialState = { course: { courses: mockCourses, loading: false, error: null } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseListComponent);
  });

  it('should render course cards from the initial state', () => {
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-course-card');
    expect(cards.length).toBe(1);
  });

  it('should show the loading indicator when loading is true', () => {
    store.setState({ course: { courses: [], loading: true, error: null } });
    fixture.detectChanges();
    const loadingText = fixture.nativeElement.textContent;
    expect(loadingText).toContain('Loading courses...');
  });
});
