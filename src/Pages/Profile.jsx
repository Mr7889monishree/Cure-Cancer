import React, { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "../context/Index";
import { motion, AnimatePresence } from "framer-motion";
import { IconUser, IconMapPin, IconCalendar, IconMail, IconWallet } from "@tabler/icons-react";

const ProfilePage = () => {
  const { user, authenticated } = usePrivy();
  const { currentUser } = useStateContext();
  const [showDetails, setShowDetails] = useState(true); // Open by default

  if (!authenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p className="text-lg">Please log in to view your profile.</p>
      </div>
    );
  }

  const displayName = currentUser?.username || "Anonymous";
  const age = currentUser?.age || "N/A";
  const location = currentUser?.location || "N/A";
  const email = user?.email?.address || "No email";
  const wallet = user?.wallet?.address || "Not connected";

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-12 px-4 relative overflow-hidden">
      {/* Glow Backgrounds - adjusted for better visibility */}
      <div className="absolute w-[300px] h-[300px] bg-[#1dc071] opacity-20 rounded-full top-[10%] right-[-80px] blur-3xl pointer-events-none" />
      <div className="absolute w-[250px] h-[250px] bg-[#4acd8d] opacity-20 rounded-full bottom-[10%] left-[-60px] blur-2xl pointer-events-none" />

      {/* Avatar & Name */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4acd8d] to-[#1dc071] flex items-center justify-center text-black text-4xl font-bold shadow-lg border-4 border-[#2c2f32]">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <h2 className="mt-4 text-3xl font-semibold text-white">{displayName}</h2>
        <p className="text-sm text-gray-400">{email}</p>
      </div>

      {/* Profile Card */}
      <motion.div
        className="mt-8 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowDetails((prev) => !prev)}
        >
          <h3 className="text-xl font-semibold text-white">👤 Profile Info</h3>
          <span className="text-[#4acd8d] text-xl font-bold">
            {showDetails ? "−" : "+"}
          </span>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              className="mt-6 space-y-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Divider />
              <Detail icon={<IconUser size={18} />} label="Username" value={displayName} />
              <Detail icon={<IconCalendar size={18} />} label="Age" value={age} />
              <Detail icon={<IconMapPin size={18} />} label="Location" value={location} />
              <Detail icon={<IconMail size={18} />} label="Email" value={email} />
              <Detail icon={<IconWallet size={18} />} label="Wallet" value={wallet} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const Detail = ({ label, value, icon }) => (
  <div className="flex items-start gap-3">
    <div className="text-[#4acd8d] mt-0.5">{icon}</div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-white text-sm break-words">{value}</p>
    </div>
  </div>
);

const Divider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#4acd8d]/30 to-transparent my-4" />
);

export default ProfilePage;
