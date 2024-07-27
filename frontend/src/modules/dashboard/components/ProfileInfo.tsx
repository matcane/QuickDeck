import { Spinner } from "flowbite-react";
import { useDashboardStore } from "../store/DashboardStore";
import { useEffect } from "react";
import useAuthStore from "@/modules/auth/store/AuthStore";

const ProfileInfo = () => {
    const username = useAuthStore((state) => state.user.username);

    const quantity = useDashboardStore((state) => state.quantity);
    const status = useDashboardStore((state) => state.status);
    const getDecksQuantity = useDashboardStore(
        (state) => state.getDecksQuantity
    );

    useEffect(() => {
        getDecksQuantity();
    }, [getDecksQuantity]);

    if (status.loading) {
        return (
            <>
                <p className="text-xl truncate">{username}</p>
                <p className="text-xl">{<Spinner size="sm" />} decks created</p>
            </>
        );
    }

    return (
        <>
            <p className="text-xl truncate">{username}</p>
            <p className="text-xl">{quantity} decks created</p>
        </>
    );
};

export default ProfileInfo;
