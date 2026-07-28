import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CanComponentDeactivate } from '../../../../guards/unsaved-changes.guard';

// Custom synchronous validator: rejects course codes starting with 'XX'.
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = (control.value ?? '').toString();
  return value.startsWith('XX') ? { noCourseCode: true } : null;
}

// Custom async validator: simulates a server-side "email already taken" check.
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const value = (control.value ?? '').toString();
      resolve(value.includes('test@') ? { emailTaken: true } : null);
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
})
export class ReactiveEnrollmentFormComponent implements OnInit, CanComponentDeactivate {
  private fb = inject(FormBuilder);

  enrollForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: this.fb.control('', [Validators.required, Validators.email], [simulateEmailCheck]),
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  get additionalCourses(): FormArray {
    // A typed getter is safer than casting `enrollForm.get('additionalCourses')`
    // inline in the template on every access, and centralises the cast in one place.
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.enrollForm.value);
    console.log(this.enrollForm.getRawValue());
    // enrollForm.value excludes disabled controls; getRawValue() includes
    // every control regardless of its disabled state.
    if (this.enrollForm.valid) {
      this.submitted = true;
    }
  }

  hasUnsavedChanges(): boolean {
    return !this.submitted && this.enrollForm?.dirty;
  }
}
