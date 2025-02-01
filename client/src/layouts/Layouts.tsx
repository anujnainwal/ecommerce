import React, { ReactNode } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layouts: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {children || (
          <div className="text-center text-gray-500 p-6">
            <p>No content available</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layouts;
