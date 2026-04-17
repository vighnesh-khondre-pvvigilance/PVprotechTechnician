import { useEffect, useState } from "react";
import { User } from "../types/user";
import { getUserProfile } from "../services/userService";

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const data = await getUserProfile();
      setUser(data);
    } catch (error) {
      console.log("Profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, refetch: fetchUser };
};