import React from "react";
import ResetCredential from "../components/ResetCredential";

const ResetPassword: React.FC = () => {
  return (
    <ResetCredential
      action="password"
      label="Reset Password"
      apiUrl="http://localhost:8000/users/exists"
    />
  );
};

export default ResetPassword;
