export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <main id="main" role="main" className="w-full">
            <div className="mx-auto w-full max-w-[1470px] px-[22px]">
                {children}
            </div>
        </main>
    );
}
