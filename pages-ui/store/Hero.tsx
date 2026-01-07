export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-[#f5f5f7]">
            {/* background full width */}
            {/* <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-r from-[#8cc7ff] via-[#f5f5f7] to-[#ffb37e] opacity-70" />
                <div className="absolute inset-x-0 top-[90px] h-[90px] bg-gradient-to-b from-[#f5f5f7]/0 to-[#f5f5f7]" />
            </div> */}

            {/* container 1190 */}
            <div className="relative mx-auto w-full max-w-[1190px]">
                <div className="min-h-[248px] flex flex-col justify-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                    {/* left = 8/12 */}
                    <div className="lg:basis-2/3">
                        <h1 className="text-[56px] leading-[1.02] font-semibold tracking-[-0.02em] md:text-[64px] lg:text-[80px]">
                            <span className="bg-gradient-to-r from-[#5096ff] to-[#ff7e55] bg-clip-text text-transparent">
                                Cửa Hàng
                            </span>
                        </h1>
                    </div>

                    {/* right = 4/12 */}
                    <div className="lg:basis-1/3 lg:text-right">
                        <p className="text-[24px] leading-[1.1] font-semibold tracking-[-0.01em] text-[#1d1d1f] md:text-[28px]">
                            Cách tốt nhất để mua <br />
                            sản phẩm bạn thích.
                        </p>

                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex items-center gap-1 text-[14px] text-[#0066cc] hover:underline lg:justify-end"
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
