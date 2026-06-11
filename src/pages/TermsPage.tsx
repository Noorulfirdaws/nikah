import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By creating an account on Nikah ("the App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the App. These Terms constitute a legally binding agreement between you and Nikah Inc. ("Nikah," "we," "us").`,
  },
  {
    title: '2. Eligibility',
    body: `You must be at least 18 years old to use Nikah. By creating an account, you confirm that you are 18 or older and are legally able to enter into a contract. Nikah is designed for Muslims seeking marriage. Non-Muslims are welcome to use the platform if they are seriously considering marriage to a Muslim, but must be respectful of Islamic values.`,
  },
  {
    title: '3. Purpose of the Service',
    body: `Nikah is a marriage-focused platform. It is designed to help serious, marriage-minded Muslims find compatible spouses. Use of the platform for casual dating, entertainment, solicitation, or any purpose other than marriage is prohibited. Nikah does not facilitate or promote casual relationships.`,
  },
  {
    title: '4. Prohibited Conduct',
    body: `You agree not to: (a) use the App for any unlawful purpose; (b) harass, abuse, or harm other users; (c) share false, misleading, or fraudulent information in your profile; (d) share explicit, offensive, or inappropriate content; (e) attempt to extract personal contact information from other users before they have consented; (f) create multiple accounts; (g) impersonate another person or entity; (h) engage in commercial solicitation or spam; (i) attempt to reverse-engineer or harm the platform.`,
  },
  {
    title: '5. Profiles and Content',
    body: `You are responsible for the accuracy of your profile information. Profile photos must show a clear, recent image of you. You may not use photos of other people or fictional characters. All content you submit must be halal, respectful, and aligned with Nikah's community guidelines. We reserve the right to remove any content that violates these Terms or our Community Guidelines, and to suspend or delete accounts that repeatedly violate our standards.`,
  },
  {
    title: '6. Privacy',
    body: `Your use of Nikah is also governed by our Privacy Policy, which is incorporated into these Terms by reference. We take your privacy seriously and are committed to protecting your personal data in accordance with GDPR and applicable data protection laws. Please review our Privacy Policy to understand how we collect, use, and protect your information.`,
  },
  {
    title: '7. Subscriptions and Payments',
    body: `Nikah offers free and paid subscription tiers. Paid subscriptions are billed in advance on a monthly or annual basis. You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. Nikah offers a 7-day money-back guarantee for new premium subscribers. Pricing may vary by country and currency.`,
  },
  {
    title: '8. Disclaimers and Limitation of Liability',
    body: `Nikah is provided "as is." We do not guarantee that you will find a spouse through our platform. We do not conduct background checks on users. You use the App at your own risk. To the maximum extent permitted by law, Nikah shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the App.`,
  },
  {
    title: '9. Changes to These Terms',
    body: `We may update these Terms from time to time. When we do, we will notify you via email and in-app notice at least 14 days before the changes take effect. Your continued use of the App after changes take effect constitutes your acceptance of the new Terms.`,
  },
  {
    title: '10. Governing Law',
    body: `These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
  },
  {
    title: '11. Contact',
    body: `For questions about these Terms, contact us at legal@nikahapp.com or through our Help Center.`,
  },
]

export default function TermsPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      <PageHero label="📄 Legal" title="Terms of" titleHighlight="Service" subtitle="Last updated: 1 June 2025" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-7">
          <p className="text-sm text-gray-500 leading-relaxed border-l-4 border-emerald-200 pl-4">
            Please read these Terms of Service carefully before using the Nikah platform. These terms govern your access to and use of our services.
          </p>
          {SECTIONS.map(s => (
            <div key={s.title}>
              <h2 className="font-bold text-gray-900 mb-2">{s.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-8">
          Questions? <Link to="/contact" className="hover:underline" style={{ color: '#1a6b4a' }}>Contact us</Link> or visit our <Link to="/help" className="hover:underline" style={{ color: '#1a6b4a' }}>Help Center</Link>.
        </p>
      </div>
    </div>
  )
}
