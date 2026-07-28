import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Web Development', code: 'CS102', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch courses from the API', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should surface a friendly error message when the request fails', () => {
    service.getCourses().subscribe({
      next: () => fail('expected an error'),
      error: (err) => expect(err.message).toContain('Failed to load courses'),
    });

    // retry(2) means the request is retried twice before the error propagates,
    // so three requests total need to be flushed with an error response.
    for (let i = 0; i < 3; i++) {
      const req = httpMock.expectOne('http://localhost:3000/courses');
      req.flush('server error', { status: 500, statusText: 'Server Error' });
    }
  });
});
