import { useState, useEffect } from "react";
import { CurrencyConverter } from "./components/CurrencyConverter";
import { Header } from "./components/Header";
import { AuthPage } from "./components/AuthPage";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { LiveChat } from "./components/LiveChat";

export interface User {
  id: string;
  email: string;
  name: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("converter");

  useEffect(() => {
    // Проверка за запазен потребител в localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Set initial tab to home
    if (user && activeTab === "converter") {
      setActiveTab("home");
    }
  }, [user]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const handleUpdateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Зареждане...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="flex flex-col min-h-screen">
        <Header user={user} onLogout={handleLogout} onNavigateToSettings={() => setActiveTab("settings")} />
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className={`flex-1 ${activeTab === "home" ? "fixed inset-0 ml-16 mt-16" : "ml-16 pt-16"}`}>
          <CurrencyConverter userId={user.id} activeTab={activeTab} onTabChange={setActiveTab} user={user} onUpdateUser={handleUpdateUser} />
        </div>
        {activeTab !== "home" && (
          <div className="ml-16">
            <Footer />
          </div>
        )}
      </div>
      
      {/* Live Chat - винаги видим */}
      <LiveChat userName={user.name} />
    </div>
  );
}