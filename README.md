# ControlMyDesk (CMD)

**ControlMyDesk** is an assignment, which is a **Progressive** Web Application to demonstrate the use of [Reqres API](https://reqres.in)

---

## Features
- **User Authentication**: Secure login functionality using a mock API.
- **Progressive and Responsive Design**: Fully responsive layout for both desktop and mobile devices.
- **Modern Tech Stack**: Built using React, React Router, Tailwind CSS, and Vite for fast development and performance.
- **User Experience**: Used Toastify and Heroicons libraries to enhance user experience.

---

## Demo

Check out the live demo of the app [here](https://handlemydesk.netlify.app).

---

## Usage

1. **Login**:
   - Use the mock credentials below to log in:
     - **Email**: `eve.holt@reqres.in`
     - **Password**: `cityslicka`

2. **User Management**:
   - Navigate to the Users page to manage and edit user data.

3. **Responsive Design**:
   - Test the application on both desktop and mobile devices to see its responsiveness.

---

## Installation

Follow these steps to run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/control-my-desk.git
   cd control-my-desk
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## Directory Structure

Here’s an overview of the project structure:

```
public/
src/
  assets/
    icons/
    landing-page.svg
  components/
    EditUserModal.jsx       # Modal component for editing user details
    Layout.jsx              # Shared layout component with header and navbar
  context/
    AuthContext.jsx         # Provides authentication state using React Context
  pages/
    Login.jsx               # Login page with responsive design
    Users.jsx               # Users page for managing and editing user data
  App.jsx                   # Main application file
  index.css                 # Global styles
  main.jsx                  # Entry point for the React application
  ProtectedRoute.jsx        # Component for restricting access to authenticated users
.gitignore                  # Files and directories to be ignored by Git
eslint.config.js            # ESLint configuration for consistent coding style
index.html                  # Main HTML file
manifest.json               # Metadata for progressive web app
package-lock.json           # Exact dependency versions
package.json                # Project dependencies and scripts
postcss.config.cjs          # PostCSS configuration for Tailwind CSS
README.md                   # Documentation for the project
tailwind.config.js          # Tailwind CSS configuration
vite.config.js              # Vite configuration for bundling
```

---

## Dependencies
The application is built using the following technologies:
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For client-side routing.
- **Axios**: For handling HTTP requests.
- **Tailwind CSS**: For rapid styling and responsive design.
- **React Toastify**: For showing notifications.
- **Vite**: A fast and modern development environment.

---

## Contributing
Feel free to contribute to this project! Here’s how you can get started:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add feature description"
   git push origin feature-name
   ```
4. Open a pull request.

---
