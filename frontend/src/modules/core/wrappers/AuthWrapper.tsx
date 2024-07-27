import useAuthStore from "@/modules/auth/store/AuthStore";
import { Spinner } from "flowbite-react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function AuthWrapper({ children }: { children: JSX.Element }) {
    const verify = useAuthStore((state) => state.verify);
    const status = useAuthStore((state) => state.status);

    useEffect(() => {
        verify();
    }, [verify]);

    if (status.loading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <Spinner />
            </div>
        );
    }

    if (status.error) {
        return <Navigate to="/acc/login" replace />;
    }

    return children;
}
