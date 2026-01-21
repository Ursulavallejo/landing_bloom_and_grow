import ReviewsReveal from '@/components/ReviewsReveal'
import OurProjectSection from '@/components/OurProjectSection'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import BackgroundImage from '@/components/BackgroundImage'
import AboutSection from '@/components/AboutSection'

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
      {/* FULL BLEED wrapper */}
      <section
        id="project"
        className="relative left-1/2 w-screen -translate-x-1/2"
      >
        <OurProjectSection />
        {/* <AboutSection /> */}
      </section>
      <AboutSection />
      {/* Reviews entre About y Books */}
      <ReviewsReveal quoteClassName="font-subtitle" />
      {/* <BooksSection /> */}
    </main>
  )
}
