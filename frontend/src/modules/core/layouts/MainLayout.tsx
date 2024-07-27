import { Outlet } from "react-router-dom";
import AppSidebar from "@core/components/AppSidebar";

const MainLayout = () => {
    return (
        <div className="flex flex-col-reverse justify-between h-screen w-screen p-0 border-box lg:flex-row lg:justify-center lg:p-4">
            <AppSidebar />
            <Outlet />
        </div>
    );
};

export default MainLayout;
