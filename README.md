# List_Manager

A simple and elegant contact management application built with Angular and Flask. Manage your contacts with ease using this professionally designed application featuring a clean UI and intuitive controls.

## 📷 Screenshots
### 🔹 Home Page
![image](https://github.com/user-attachments/assets/a9ab87c5-5bfa-4dbb-a991-778bb2cb4109)

### 🔹 Add New Details
![image](https://github.com/user-attachments/assets/f1037497-2dc5-4bc6-968e-f98369fccbe4)

### 🔹 Edit Details
![image](https://github.com/user-attachments/assets/5833c1f3-4c53-4c60-9d70-b9e7ec891f7a)

### 🔹 Delete Details
![image](https://github.com/user-attachments/assets/c6547ff8-3aec-4319-b54b-ea4baeb2fd9a)


## Features

- View contacts in a responsive, easy-to-read table
- Add new contacts with validation
- Edit existing contacts with pre-populated form fields
- Delete contacts with confirmation dialogue
- Responsive design for desktop and mobile devices

## Contact Management Features

### Adding Contacts
- Click the "Add New Contact" button to open the registration form
- Fill in the required fields (Name, Age, Gender, Mobile Number)
- Form validation ensures all data is entered correctly
- Click "Save" to add the contact to your list

### Editing Contacts
- Click the "Edit" button (blue button) next to any contact in the list
- The registration form will open with all fields pre-populated with the contact's information
- Make your changes to any field
- Click "Update" to save your changes
- The contact list will automatically refresh with the updated information

### Deleting Contacts
- Click the "Delete" button (red button) next to any contact in the list
- A confirmation dialog will appear asking you to confirm the deletion
- Click "OK" to permanently remove the contact, or "Cancel" to keep the contact
- The contact list will automatically refresh after deletion

## Technology Stack

### Frontend
- Angular 15+
- Angular Router for navigation
- Angular Forms for form handling
- Responsive CSS with custom styling

### Backend
- Python Flask RESTful API
- MongoDB for data storage
- Flask-CORS for cross-origin requests

## Getting Started

### Prerequisites
- Node.js and npm
- Python 3.7+
- MongoDB

### Installation

#### Backend Setup
1. Clone the repository:
   ```
   git clone https://github.com/divyanshu-prakash-rx/List_Manager.git
   cd list-manager/backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies and start the server:
   ```
   pip install -r requirements.txt
   python app.py
   ```

The backend API will be available at http://localhost:3000

#### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```

2. Install dependencies and start the development server:
   ```
   npm install
   ng serve
   ```

The application will be available at http://localhost:4200
