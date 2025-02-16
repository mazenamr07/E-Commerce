import React from "react";
import { Navigate } from "react-router-dom";

export default function ResetGuard({ children }) {
  const resetEmail = localStorage.getItem("resetPasswordEmail");

  return <>{resetEmail ? children : <Navigate to="/login" />}</>;
}
