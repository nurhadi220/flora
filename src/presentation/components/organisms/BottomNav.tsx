import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Katalog', icon: 'local_florist' },
    { path: '/custom', label: 'Kustom', icon: 'palette' },
    { path: '/cart', label: 'Keranjang', icon: 'shopping_bag', badgeCount: 3 },
    { path: '/profile', label: 'Akun', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-8px_24px_rgba(217,119,106,0.08)]">
      <div className="flex justify-around items-center h-20 px-space-sm max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === '/catalog' && location.pathname === '/');

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] py-space-xs px-space-md rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-primary-container text-on-primary-container shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_6px_14px_rgba(247,168,184,0.35)]'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                {item.badgeCount && item.badgeCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-tertiary text-on-tertiary font-label text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {item.badgeCount}
                  </span>
                )}
              </div>
              <span className="font-label text-[11px] font-bold mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;