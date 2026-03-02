import collegeDuniaLogoSrc from '../assets/collegedunia-logo.png';

export default function CollegeDuniaLogo({ className = '' }: { className?: string }) {
    return (
        <div className={`flex items-center ${className}`}>
            <img
                src={collegeDuniaLogoSrc}
                alt="Collegedunia"
                style={{ height: '54px' }} className="w-auto object-contain"
                draggable={false}
            />
        </div>
    );
}
