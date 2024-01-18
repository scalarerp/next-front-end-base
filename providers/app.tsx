// import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationProvider } from "@/context/authentication";
import ApplicationRoutes from "@/routes";
import { ThemeProvider } from "./theme-provider";

export const App = () => (
  //  <BrowserRouter>

  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    storageKey="next-frontend-theme-2"
  >
    <AuthenticationProvider>
      <ApplicationRoutes />
    </AuthenticationProvider>
    <ToastContainer />
  </ThemeProvider>

  // </BrowserRouter>
);

export default App;
