import React from "react";
import ResetCredential from "../components/ResetCredential";

const ResetPassword: React.FC = () => {
  return (
    <ResetCredential
      action="password"
      label="Reset Password"
      apiUrl="api/users/exists"
    />
  );
};

export default ResetPassword;
