# Blogger - Modern Blog Management Application

A comprehensive blog management system built with React, Redux Toolkit, and Bootstrap. This application provides a platform for creators to manage their content and for readers to explore diverse blogs, featuring a dynamic dashboard and role-based access control.

---

## 1. Overview
- **App Name**: Blogger
- **Purpose**: To provide a seamless platform for content creators to draft, publish, and analyze their blogs while offering readers an intuitive interface to discover content.
- **Problem it Solves**: Simplifies content management for individuals who need a lightweight, responsive blog platform without the overhead of complex CMS systems.
- **Target Users**: Independent writers, students, and readers interested in community-driven content.
- **Key Features**:
  *   Role-based access (Creator vs. Reader)
  *   Full CRUD operations on blogs
  *   Interactive Data Dashboard (Metrics visualization)
  *   Secure Route Guarding
  *   Persistent User Sessions (localStorage)
- **Tech Stack**:
  *   **Frontend**: React 19, TypeScript, Vite
  *   **State Management**: Redux Toolkit
  *   **Routing**: React Router 7
  *   **Styling**: Bootstrap 5.3, Custom CSS
  *   **Visualization**: Chart.js, React-Chartjs-2
  *   **API Client**: Axios
  *   **Mock Backend**: JSON Server

---

## 2. Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation Steps
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Rushikesh-Gsource/Initial_Project.git
    cd blogger-app
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```

### How to Run the App
Open a terminal and run the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### How to Run the Backend (JSON Server)
Open a **separate terminal** and run the mock API:
```bash
npm run server
```
The backend will run at `http://localhost:5000` using `db.json` as the database.

---

## 3. Project Structure
```text
blogger-app/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and styles
│   ├── Component/          # Main UI components
│   │   ├── Login.tsx       # Auth entrance
│   │   ├── Dashboard.tsx   # Creator's metrics view
│   │   ├── BlogList.tsx    # Feed of all blogs
│   │   ├── Editblog.tsx    # Edit blog
│   │   ├── Body.tsx        # Add blog usage
│   │   ├── Signup.tsx      # Signup page
│   │   ├── Login.tsx       # Login page
│   │   ├── Header.tsx      # Header page
│   │   └── BlogDetail.tsx  # Blog details page
│   ├── Guards/             # Route protection logic
│   ├── Store/              # Redux configuration
│   │   ├── Slices/         # State modules (blogSlice)
│   │   └── store.ts        # Global store setup
│   ├── App.tsx             # Main router and layout
│   └── main.tsx            # Entry point
├── db.json                 # Mock database
├── package.json            # Scripts & dependencies
└── tsconfig.json           # TS configuration
```

---

## 4. Application Architecture
### High-level Architecture
The app follows a **Unidirectional Data Flow** pattern using Redux Toolkit. It communicates with a mock REST API via Axios.

### Data Flow
1.  **UI**: User triggers an action (e.g., clicks "Delete").
2.  **API**: Axios sends a request to JSON Server.
3.  **Redux**: On successful response, a Redux action is dispatched.
4.  **UI**: The store updates, and React re-renders the components with new state.

### Routing Flow
Managed by `react-router-dom`. Routes are wrapped in `ProtectedRoute` components to enforce authentication and role requirements.

---

## 5. Features

### Authentication & Signup
- **Description**: Users can create accounts and log in.
- **Access Level**: Public (Anyone)
- **Internal**: Stores user object in `localStorage` and Redux state.

### Blog Management (CRUD)
- **Description**: Creators can add, edit, or delete blogs.
- **Access Level**: Creator
- **Internal**: Uses Axios `POST`, `PUT`, and `DELETE` requests to `http://localhost:5000/Blogs`.

### Dashboard
- **Description**: Visualizes the total number of blogs vs. total word count.
- **Access Level**: Creator
- **Internal**: Computes metrics from Redux state and renders a `Pie` chart using `react-chartjs-2`.

---

## 6. Routing & Navigation

Path: '/' 
Component: 'Login'
Access: Public
Description: Login Page

Path: '/signup' 
Component: 'Signup'
Access: Public
Description: Registration Page

Path: '/bloglist' 
Component: 'BlogList'
Access: User (Any)
Description: View all blogs

Path: '/blog/:id' 
Component: 'BlogDetail'
Access: User (Any)
Description: Read full blog content

Path: '/dashboard' 
Component: 'Dashboard'
Access: Creator
Description: Analytics & Metrics

Path: '/body' 
Component: 'Body'
Access: Creator
Description: Create new blog post

Path: '/edit-blog/:id' 
Component: 'EditBlog'
Access: Creator
Description: Modify existing blog


### Route Guards
The `ProtectedRoute` component checks if a `user` exists in the store/localStorage. If a route requires a specific role (e.g., `Creator`), it validates the `user.title` field before allowing access.

---

## 7. State Management (Redux Toolkit)

### Store Setup
The store combines the `blogSlice` reducer to manage the entire application state.

### Blog Slice Structure
```typescript
interface BlogState {
    blogs: any[]; // Array of blog objects
    user: any;    // Current logged-in user details
}
```

### Example: Consuming State
```javascript
const blogs = useSelector((state) => state.blog.blogs);
const dispatch = useDispatch();

// To delete a blog
dispatch(deleteBlog(id));
```

---

## 8. API Integration (Axios + JSON Server)
- **Base URL**: `http://localhost:5000`
- **Endpoints**:
GET /Blogs: Fetch all blogs
POST /Blogs: Create a blog
PUT /Blogs/:id: Update a blog
DELETE /Blogs/:id: Remove a blog
GET /users/:id: Validate credentials during login

---

## 9. Authentication & Authorization
1.  **Login**: App checks `db.json` for matching email/password.
2.  **Session**: On success, user data is saved to `localStorage` under the key `"user"`.
3.  **Persistence**: On app refresh, `App.tsx` checks `localStorage` and re-hydrates the Redux store.
4.  **Logout**: Clears `localStorage` and resets Redux state to `null`.

---

## 10. UI & Styling
- **CSS Framework**: Bootstrap 5.3 is utilized for layout and standard components (cards, forms, buttons).
- **Responsive Design**: Uses Bootstrap's grid system (`container`, `row`, `col`) to ensure mobile compatibility.
- **Themes**: Supports dynamic styling via `Header.css` and `App.css`.

---

## 11. Configuration
- **Port 5000**: Reserved for the JSON Server.
- **Port 5173**: Default Vite development port.
- **package.json**: Contains the `server` script for easy backend startup.

---

## 12. Error Handling
- **Unauthorized**: `ProtectedRoute` automatically redirects unauthenticated users to the Login page.
- **Empty States**: Conditional rendering in `BlogList` displays "No blogs found" if the array is empty.
