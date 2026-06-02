import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCurrentUser, login as apiLogin, logout as apiLogout } from '../api/authApi';

/**
 * AuthContext stellt den Login-Status und die Benutzerdaten
 * der gesamten Anwendung zur Verfügung.
 *
 * Verwendung in einer Komponente:
 * const { user, login, logout } = useAuth();
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Beim ersten Laden prüfen ob noch eine Session existiert
  useEffect(() => {
    fetchCurrentUser().then(setUser);
  }, []);

  async function login(email, password) {
    const userData = await apiLogin(email, password);
    setUser(userData);
    return userData;
  }

  async function logout() {
    await apiLogout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook für einfachen Zugriff auf den AuthContext.
 * Wirft einen Fehler wenn er außerhalb von AuthProvider verwendet wird.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth muss innerhalb von AuthProvider verwendet werden.');
  return context;
}