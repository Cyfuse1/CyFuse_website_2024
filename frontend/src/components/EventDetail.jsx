export default function EventDetail() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white" style={{ background: '#030712' }}>
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.07) 1px, transparent 0)`,
                    backgroundSize: '32px 32px',
                }}
            />
            <h1 className="text-4xl font-bold mb-4 relative z-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Event Detail</h1>
            <p className="text-lg relative z-10 text-slate-400" style={{ fontFamily: "'Inter', sans-serif" }}>Details about the selected event will be displayed here.</p>
        </div>
    );
}