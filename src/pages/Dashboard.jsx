import { useState, useEffect } from "react";
import supabase from "../supabase/client";

import DonorDashboard from "./DonorDashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import NGODashboard from "./NGODashboard";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Get the current session to find the user ID
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // Fetch the profile using the user ID from the session
        const { data, error } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else {
          setProfile(data);
        }
      }
    };

    fetchUserProfile();
  }, []);

  // 2. Handle cases where the user is not logged in or profile is not found
  if (!profile) {
    return <div>Could not load profile. Please log in again.</div>;
  }

  // 3. Render the correct dashboard based on the user_type
  switch (profile.user_type) {
    case "ngo":
      return <NGODashboard />;
    case "volunteer":
      return <VolunteerDashboard />;
    case "donor":
      return <DonorDashboard />;
    default:
      return (
        <div>
          Unknown user type. Please contact support. {profile.user_type}
        </div>
      );
  }
};

export default Dashboard;
