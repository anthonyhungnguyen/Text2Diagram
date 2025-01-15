import React from 'react';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex-shrink-0 flex items-center w-1/4">
            <h1 className="text-xl font-bold">Hello</h1>
          </div>

          {/* Middle */}
          <div className="flex-1 flex justify-center">
            <h1 className="text-2xl font-bold text-gray-800">Text2Diagram</h1>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4 w-1/4 justify-end">
            <Button variant="ghost">
              Login
            </Button>
            <Button variant="ghost">
              About
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
