export default function Hero() {
    return (
        <section className="bg-[#f5f5f7]">
            {/* as-l-container (Apple): canh giữa + giới hạn width row */}
            <div className="mx-auto w-full max-w-[1190px] py-12">
                {/* row */}
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
                    {/* column large-8 small-12 */}
                    <div className="w-full md:basis-2/3">
                        <h1 className="text-[80px] leading-[1.02] font-semibold tracking-[-0.02em]">
                            <span className="bg-gradient-to-r from-[#5096ff] to-[#ff7e55] bg-clip-text text-transparent">
                                Cửa Hàng
                            </span>
                        </h1>
                    </div>

                    {/* column large-4 small-12 */}
                    <div className="w-full md:basis-1/3 md:text-right">
                        <p className="text-[28px] leading-[1.1] font-semibold tracking-[-0.01em] text-[#1d1d1f]">
                            Trao những điều đặc biệt <br />
                            dịp lễ này.
                        </p>

                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex items-center justify-start gap-1 text-[14px] text-[#0066cc] hover:underline md:justify-end"
                        >
                            Kết Nối Với Chuyên Gia <span aria-hidden="true">↗</span>
                            <span className="sr-only">(Mở trong cửa sổ mới)</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
