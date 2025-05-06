import React from "react";
import Image from "next/image";
import Animation from "@/public/Animation.gif"
 const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image src={Animation} height={120} width={120} alt={`Loading Academy`} />
      <p className="text-lg mt-4 text-[#0a0043] dark:text-[#ffebd8] text-center">
        Loading ...
      </p>
    </div>
  );
} 
export default Loading;