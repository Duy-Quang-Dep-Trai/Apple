export default function Hero() {
    return (
        <section className="max-w-[1024px] mx-auto px-6 py-10">
            {" "}
            <div className="flex items-start justify-between gap-10">
                {" "}
                <h1 className="text-[64px] leading-[1.05] font-semibold">
                    {" "}
                    <span className="bg-gradient-to-r from-[#5096ff] to-[#ff7e55] bg-clip-text text-transparent">
                        {" "}
                        Cửa Hàng{" "}
                    </span>{" "}
                </h1>{" "}
                <div className="text-right">
                    {" "}
                    <p className="text-[28px] leading-[1.1] font-semibold text-[#1d1d1f]">
                        {" "}
                        Trao những điều đặc biệt <br /> dịp lễ này.{" "}
                    </p>{" "}
                    <a
                        href="#"
                        className="mt-3 inline-flex items-center gap-1 text-[14px] text-[#0066cc] hover:underline"
                    >
                        {" "}
                        Kết Nối Với Chuyên Gia <span aria-hidden="true">↗</span>{" "}
                    </a>{" "}
                </div>{" "}
            </div>{" "}
        </section>
    );
}
