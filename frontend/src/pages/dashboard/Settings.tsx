import { ToastContainer } from "react-toastify";
import { useUserSettings } from "../../hooks/useUserSettings";
import UserSettingsForm from "../../components/dashboard/SettingsComponents";

const Settings: React.FC = () => {
  const { user } = useUserSettings();

  return (
    <div className="container-fluid settings">
      <ToastContainer position="top-center" />
      <div className="container custom-form-container">
        <div className="card custom-form-card">
          <div className="card-body">
            <h2 className="card-title custom-form-card-title">Account Information</h2>
            <UserSettingsForm
              email={user?.email}
              username={user?.username}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
