import Image from "next/image";

const Logo = () => (
    <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Obsidian Logo" width={40} height={40} />
        <h1 className="uppercase font-light text-2xl tracking-wider">
            Obsidian Viewer
        </h1>
    </div>
);

export default Logo;
