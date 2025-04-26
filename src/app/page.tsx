import Image from "next/image";
import "./globals.css";

export default function Home() {
    return (
        <div className="relative flex flex-col items-center justify-center text-center w-screen h-screen overflow-hidden bg-[#0033ff] text-white">
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="mb-4">
                    <Image
                        src="/assets/sphyre-logo.svg"
                        alt="Sphyre Logo"
                        width={210}
                        height={210}
                        className="w-[90%] max-w-[210px] mb-3 animate-spin-slow"
                        priority
                    />
                </div>

                <div className="mb-1">
                    <Image
                        src="/assets/sphyre-text.png"
                        alt="Sphyre Text Logo"
                        width={245}
                        height={70}
                        priority
                    />
                </div>

                <p className="font-[Plus Jakarta Sans] text-[15px] font-light">
                    Who You Are, Finally Yours
                </p>
            </div>
        </div>
    );
}