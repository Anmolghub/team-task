🚀 Team Task Manager (Full-Stack Backend)

A role-based task management system where Admins can create projects and assign tasks, and Members can track and update their assigned tasks.


🌐 Live URL: https://team-task-production-aae4.up.railway.app

📦 GitHub Repository: https://github.com/Anmolghub/team-task

-----------------------------------------------------------------------------------
✨ Features

* 🔐 JWT Authentication (Signup / Login)
* 👥 Role-Based Access Control (Admin / Member)
* 📁 Project Management (Create & View)
* ✅ Task Management (Create, Assign, Update Status)
* 📊 Dashboard Summary (Task counts & overdue tracking)
* 🌍 Deployed on Railway

------------------------------------------------------------------------------------
🧑‍💻 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Deployment:** Railway

------------------------------------------------------------------------------------
## 🔐 Authentication Flow

1. User signs up (Admin or Member)
2. User logs in → receives JWT token
3. Token is used in protected routes:

```http
Authorization: Bearer <token>
```

------------------------------------------------------------------------------------
📡 API Endpoints

🔐 Auth Routes

* `POST /api/auth/signup` → Register user
* `POST /api/auth/login` → Login & get token

------------------------------------------------------------------------------------
📁 Project Routes

* `POST /api/projects` → Create project (Admin only)
* `GET /api/projects` → Get all projects

------------------------------------------------------------------------------------
✅ Task Routes

* `POST /api/tasks` → Create task (Admin only)
* `GET /api/tasks` → Get tasks (filtered by role)
* `PUT /api/tasks/:id/status` → Update task status

------------------------------------------------------------------------------------
📊 Dashboard

* `GET /api/tasks/dashboard/summary` → Task analytics

------------------------------------------------------------------------------------
🔒 Role-Based Access Logic

* **Admin**

  * Can create projects
  * Can create & assign tasks
  * Can view all tasks

* **Member**

  * Can view only assigned tasks
  * Can update status of their own tasks

------------------------------------------------------------------------------------
⚙️ Setup Instructions (Local)

```bash
git clone https://github.com/Anmolghub/team-task.git
cd team-task
npm install
npm start
```

------------------------------------------------------------------------------------
🔑 Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

------------------------------------------------------------------------------------
🧪 Testing

You can test APIs using:

* Thunder Client
* Postman

Example:

```http
GET /api/projects
Authorization: Bearer <token>
```

------------------------------------------------------------------------------------
🎯 Project Status

✅ Fully functional backend
✅ Role-based access implemented
✅ Deployed & tested in production

------------------------------------------------------------------------------------
📌 Notes

* No frontend included (API-based backend project)
* Designed for scalability and clean REST architecture

------------------------------------------------------------------------------------
🙌 Author GitHub: https://github.com/Anmolghub
