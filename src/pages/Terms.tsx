
import { Card, CardContent } from '@/components/ui/card';
import { Footer } from '@/components/landing/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: December 2024
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm mb-16">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="mb-6 text-gray-700">
                  By accessing and using EventPulse, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
                <p className="mb-4 text-gray-700">
                  Permission is granted to temporarily download one copy of EventPulse per device for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on EventPulse</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Event Content</h2>
                <p className="mb-6 text-gray-700">
                  You are responsible for all content you create, upload, or share through EventPulse. 
                  You retain ownership of your content but grant us a license to use, store, and share it as necessary to provide our services.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Privacy Policy</h2>
                <p className="mb-6 text-gray-700">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of EventPulse, 
                  to understand our practices.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Account Termination</h2>
                <p className="mb-6 text-gray-700">
                  We may terminate or suspend your account and bar access to EventPulse immediately, without prior notice or liability, 
                  under our sole discretion, for any reason whatsoever including without limitation if you breach the Terms.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="mb-6 text-gray-700">
                  In no event shall EventPulse or its suppliers be liable for any damages (including, without limitation, 
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                  to use EventPulse, even if EventPulse or an authorized representative has been notified orally or in writing 
                  of the possibility of such damage.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to Terms</h2>
                <p className="mb-6 text-gray-700">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes 
                  via email or through our platform.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms of Service, please contact us at legal@eventpulse.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
