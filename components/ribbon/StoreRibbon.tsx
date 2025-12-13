export default function StoreRibbon() {
    return (
        <div
            aria-hidden="true"
            className="relative w-full overflow-hidden bg-[#f5f5f7]"
            style={{ height: 140 }}
        >
            {/* lớp màu chính */}
            <div
                className="absolute -left-[120px] -right-[120px] top-0 h-[140px] blur-[20px]"
                style={{
                    backgroundImage: `
            radial-gradient(1000px 220px at 10% 0%, rgba(70,170,255,0.95), rgba(70,170,255,0) 70%),
            radial-gradient(1000px 220px at 55% 0%, rgba(255,215,130,0.90), rgba(255,215,130,0) 70%),
            radial-gradient(1000px 220px at 90% 0%, rgba(255,145,110,0.95), rgba(255,145,110,0) 70%)
          `,
                }}
            />

            {/* lớp fade xuống trắng (RẤT QUAN TRỌNG để giống Apple) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f5f5f7]/70 to-white" />
        </div>
    );
}
