import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  gender: 'male' | 'female';
  day: number;
  month: number;
  year: number;
  hour: number; // 0-11 (Ty -> Hoi)
}

interface UserContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem('tuvi_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Avoid synchronous state update
        setTimeout(() => setProfileState(parsed), 0);
      } catch (e) {
        console.error('Failed to parse profile', e);
      }
    }
    setTimeout(() => setIsLoading(false), 0);
  }, []);

  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
    localStorage.setItem('tuvi_profile', JSON.stringify(newProfile));
  };

  const clearProfile = () => {
    setProfileState(null);
    localStorage.removeItem('tuvi_profile');
  };

  return (
    <UserContext.Provider value={{ profile, setProfile, clearProfile, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
