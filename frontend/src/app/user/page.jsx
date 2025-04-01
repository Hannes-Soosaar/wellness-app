"use client";
import React from "react";

import UserProfile from "@/components/UserProfile.tsx";
import  Button  from "../../components/Button.tsx";

export default function UserPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to the About page of our wellness app!</p>
      <UserProfile />
      <Button label={'testButton'} 
      onClick = { () => alert('testButton clicked') }
      />
    </div>
  );
}
