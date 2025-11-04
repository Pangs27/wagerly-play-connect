import { useState } from "react";
import { AuthButton } from "./AuthButton";
import { AuthModal } from "./AuthModal";

export const AuthExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("login");

  const openModal = (mode: "login" | "signup") => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Example navbar mockup */}
      <nav className="flex items-center justify-between p-4 bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800">
        <div className="text-xl font-bold text-zinc-100">
          Wagerly
        </div>
        
        <div className="flex items-center gap-3">
          <AuthButton 
            mode="login" 
            onClick={() => openModal("login")}
          />
          <AuthButton 
            mode="signup" 
            onClick={() => openModal("signup")}
          />
        </div>
      </nav>

      <AuthModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={modalMode}
      />
    </>
  );
};
