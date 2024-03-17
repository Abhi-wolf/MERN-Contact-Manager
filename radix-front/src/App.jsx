import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./pages/Layout";
import { useTheme } from "./contexts/ThemeContext";
import "../theme-config.css";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Theme
        accentColor="red"
        radius="medium"
        grayColor="gray"
        panelBackground="solid"
        appearance={theme}
      >
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoutes>
                  <Layout />
                </ProtectedRoutes>
              }
            >
              {/* <Route index element={<Navigate replace to="/" />} /> */}
              <Route path="/" element={<Layout />} />
            </Route>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        {/* <ThemePanel /> */}
        <Toaster
          position="top-center"
          expand={true}
          closeButton={true}
          richColors
        />
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
