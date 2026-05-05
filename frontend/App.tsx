import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect } from 'react';

// Pages
import DiaryCover from './pages/DiaryCover.tsx';
import NavigationPage from './pages/NavigationPage.tsx';
import AboutMe from './pages/AboutMe.tsx';
import BlogList from './pages/BlogList.tsx';
import BlogDetail from './pages/BlogDetail.tsx';
import Categories from './pages/Categories.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import AdminLogin from './pages/AdminLogin.tsx';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><DiaryCover /></PageWrapper>} />
        <Route path="/nav" element={<PageWrapper><NavigationPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutMe /></PageWrapper>} />
        <Route path="/blogs" element={<PageWrapper><BlogList /></PageWrapper>} />
        <Route path="/blogs/:id" element={<PageWrapper><BlogDetail /></PageWrapper>} />
        <Route path="/categories" element={<PageWrapper><Categories /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
        <Route path="/admin/login" element={<PageWrapper><AdminLogin /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// Wrapping each route in a motion container to simulate page flipping/sliding horizontally
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: window.innerWidth / 2, rotateY: 30, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      exit={{ opacity: 0, x: -window.innerWidth / 2, rotateY: -30, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 120, damping: 25, mass: 1 }}
      className="w-full min-h-[85vh] origin-left"
      style={{ style: "preserve-3d" } as any}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  // Prevent vertical scrolling logic globally if desired, although setting overflow-x: hidden in css suffices
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen overflow-x-hidden flex items-center justify-center p-4 md:p-8">
        <div className="max-w-5xl w-full mx-auto relative perspective-1000">
           <AnimatedRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
