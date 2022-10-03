import React from "react";
import { BrowserRouter } from "react-router-dom";
import RenderRouter from "./routes";
import ThemeProvider from "~/theme/ThemeProvider";
import { AuthProvider } from "~/contexts/authContext";
import { SidebarProvider } from "~/contexts/SidebarContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SidebarProvider>
          <AuthProvider>
            <RenderRouter />
          </AuthProvider>
        </SidebarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
