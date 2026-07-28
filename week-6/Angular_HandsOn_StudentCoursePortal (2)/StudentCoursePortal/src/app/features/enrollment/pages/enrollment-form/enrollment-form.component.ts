import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CanComponentDeactivate } from '../../../../guards/unsaved-changes.guard';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './enrollment-form.component.html',
})
export class EnrollmentFormComponent implements CanComponentDeactivate {
  submitted = false;

  model = {
    studentName: '',
    studentEmail: '',
    courseId: null as number | null,
    preferredSemester: 'Odd',
    agreeToTerms: false,
  };

  onSubmit(form: NgForm): void {
    console.log(form.value, form.valid);
    if (form.valid) {
      this.submitted = true;
    }
  }

  reset(form: NgForm): void {
    form.resetForm();
    this.submitted = false;
  }

  hasUnsavedChanges(): boolean {
    return !this.submitted && (this.model.studentName !== '' || this.model.studentEmail !== '');
  }
}
