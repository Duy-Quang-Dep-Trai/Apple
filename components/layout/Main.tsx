export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <main role="main" className="mx-auto w-full max-w-[1470px]">
            {children}
        </main>
    );
}
