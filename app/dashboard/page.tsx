"use client";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>
    </div>
  );
}
