
  import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./app/App";
import { SignUp } from "./app/components/SignUp";
import { SignIn } from "./app/components/SignIn";
import { ProtectedRoute } from "./app/components/ProtectedRoute";
import { AdminPanel } from "./app/pages/AdminPanel";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </Router>
);
  