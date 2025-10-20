export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-10 h-10">
        {/* Spinner lingkaran */}
        <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />

        {/* Efek glow */}
        <div className="absolute inset-0 rounded-full blur-md bg-cyan-400/40 animate-pulse" />
      </div>
    </div>
  );
}
