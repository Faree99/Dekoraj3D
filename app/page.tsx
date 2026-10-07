import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="bg-[#041A12]">
      <Navbar />
      <Hero />

      {/* Temporary section so we can see the hero exit */}
      <section className="relative z-20 flex min-h-screen items-center justify-center bg-[#F1F0E8] px-6 text-[#071A12]">
        <div className="max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#168B4E]">
            Dekoraj Group
          </p>

          <h2 className="mt-5 text-5xl font-medium tracking-[-0.05em] md:text-7xl">
            Everything you need to build and operate.
          </h2>
        </div>
      </section>
    </main>
  );
}