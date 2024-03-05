import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import AdminPage from "./pages/AdminPage";
import ModeratorPage from "./pages/ModeratorPage";
import PublicPage from "./pages/PublicPage";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/public" element={<PublicPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["ADMIN"]}>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/moderator"
          element={
            <PrivateRoute roles={["MODERATOR"]}>
              <ModeratorPage />
            </PrivateRoute>
          }
        />
        {/* Más rutas según sea necesario */}
      </Routes>
    </div>
  );
};

export default App;
