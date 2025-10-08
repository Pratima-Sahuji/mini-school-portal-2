# Mini School Portal

The Mini School Portal is a **full-stack web application** designed to manage school operations efficiently. It provides distinct interfaces for **Students** and **Teachers**, allowing secure access, student record management, and attendance tracking.

---

##  Tech Stack

* **Frontend**: React.js, React Router, Axios
* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **Authentication**: JWT (JSON Web Tokens)
* **Styling**: Bootstrap
* **Environment Variables**: dotenv

---

##  Features

* **Student Dashboard**: View personal information.
* **Teacher Dashboard**: View all students, edit or delete student records, and mark attendance.
* **Authentication & Authorization**:

  * JWT-based login and signup.
  * Role-based access control with `auth` and `authorizeRole` middlewares.
* **Secure Routes**: Only authorized users can access specific routes.

---

##  API Endpoints

### **Authentication**

* `POST /api/user/signup` – Register a new user
* `POST /api/user/login` – Login

### **Students**

* `GET /api/student/` – Get all students (Teacher only)
* `GET /api/student/:id` – Get a specific student (Teacher or the student itself)
* `PUT /api/student/` – Update student profile
* `DELETE /api/student/` – Delete student profile

### **Teachers**

* `GET /api/teacher/:id` – Get teacher profile
* `PUT /api/teacher/` – Update teacher profile
* `DELETE /api/teacher/` – Delete teacher profile

### **Attendance**

* `POST /api/attendance/` – Mark attendance (Teacher only)
* `GET /api/attendance/:studentId` – Get attendance (Teacher or the student itself)

---

##  Installation & Setup

### **1. Clone the Repository**

```bash
git clone https://github.com/Pratima-Sahuji/mini-school-portal.git
cd mini-school-portal
```

### **2. Backend Setup**

```bash
cd backend
npm install
cp .env.example .env
# Update your PostgreSQL credentials in .env
npm start
```

### **3. Frontend Setup**

```bash
cd frontend
npm install
npm start
```

---

## Authentication

* Signup: `/api/user/signup`
* Login: `/api/user/login`

After login/signup, the user is redirected to **Student** or **Teacher Dashboard** based on their role.

---

## Contribution

To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push the branch (`git push origin feature/YourFeature`).
5. Create a Pull Request.

---


