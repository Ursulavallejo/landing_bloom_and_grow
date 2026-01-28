import ReviewsReveal from '@/components/sections/Reviews/ReviewsReveal'
import OurProjectSection from '@/components/sections/Project/OurProjectSection'
import Hero from '@/components/sections/Hero/Hero'
import Header from '@/components/layout/Header'
import ContactSection from '@/components/sections/Contact/ContactSection'
import BooksSection from '@/components/sections/Books/BooksSection'
import BackgroundImage from '@/components/visuals/images/BackgroundImage'
import AboutSection from '@/components/sections/About/AboutSection'

export default function Page() {
  return (
    <main id="top" className="mx-auto max-w-6xl px-(--page-pad) pt-12">
      <BackgroundImage />

      {/* HERO  */}
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

      {/* ABOUT */}
      <section id="about" aria-labelledby="about-title">
        <AboutSection />
      </section>

      {/* REVIEWS */}
      <section aria-labelledby="reviews-title">
        <ReviewsReveal quoteClassName="font-subtitle " />
      </section>

      {/* BOOKS full-bleed */}
      <section
        id="books"
        className="relative left-1/2 w-screen -translate-x-1/2"
        aria-labelledby="books-title"
      >
        <BooksSection />
      </section>

      {/* CONTACT */}
      <section id="contact" aria-labelledby="contact-title">
        <ContactSection />
      </section>
    </main>
  )
}
