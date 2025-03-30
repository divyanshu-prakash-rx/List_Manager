import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PersonService } from "../../services/person.service";
import { Person } from "../../models/person.model";

@Component({
  selector: "app-person-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title">List_Manager</h1>
        <p class="app-subtitle">Manage your contacts easily</p>
      </header>

      <div class="content-container">
        <div class="controls">
          <h2>Contacts Directory</h2>
          <a [routerLink]="['/create']" class="btn-add">
            <span class="icon">+</span> Add New Contact
          </a>
        </div>

        <div class="table-container" *ngIf="people.length > 0; else noData">
          <table class="data-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Mobile Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="let person of people; let even = even"
                [class.even-row]="even"
              >
                <td>{{ person.name }}</td>
                <td>{{ person.age }}</td>
                <td>
                  <span class="badge" [ngClass]="person.gender">
                    {{ person.gender | titlecase }}
                  </span>
                </td>
                <td>{{ person.mobileNumber }}</td>
                <td class="actions">
                  <a
                    [routerLink]="['/edit', person._id]"
                    class="btn btn-primary btn-sm"
                    title="Edit"
                  >
                    <span class="material-icon">Edit</span>
                  </a>
                  <button
                    (click)="deletePerson(person._id)"
                    class="btn btn-danger btn-sm"
                    title="Delete"
                  >
                    <span class="material-icon">Delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ng-template #noData>
          <div class="no-data">
            <div class="no-data-content">
              <div class="no-data-icon">📋</div>
              <h3>No contacts found</h3>
              <p>
                Your contacts list is empty. Add your first contact to get
                started.
              </p>
              <a [routerLink]="['/create']" class="btn-add-empty">
                Add New Contact
              </a>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        background-color: #f5f7fa;
        font-family: "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      }

      .app-header {
        background: linear-gradient(90deg, #3a7bd5, #00d2ff);
        color: white;
        padding: 30px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .app-title {
        margin: 0;
        font-size: 2.2rem;
        font-weight: 600;
      }

      .app-subtitle {
        margin: 8px 0 0;
        font-size: 1.1rem;
        opacity: 0.9;
      }

      .content-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px 20px;
      }

      .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
      }

      .controls h2 {
        margin: 0;
        font-size: 1.7rem;
        font-weight: 500;
        color: #333;
      }

      .btn-add {
        display: inline-flex;
        align-items: center;
        background: linear-gradient(90deg, #3a7bd5, #00d2ff);
        color: white;
        padding: 10px 20px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .btn-add:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }

      .btn-add .icon {
        font-size: 1.2rem;
        margin-right: 8px;
      }

      .table-container {
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }

      .data-table {
        width: 100%;
        border-collapse: collapse;
      }

      .data-table th {
        background-color: #f8f9fa;
        color: #495057;
        font-weight: 600;
        text-align: left;
        padding: 15px 20px;
        border-bottom: 2px solid #e9ecef;
      }

      .data-table td {
        padding: 15px 20px;
        border-bottom: 1px solid #e9ecef;
        color: #212529;
      }

      .data-table tbody tr:last-child td {
        border-bottom: none;
      }

      .data-table tbody tr:hover {
        background-color: #f8f9fa;
      }

      .even-row {
        background-color: #fbfbfd;
      }

      .badge {
        display: inline-block;
        padding: 5px 12px;
        border-radius: 50px;
        font-size: 0.85rem;
        font-weight: 500;
        text-transform: capitalize;
      }

      .male {
        background-color: #e3f2fd;
        color: #1565c0;
      }

      .female {
        background-color: #fce4ec;
        color: #c2185b;
      }

      .other {
        background-color: #f3e5f5;
        color: #7b1fa2;
      }

      .actions {
        display: flex;
        gap: 10px;
      }
      .actions {
        display: flex;
        gap: 8px;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        text-decoration: none;
      }

      .btn-sm {
        padding: 0.25rem 0.5rem;
        font-size: 0.765625rem;
        line-height: 1.5;
        border-radius: 0.2rem;
      }

      .btn-primary {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
      }

      .btn-primary:hover {
        color: #fff;
        background-color: #0069d9;
        border-color: #0062cc;
      }

      .btn-danger {
        color: #fff;
        background-color: #dc3545;
        border-color: #dc3545;
      }

      .btn-danger:hover {
        color: #fff;
        background-color: #c82333;
        border-color: #bd2130;
      }

      .material-icon {
        font-size: 0.875rem;
      }
      .no-data {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }

      .no-data-content {
        text-align: center;
        padding: 30px;
      }

      .no-data-icon {
        font-size: 3rem;
        margin-bottom: 15px;
      }

      .no-data h3 {
        margin: 0 0 10px;
        color: #333;
        font-size: 1.5rem;
      }

      .no-data p {
        margin: 0 0 25px;
        color: #666;
      }

      .btn-add-empty {
        display: inline-block;
        background: linear-gradient(90deg, #3a7bd5, #00d2ff);
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.2s;
      }

      .btn-add-empty:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }

      @media (max-width: 768px) {
        .controls {
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }

        .data-table {
          display: block;
          overflow-x: auto;
        }
      }
    `,
  ],
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getAll().subscribe((data) => {
      this.people = data;
    });
  }

  deletePerson(id: string | undefined) {
    if (!id) return;
    if (confirm("Are you sure you want to delete this contact?")) {
      this.personService.delete(id).subscribe(() => {
        this.loadPeople();
      });
    }
  }
}
