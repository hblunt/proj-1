import React from "react";

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute">
        <span className="flex size-{11px}">
          <span className="absolute inline-flex h-full w-full animate-ping bg-primary rounded-full opacity-75"></span>
          <span className="relative inline-flex rounded-full size-{11px} bg-primary"></span>
        </span>
      </div>
    </div>
  );
};

export default Ping;
