import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBackButton = true }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(217,119,106,0.06)]">
      <div className="h-16 px-gutter-mobile flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-space-sm">
          {showBackButton && (
            <button
              aria-label="Kembali"
              type="button"
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface hover:text-primary transition-colors hover:bg-surface-container-low cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
            </button>
          )}
          <img
            alt="FluffyPetal Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZUTTq4hT27SRmoOuoBdjL2JEK4W3CGymBU8bKUqGcQ9swazFeryIzMLorYCi6qIZj2P-NuS5phuqkOl85keEnkzKkkrLKnutNqzTnsrP5LBACYJmcyCDwe399EGN3UiYLrqJcQ9jqM8EoUxfkyElzAMQL4CQLX5oOhURb2dsVv_M7EFNhi03eyc3dKZ90piVAKgbkXQGddLNff3dXmeV5B9pV7SW_F8O62_2_0YNaXHy1h8EFW4wgjQ"
          />
          <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">{title}</h1>
        </div>
        <div className="flex items-center">
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover shadow-[0_2px_8px_rgba(217,119,106,0.15)]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuChoX7iOwr838Q2uHZaK5_VXwQ4WyosVzlLKyQb9UR8i074adGEcoSxii3LCPje769IFzAPQobfmFVWUFTFRuC6gzKJFSG-da7wK3VcHiKZBHgRGhq2gCgGav_j36ELFbU4lc1v2Jbi6EX2KaXKIP936uE3CR8H1rhiUkzDss7jC0Vo70fzzgOvGjpIzpiSyt4e0NpWrWejweaAqGCd-EHsUTzmhwFsFpEW_2183rRcQee_0GG6CNkXsA"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;