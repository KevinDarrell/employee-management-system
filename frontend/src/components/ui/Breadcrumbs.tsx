import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string; // Kalau href kosong, berarti halaman aktif (teks abu-abu)
}

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:text-blue-600 transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          {item.href ? (
            <Link to={item.href} className="hover:text-blue-600 font-medium text-gray-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-blue-600">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};