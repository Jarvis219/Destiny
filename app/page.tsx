'use client';

import { useUser } from '@/store/UserContext';
import Splash from '@/components/Splash';
import Onboarding from '@/components/Onboarding';
import Dashboard from '@/components/Dashboard';
import { useEffect, useState } from 'react';

function AppContent() {
  const { profile, isLoading, hasVisitedDashboard, setHasVisitedDashboard } = useUser();
  const [showSplash, setShowSplash] = useState(!hasVisitedDashboard);

  useEffect(() => {
    if (!hasVisitedDashboard) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        setHasVisitedDashboard(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, [hasVisitedDashboard, setHasVisitedDashboard]);

  if (showSplash) return <Splash />;
  if (!profile) return <Onboarding />;
  return <Dashboard />;
}

export default function Home() {
  return <AppContent />;
}
