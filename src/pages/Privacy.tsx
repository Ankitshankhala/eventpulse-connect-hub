
import { Card, CardContent } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: December 2024
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="mb-4 text-gray-700">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700">
                  <li>Create an account or profile</li>
                  <li>Create, organize, or attend events</li>
                  <li>Contact us for support</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in surveys or feedback</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="mb-4 text-gray-700">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze trends and usage</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                <p className="mb-6 text-gray-700">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                  except as described in this privacy policy. We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700">
                  <li>With event organizers when you register for their events</li>
                  <li>With service providers who assist us in operating our platform</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                <p className="mb-6 text-gray-700">
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic 
                  storage is 100% secure.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
                <p className="mb-4 text-gray-700">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data</li>
                  <li>Object to certain processing of your data</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
                <p className="mb-6 text-gray-700">
                  We use cookies and similar tracking technologies to collect and use personal information about you. 
                  You can control cookies through your browser settings, but disabling cookies may limit your ability 
                  to use certain features of our service.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
                <p className="mb-6 text-gray-700">
                  We retain your personal information for as long as necessary to provide our services and fulfill 
                  the purposes outlined in this privacy policy, unless a longer retention period is required by law.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                <p className="mb-6 text-gray-700">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal 
                  information from children under 13.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
                <p className="mb-6 text-gray-700">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy, please contact us at privacy@eventpulse.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
