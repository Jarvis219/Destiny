'use client';

import { UserProvider, useUser } from '@/store/UserContext';
import Splash from '@/components/Splash';
import Onboarding from '@/components/Onboarding';
import Dashboard from '@/components/Dashboard';
import { useEffect, useState } from 'react';

function AppContent() {
  const { profile, isLoading } = useUser();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <Splash />;
  if (!profile) return <Onboarding />;
  return <Dashboard />;
}

export default function Home() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
