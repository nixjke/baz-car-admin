import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navigation } from "./components";
import { HomePage, LoginForm, RegistrationPage } from "./pages";

export const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
