import Image from 'next/image';

interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
    showText?: boolean; // Option if we want to hide/show text, though the logo likely has it
}

export function Logo({ className = '', width = 150, height = 50 }: LogoProps) {
    // Note: The filename contains special characters. Ensure the file in public/ matches exactly.
    // If not, we might need to copy/rename it to logo.svg for safety.
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <Image
                src="/EnSeñasLogoSinFondo.svg"
                alt="EnSeñas AI Logo"
                width={width}
                height={height}
                className="object-contain scale-[1.5] md:scale-[1.7] lg:scale-[1.8]"
                priority
            />
        </div>
    );
}
