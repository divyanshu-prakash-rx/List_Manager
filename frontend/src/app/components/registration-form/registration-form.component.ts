import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="form-card">
        <div class="header">
          <h2>{{isEditMode ? 'Edit' : 'Add New'}} Contact</h2>
          <div class="logo">List_Manager</div>
        </div>
        
        <form (ngSubmit)="onSubmit()" #form="ngForm">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              [(ngModel)]="person.name" 
              name="name" 
              required
              #nameInput="ngModel"
              [class.invalid]="nameInput.invalid && nameInput.touched"
              placeholder="Enter full name">
            <div class="error-message" *ngIf="nameInput.invalid && nameInput.touched">
              Name is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="age">Age</label>
            <input 
              type="number" 
              id="age"
              [(ngModel)]="person.age" 
              name="age" 
              required
              min="1"
              max="120"
              #ageInput="ngModel"
              [class.invalid]="ageInput.invalid && ageInput.touched"
              placeholder="Enter age">
            <div class="error-message" *ngIf="ageInput.invalid && ageInput.touched">
              Please enter a valid age (1-120)
            </div>
          </div>
          
          <div class="form-group">
            <label for="gender">Gender</label>
            <select 
              id="gender"
              [(ngModel)]="person.gender" 
              name="gender" 
              required
              #genderInput="ngModel"
              [class.invalid]="genderInput.invalid && genderInput.touched">
              <option value="" disabled selected>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div class="error-message" *ngIf="genderInput.invalid && genderInput.touched">
              Please select a gender
            </div>
          </div>
          
          <div class="form-group">
            <label for="mobile">Mobile Number</label>
            <input 
              type="tel" 
              id="mobile"
              [(ngModel)]="person.mobileNumber" 
              name="mobileNumber" 
              required
              pattern="[0-9]{10}"
              #mobileInput="ngModel"
              [class.invalid]="mobileInput.invalid && mobileInput.touched"
              placeholder="Enter 10-digit mobile number">
            <div class="error-message" *ngIf="mobileInput.invalid && mobileInput.touched">
              Please enter a valid 10-digit mobile number
            </div>
          </div>
          
          <div class="button-group">
            <button 
              type="submit" 
              class="btn-primary"
              [disabled]="form.invalid">
              {{isEditMode ? 'Update' : 'Save'}}
            </button>
            <button 
              type="button" 
              class="btn-secondary"
              (click)="cancel()">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 20px;
      background-color: #f5f7fa;
    }
    
    .form-card {
      width: 100%;
      max-width: 550px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 30px;
      background: linear-gradient(90deg, #3a7bd5, #00d2ff);
      color: white;
    }
    
    .header h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 500;
    }
    
    .logo {
      font-weight: bold;
      font-size: 1.2rem;
      letter-spacing: 0.5px;
    }
    
    form {
      padding: 30px;
    }
    
    .form-group {
      margin-bottom: 24px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    
    input, select {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }
    
    input:focus, select:focus {
      outline: none;
      border-color: #3a7bd5;
      box-shadow: 0 0 0 2px rgba(58, 123, 213, 0.1);
    }
    
    input.invalid, select.invalid {
      border-color: #e74c3c;
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 0.85rem;
      margin-top: 5px;
    }
    
    .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 20px;
    }
    
    button {
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .btn-primary {
      background: linear-gradient(90deg, #3a7bd5, #00d2ff);
      color: white;
    }
    
    .btn-primary:hover:not(:disabled) {
      background: linear-gradient(90deg, #316bbc, #00bce4);
      box-shadow: 0 4px 10px rgba(58, 123, 213, 0.2);
    }
    
    .btn-secondary {
      background: #f5f7fa;
      color: #444;
    }
    
    .btn-secondary:hover {
      background: #e4e7eb;
    }
  `]
})
export class RegistrationFormComponent implements OnInit {
  person: Person = {
    name: '',
    age: 0,
    gender: '',
    mobileNumber: ''
  };
  isEditMode = false;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.personService.getById(id).subscribe(person => {
        this.person = person;
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.personService.update(this.person._id!, this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.personService.create(this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}