import ReviewsReveal from '@/components/ReviewsReveal'
import OurProjectSection from '@/components/OurProjectSection'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import BooksSection from '@/components/BooksSection'
import BackgroundImage from '@/components/BackgroundImage'
import AboutSection from '@/components/AboutSection'

export default function Page() {
  return (
    <main id="top" className="mx-auto max-w-6xl px-(--page-pad) pt-12">
      <BackgroundImage />

      {/* HERO (puede ser section o header, ambas OK) */}
      <section className="flex flex-col gap-4 pt-9 pb-4 md:pt-6">
        <Header />
        <div
          aria-hidden
          id="scroll-sentinel"
          className="h-px -mt-px pointer-events-none select-none"
        />
        <Hero />
      </section>

      {/* PROJECT full-bleed */}
      <section
        id="project"
        className="relative left-1/2 w-screen -translate-x-1/2"
        aria-labelledby="project-title"
      >
        <OurProjectSection />
      </section>

      {/* ABOUT normal width */}
      <section id="about" aria-labelledby="about-title">
        <AboutSection />
      </section>

      {/* REVIEWS */}
      <section aria-labelledby="reviews-title">
        <ReviewsReveal quoteClassName="font-subtitle" />
      </section>

      {/* BOOKS full-bleed */}
      <section
        id="books"
        className="relative left-1/2 w-screen -translate-x-1/2"
        aria-labelledby="books-title"
      >
        <BooksSection />
      </section>
    </main>
  )
}
