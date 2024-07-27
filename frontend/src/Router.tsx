import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthWrapper from "./modules/core/wrappers/AuthWrapper";
import MainLayout from "@/modules/core/layouts/MainLayout";
import AuthLayout from "@/modules/core/layouts/AuthLayout";
import ErrorPage from "@/modules/core/errors/ErrorPage";
import LoginForm from "./modules/auth/components/LoginForm";
import RegisterForm from "./modules/auth/components/RegisterForm";
import Dashboard from "./modules/dashboard/containers/Dashboard";
import DecksList from "./modules/decks/containers/DecksList";
import DeckEdit from "./modules/decks/containers/DeckEdit";
import DeckStudy from "./modules/decks/containers/DeckStudy";

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <AuthWrapper>
                    <MainLayout />
                </AuthWrapper>
            ),
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: <Dashboard />,
                },
                {
                    path: "/d",
                    element: <DecksList />,
                },
                {
                    path: "/d/:pk/edit",
                    element: <DeckEdit />,
                },
                {
                    path: "/d/:pk/study",
                    element: <DeckStudy />,
                },
            ],
        },
        {
            path: "/acc",
            element: <AuthLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/acc/login",
                    element: <LoginForm />,
                },
                {
                    path: "/acc/register",
                    element: <RegisterForm />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;
