'use client';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CompetitorComparison from './components/CompetitorComparison';
import FeaturesShowcase from './components/FeaturesShowcase';
import TopUsers from './components/TopUsers';
import CommunitySection from './components/CommunitySection';
import CustomerTestimonials from './components/CustomerTestimonials';
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions';
import AnimateInView from './components/AnimateInView';
import StaggeredAnimateInView from './components/StaggeredAnimateInView';
import { Suspense } from 'react';

// Loading fallback
const SectionLoading = () => (
  <div className="h-96 w-full animate-pulse bg-gradient-to-r from-bento-violet/10 to-bento-pink/10"></div>
);

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden bg-white font-sans">
      {/* ===== Hero Section ===== */}
      <Suspense fallback={<SectionLoading />}>
        <AnimateInView id="home" animation="fade-up" threshold={0.1}>
          <Hero />
        </AnimateInView>
      </Suspense>

      {/* ThreeCardSection with animation */}
      <Suspense fallback={<SectionLoading />}>
        <AnimateInView animation="fade-up" threshold={0.1}>
          <FeaturesShowcase />
        </AnimateInView>
      </Suspense>

      {/* ================== */}

      <Suspense fallback={<SectionLoading />}>
        <StaggeredAnimateInView
          animation="fade-up"
          threshold={0.1}
          staggerDelay={0.15}
          initialDelay={0.1}
        >
          {' '}
          <TopUsers />
        </StaggeredAnimateInView>
      </Suspense>

      {/* ================== */}

      {/* BrandTemplatesMarquee with animation */}
      {/* <Suspense fallback={<SectionLoading />}>
        <AnimateInView animation="fade-in" threshold={0.1}>
          <BrandTemplatesMarquee />
        </AnimateInView>
      </Suspense> */}

      {/* ================== */}

      {/* BrandComparison with animation */}
      <Suspense fallback={<SectionLoading />}>
        <AnimateInView animation="fade-up" threshold={0.1} delay={0.1}>
          <CompetitorComparison />
        </AnimateInView>
      </Suspense>

      {/* ================== */}
      {/* TestimonialsComponent with animation */}
      <Suspense fallback={<SectionLoading />}>
        <StaggeredAnimateInView
          animation="fade-up"
          threshold={0.1}
          staggerDelay={0.15}
          initialDelay={0.1}
        >
          <CustomerTestimonials />
        </StaggeredAnimateInView>
      </Suspense>

      {/* ================== */}

      {/* BlogSection with animation */}
      {/* <Suspense fallback={<SectionLoading />}>
        <AnimateInView animation="fade-up" threshold={0.1} delay={0.1}>
          <BlogSection />
        </AnimateInView>
      </Suspense> */}

      {/* FAQSection with animation */}
      <Suspense fallback={<SectionLoading />}>
        <AnimateInView animation="fade-up" threshold={0.1} delay={0.1}>
          <FrequentlyAskedQuestions />
        </AnimateInView>
      </Suspense>

      {/* ================== */}

      {/* DiscordCommunitySection with animation */}
      <Suspense fallback={<SectionLoading />}>
        <StaggeredAnimateInView
          animation="fade-up"
          threshold={0.1}
          staggerDelay={0.15}
          initialDelay={0.1}
        >
          {' '}
          <CommunitySection />
        </StaggeredAnimateInView>
      </Suspense>

      {/* ===== Footer ===== */}
      <Footer />
    </main>
  );
}
