import Image from 'next/image'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import BackgroundImage from '@/components/BackgroundImage'

export default function Page() {
  return (
    <main className=" mx-auto max-w-6xl px-[var(--page-pad)] pt-12 ">
      {/* BACKGROUND IMAGE */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        // style={{
        //   backgroundImage: "url('/background_lines_light.png')",
        // }}
      >
        <BackgroundImage />
      </div>
      <section className="min-h-dvh flex flex-col pt-6 pb-4 gap-4">
        <Header />
        <Hero />
      </section>
    </main>
  )
}
