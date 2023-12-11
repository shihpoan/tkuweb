"use client";

import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// React组件
export default function LoginPage() {
  const router = useRouter();

  return (
    <>
      <div id="title" className="flex flex-col justify-center items-center">
        <h1 className="text-[3rem] font-bold">112年淡江大學</h1>
        <h2 className="text-[1.5rem] font-bold">河川生態保育創新服務學習</h2>
      </div>
      <div id="btn" className="flex flex-col mt-[8rem] gap-4">
        <button
          className="w-[10rem] h-[3rem] border-[2px] border-white text-lg text-white bg-primary_500 hover:bg-primary_200 font-bold py-2 px-4 rounded"
          onClick={() => {
            router.push("/login");
          }}
        >
          學生登入
        </button>
        <button
          className="w-[10rem] h-[3rem] border-[2px] border-white text-lg text-white bg-primary_500 hover:bg-primary_200 font-bold py-2 px-4 rounded"
          onClick={() => {
            router.push("/home");
          }}
        >
          教師登入
        </button>
      </div>
      <div className="absolute bottom-4 text-sm">V1.0.0</div>
    </>
  );
}
