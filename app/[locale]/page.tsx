import Hero from '@/components/Hero'
import Header from '@/components/Header'
import BackgroundImage from '@/components/BackgroundImage'

export default function Page() {
  return (
    <main id="top" className=" mx-auto max-w-6xl px-(--page-pad) pt-12 ">
      {/* BACKGROUND IMAGE */}

      <BackgroundImage />

      <section className=" flex flex-col pt-9 md:pt-6 pb-4 gap-4">
        <Header />
        <div
          aria-hidden
          id="scroll-sentinel"
          className="h-px -mt-px pointer-events-none select-none"
        />
        <Hero />
      </section>
    </main>
  )
}
