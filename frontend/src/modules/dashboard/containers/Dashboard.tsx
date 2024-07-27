import { PopUp } from "../components/Popup";
import ProfileInfo from "../components/ProfileInfo";

const Dashboard = () => {
    return (
        <div className="flex flex-col w-full h-full text-center lg:p-10">
            <ProfileInfo />
            <PopUp />
        </div>
    );
};

export default Dashboard;
