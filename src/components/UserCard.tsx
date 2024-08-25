"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";

const UserCard: React.FC = () => {
  const { userName } = useAppContext();

  return (
    <div className="absolute top-4 right-4 bg-white shadow-md rounded-lg p-4">
      <p className="text-sm font-semibold text-orange-800">
        Welcome, {userName || "Guest"}
      </p>
    </div>
  );
};

export default UserCard;
