import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseCardComponent } from './course-card.component';
import { Course } from '../../models/course.model';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the course name from @Input', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    const heading = fixture.debugElement.query(By.css('h3')).nativeElement as HTMLElement;
    expect(heading.textContent).toContain('Data Structures');
  });

  it('should emit enrollRequested with the course id when Enroll is clicked', () => {
    component.course = { ...mockCourse };
    fixture.detectChanges();
    spyOn(component.enrollRequested, 'emit');

    const enrollButton = fixture.debugElement.query(By.css('.actions button')).nativeElement as HTMLButtonElement;
    enrollButton.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should log previous and current values on ngOnChanges', () => {
    spyOn(console, 'log');
    component.course = mockCourse;
    component.ngOnChanges({
      course: {
        previousValue: undefined,
        currentValue: mockCourse,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(console.log).toHaveBeenCalled();
  });

  it('should toggle expanded details when Show Details is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    expect(component.isExpanded).toBeFalse();

    const detailsButton = fixture.debugElement.query(By.css('.secondary')).nativeElement as HTMLButtonElement;
    detailsButton.click();

    expect(component.isExpanded).toBeTrue();
  });
});
