import useAuthStore from "@/modules/auth/store/AuthStore";
import { Sidebar } from "flowbite-react";
import { MdLogout } from "react-icons/md";
import { HiChartPie, HiViewBoards } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";

const AppSidebar = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const logoutUser = async () => {
        await logout();
        navigate("acc/login", { replace: true });
    };

    return (
        <>
            <Sidebar className="flex w-full sticky z-10 max-h-[calc(4.5rem)] justify-center lg:w-64 lg:h-full lg:max-h-full lg:relative">
                <Sidebar.Items className="flex flex-row p-0 justify-between overflow-x-auto w-full lg:flex-col lg:w-40 lg:h-full">
                    <Sidebar.ItemGroup>
                        <div className="flex flex-row w-full lg:flex-col">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-gray-700 flex items-center justify-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-none"
                                        : "flex items-center justify-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-none"
                                }
                            >
                                <HiChartPie className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                <span className="flex-1 whitespace-nowrap px-3 text-sm lg:text-lg">
                                    Dashboard
                                </span>
                            </NavLink>
                            <NavLink
                                to="/d"
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-gray-700 flex items-center justify-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-none"
                                        : "flex items-center justify-center p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-none"
                                }
                            >
                                <HiViewBoards className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                <span className="flex-1 whitespace-nowrap px-3 text-sm lg:text-lg">
                                    Decks
                                </span>
                            </NavLink>
                            <button
                                className="w-full text-left lg:hidden"
                                onClick={logoutUser}
                            >
                                <Sidebar.Item
                                    icon={MdLogout}
                                    className="rounded-none text-sm"
                                >
                                    Logout
                                </Sidebar.Item>
                            </button>
                        </div>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <button
                            className="w-full text-left hidden lg:inline-block"
                            onClick={logoutUser}
                        >
                            <Sidebar.Item
                                icon={MdLogout}
                                className="rounded-none"
                            >
                                Logout
                            </Sidebar.Item>
                        </button>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </>
    );
};

export default AppSidebar;
