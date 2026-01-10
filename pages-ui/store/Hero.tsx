export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-[var(--background)]">
            {/* OPTIONAL gradient bar (bật nếu muốn) */}

            <div className="relative mx-auto w-full max-w-[1190px] px-4 sm:px-6 lg:px-0">
                <div className="min-h-[248px] flex flex-col justify-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                    <div className="lg:basis-2/3">
                        <h1 className="text-[56px] leading-[1.02] font-semibold tracking-[-0.02em] md:text-[64px] lg:text-[80px]">
                            <span className="bg-gradient-to-r from-[#5096ff] to-[#ff7e55] bg-clip-text text-transparent">
                                Cửa Hàng
                            </span>
                        </h1>
                    </div>

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
