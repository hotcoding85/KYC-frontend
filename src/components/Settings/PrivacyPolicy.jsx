/* eslint-disable react/no-unescaped-entities */
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="rounded-2xl bg-white border border-primary50 w-full mx-auto p-6 text-xs font-normal text-textBlack">
      <div className="space-y-4">
        {/* Introduction */}
        <p className="text-xs font-normal leading-[16px] text-left text-textBlack">
          This Privacy Policy (the "Policy") explains how KYC Checks (the
          "Company", "We" or "Us") collects and uses the information while you
          are using the services on our website at kycchecks.com (the
          "Website"). By browsing the Website or using our Services, you, as a
          user of our website or our customer ("User", "Customer" or "you"),
          agree to the terms of this Policy and confirm that you have read and
          understood all the terms of the Policy. The Company processes personal
          data only in accordance with the requirements of legal acts regulating
          the processing of personal data. The Company processes only as much
          personal data as is necessary to achieve a specific purpose and
          retains them only for as long as is necessary to achieve the intended
          purposes. You can always contact the Company by email
          info@kycchecks.com if you have any questions about the processing of
          your personal data.
        </p>

        {/* Section 1 */}
        <section>
          <h2 className="text-textBlack font-bold text-xs leading-[16px] tracking-[-0.006em] text-left mb-3">
            1. Information we collect
          </h2>
          <p className="mb-2 text-xs font-normal leading-[16px] text-left">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Personal Information: This may include your name, email address,
              phone number, and other information necessary for the services we
              provide.
            </li>
            <li>
              Log Data: When you use our website, we may automatically collect
              information such as your IP address, browser type, operating
              system, and the pages you visit.
            </li>
            <li>
              Cookies: We may use cookies and similar technologies to enhance
              your user experience.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-textBlack font-bold text-xs leading-[16px] tracking-[-0.006em] text-left mb-3">
            2. How We Use Your Information
          </h2>
          <p className="mb-2 text-xs font-normal leading-[16px] text-left">
            We use your information for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and improve our services.</li>
            <li>
              To send you updates, notifications, and other relevant
              information.
            </li>
            <li>To analyze and monitor website usage and performance.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-textBlack font-bold text-xs leading-[16px] tracking-[-0.006em] text-left mb-3">
            3. Information Sharing
          </h2>
          <p className="leading-relaxed">
            We do not sell, trade, or otherwise transfer your personal
            information to third parties. We may share information with trusted
            service providers who assist us in operating our website and
            services.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-textBlack font-bold text-xs leading-[16px] tracking-[-0.006em] text-left mb-3">
            4. Security
          </h2>
          <p className="leading-relaxed">
            We take the security of your data seriously and employ
            industry-standard measures to protect it from unauthorized access,
            disclosure, alteration, and destruction.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-textBlack font-bold text-xs leading-[16px] tracking-[-0.006em] text-left mb-3">
            5. Your Choices
          </h2>
          <p className="leading-relaxed">
            You have the right to access, correct, or delete your personal
            information. To do so, please contact us at [Insert Contact
            Information].
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-textBlack font-bold text-xs leading-[16px] tracking-[-0.006em] text-left mb-3">
            6. Changes to this Privacy Policy
          </h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and the effective date will be updated
            accordingly.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-textBlack font-bold text-xs leading-[16px] tracking-[-0.006em] text-left mb-3">
            7. Contact Us
          </h2>
          <p className="leading-relaxed">
            If you have any questions or concerns about our Privacy Policy,
            please contact us at [Insert Contact Information].
          </p>
          <p className="mt-4 leading-relaxed">
            By using KYC Checks, you acknowledge that you have read and
            understood this Privacy Policy and agree to its terms and
            conditions. Your continued use of our website and services
            constitutes your acceptance of this policy.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
