import Container from "@/components/layout/Container";

export default function Hero() {
    return (
        <section className="pt-10 pb-8">
            <Container>
                <div className="grid grid-cols-12 gap-6 items-start">
                    <div className="col-span-7">
                        <h1 className="text-[80px] leading-[1] font-semibold tracking-[-0.04em]">
                            Cửa Hàng
                        </h1>
                    </div>

                    <div className="col-span-5 text-right">
                        <p className="text-[28px] leading-[1.2] font-semibold">
                            Trao những điều đặc biệt <br /> dịp lễ này.
                        </p>
                        <a className="inline-flex mt-3 text-[14px] text-blue-600">
                            Kết Nối Với Chuyên Gia ↗
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}
