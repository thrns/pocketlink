import React from 'react';
import { Container } from '@/components/ui/container';
import Footer from '../components/Footer';
function TermsOfService() {
  return (
    <>
      <Container className="w-full py-40">
        <div className="mx-auto h-full max-w-3xl overflow-y-auto rounded-lg border p-4 text-left leading-relaxed">
          <section className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold">Terms of Service</h1>
            <p className="mb-4">Last updated: 2 February 2025</p>
          </section>

          <section>
            <h2 className="mt-4 font-semibold">1. Introduction</h2>
            <p>
              Welcome to Pocketlink! These Terms and Conditions govern your use
              of our website and services. By accessing or using our website,
              you agree to be bound by these Terms. If you disagree with any
              part of the terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="mt-4 font-semibold">2. Intellectual Property</h2>
            <p>
              The content, layout, design, data, databases, and graphics on this
              website are protected by intellectual property laws and are owned
              by or licensed to Pocketlink. Unless otherwise stated, you may not
              reproduce, distribute, modify, transmit, reuse, download, repost,
              copy, or use any of the content on this website for commercial
              purposes without express written permission from us.
            </p>
          </section>

          <section>
            <h2 className="mt-4 font-semibold">3. User Responsibilities</h2>
            <p>
              As a user, you agree to use the website and services only for
              lawful purposes and in a way that does not infringe the rights of,
              restrict, or inhibit anyone else's use and enjoyment of the
              website.
            </p>
          </section>

          <section>
            <h2 className="mt-4 font-semibold">4. Limitations of Liability</h2>
            <p>
              To the fullest extent permitted by law, Pocketlink shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly, or any loss of data, use,
              goodwill, or other intangible losses, resulting from your access
              to or use of, or inability to access or use, the website or
              services.
            </p>
          </section>

          <section>
            <h2 className="mt-4 font-semibold">5. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws of Tamil Nadu, India, without regard to its conflict of law
              provisions.
            </p>
          </section>

          <section>
            <h2 className="mt-4 font-semibold">6. Changes to Terms</h2>
            <p className="font-medium">
              We reserve the right to modify or replace these Terms at any time.
              The most current version will be posted on our website. By
              continuing to access or use our services after those revisions
              become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="mt-4 font-semibold">7. Termination</h2>
            <p>
              We may terminate or suspend your access to our services
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section className="mx-auto mt-4 max-w-3xl text-left leading-relaxed">
            <h2 className="mt-4 font-semibold">8. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="font-bold">Pocketlink</p>
            <p>
              <a
                href="mailto:support@pocketlink.co"
                className="text-blue-600 underline"
              >
                support@pocketlink.co
              </a>
            </p>
          </section>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default TermsOfService;
