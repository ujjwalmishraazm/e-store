export default function Websitelayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex items-center justify-center bg-muted  w-screen font-assistant">
            {children}
        </div>
    );
}
