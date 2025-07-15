import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import AdminDashboard from './AdminDashboard';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  // Vérifier l'URL pour afficher la page admin
  useEffect(() => {
    const checkAdminRoute = () => {
      const currentPath = window.location.pathname;
      if (currentPath === '/admin' || currentPath === '/admin/') {
        setShowLogin(true);
      }
    };

    checkAdminRoute();
    
    // Écouter les changements d'URL
    window.addEventListener('popstate', checkAdminRoute);
    
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use proper authentication)
    if (password === 'admin123') {
      setIsAdmin(true);
      setShowLogin(false);
      // Changer l'URL vers /admin
      window.history.pushState({}, '', '/admin');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setPassword('');
    setShowLogin(false);
    // Retourner à la page principale
    window.history.pushState({}, '', '/');
  };

  const handleCancelLogin = () => {
    setShowLogin(false);
    // Retourner à la page principale si on annule
    window.history.pushState({}, '', '/');
  };

  if (isAdmin) {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au site
          </button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div>
      {children}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Accès Administration</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Entrez le mot de passe"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCancelLogin}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoute; 