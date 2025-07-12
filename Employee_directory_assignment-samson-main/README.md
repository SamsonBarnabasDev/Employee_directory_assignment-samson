# Employee Directory Web Interface

## 🔍 Overview
This is a responsive and interactive Employee Directory Web Interface built using **HTML**, **CSS**, **JavaScript**, and **Freemarker templates**. It demonstrates key front-end development concepts and showcases clean, modular, and user-friendly UI without backend interaction.

---

## ✅ Features

- **Dashboard Page** to list employees with:
  - Employee ID
  - First Name & Last Name
  - Email
  - Department
  - Role
  - Edit & Delete buttons

- **Add/Edit Employee Form** with:
  - First Name, Last Name, Email, Department, and Role fields
  - Client-side validation

- **Filter Sidebar** to filter employees by:
  - First Name
  - Department
  - Role

- **Search Bar** to find employees by name or email

- **Pagination** options:
  - 10, 25, 50, or 100 employees per page

- **Responsive Design** for desktop, tablet, and mobile screens

- **Data Handling**:
  - Local JavaScript array simulating employee data
  - No backend/API calls involved

- **Error Handling & Validation**:
  - Required field checks
  - Email format validation
  - User-friendly error messages

---

## 📁 Project Structure

```
employee-directory-assignment/
├── README.md
├── src/
│   ├── main/
│   │   ├── java/                  # (optional backend placeholder)
│   │   └── resources/
│   │       ├── templates/
│   │       │   └── index.html     # Freemarker template for main UI
│   │       └── static/
│   │           ├── css/
│   │           │   └── style.css  # Styling for the application
│   │           ├── js/
│   │           │   ├── app.js     # JavaScript logic for UI
│   │           │   └── data.js    # Mock employee data
│   │           └── images/        # (optional) assets
├── screenshots/
│   ├── dashboard.png
│   └── add-employee-form.png
```

---

## ▶️ Setup & Run Instructions

1. Open the project in **Visual Studio Code**.
2. Install the **Live Server extension** if not already installed.
3. Right-click on `index.html` (inside `src/main/resources/templates/`) and click **"Open with Live Server"**.
4. The application will launch in your browser and display the Employee Directory.

---

## 🖼️ Screenshots

### 🔹 Dashboard View
![Dashboard](screenshots/dashboard.png)

### 🔹 Add Employee Form
![Add Employee](screenshots/add-employee-form.png)

---

## 💭 Reflection

### 🎯 What I Learned
- Using **Freemarker** for server-side templating while combining with dynamic **JavaScript** for interactivity.
- Structuring modular front-end code with separation of concerns (HTML, CSS, JS).
- Validating and managing UI state using only client-side code.

### ⚠️ Challenges Faced
- Ensuring UI responsiveness across all devices.
- Managing data manipulation purely on the client side without a backend.
- Integrating form validation in a user-friendly and error-proof way.

### 💡 Improvements for the Future
- Add transitions and animations for a better user experience.
- Implement **infinite scroll** as an enhancement over pagination.
- Persist employee data using **localStorage** or connect to a real backend.
- Add role-based filtering logic with live indicators.

---

## 🔗 Links

- **Company Website**: [Ajackus](https://www.ajackus.com/)
- **LinkedIn Page**: [Ajackus LinkedIn](https://in.linkedin.com/company/ajackus)

---

> 📌 _Assignment built as part of the Ajackus Frontend Hiring Process._  
> 🧑‍💻 _Submitted by: **Samson Barnabas**_
