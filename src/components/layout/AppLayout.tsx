import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import { RequireAuth, RequireNoAuth } from "@/protected/RequireAuth";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { StudentsList } from "@/pages/admin/StudentList";
import { StudentDetails } from "@/pages/admin/StudentDetails";
import { AddStudent } from "@/pages/admin/AddStudent";
import { AdminLayout } from "./AdminLayout";
import { RequireAdmin } from "@/protected/RequireAdminAuth";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";

function AppLayout() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RequireNoAuth>
              <LoginPage />
            </RequireNoAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RequireNoAuth>
              <SignupPage />
            </RequireNoAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="students/new" element={<AddStudent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppLayout;
