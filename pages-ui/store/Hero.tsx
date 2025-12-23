export default function Hero() {
    return (
        <section className="bg-[#f5f5f7]">
            {/* inner content ~1190 */}
            <div className="mx-auto w-full max-w-[1190px] py-12">
                <div className="flex items-start justify-between gap-10">
                    {/* left column ~ 8/12 */}
                    <div className="basis-2/3">
                        <h1 className="text-[80px] leading-[1.02] font-semibold tracking-[-0.02em]">
                            <span className="bg-gradient-to-r from-[#5096ff] to-[#ff7e55] bg-clip-text text-transparent">
                                Cửa Hàng
                            </span>
                        </h1>
                    </div>

                    {/* right column ~ 4/12 */}
                    <div className="basis-1/3 text-right">
                        <p className="text-[28px] leading-[1.1] font-semibold tracking-[-0.01em] text-[#1d1d1f]">
                            Trao những điều đặc biệt <br />
                            dịp lễ này.
                        </p>

                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex items-center justify-end gap-1 text-[14px] text-[#0066cc] hover:underline"
                        >
                            Kết Nối Với Chuyên Gia <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
