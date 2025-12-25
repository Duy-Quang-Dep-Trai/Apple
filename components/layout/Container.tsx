export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-[1024px] px-[22px]">
            {children}
        </div>
    );
}
