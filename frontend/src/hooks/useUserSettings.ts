import { useEffect, useRef, useState } from "react";
import { fetchWithAuth } from "../api/authFetch";
import { toastError } from "../components/ToastNotification";

interface User {
  email: string;
  username: string;
}

export function useUserSettings() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const loadUser = async () => {
      try {
        const response = await fetchWithAuth("api/users/settings", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
        toastError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return { user, loading, error };
}
