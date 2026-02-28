import React from "react";
import ResetCredential from "../components/ResetCredential";

const ResetUsername: React.FC = () => {
  return (
    <ResetCredential
      action="username"
      label="Reset Username"
      apiUrl="api/users/exists"
    />
  );
};

export default ResetUsername;
