'use client';

import { CreditCard, RefreshCw, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function RefundPage() {
  return (
    <main className="container mx-auto px-4 pt-16 mt-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <RefreshCw className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Refund & Cancellation Policy</h1>
          <p className="text-xl text-muted-foreground">
            Our commitment to quality education and course value
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: 3rd October 2024
          </p>
        </div>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-400/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-semibold text-red-600">1. Non-Refundable Policy</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              All courses and subscriptions under RoboLearn are <strong>non-refundable</strong>. We firmly believe in the quality and value of the courses we provide and stand behind our educational content.
            </p>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-red-700 text-sm">
                <strong>Important:</strong> By enrolling in any course, you acknowledge and agree to our non-refundable policy.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">2. Exceptional Circumstances for Refunds</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Refunds are applicable only under the following exceptional circumstances:
            </p>
            <ul className="list-none space-y-4">
              <li className="flex items-start space-x-3">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <span className="text-muted-foreground font-medium">Platform Technical Issues:</span>
                  <p className="text-sm text-muted-foreground mt-1">If course access is not granted due to platform glitches and payment has been made, customers will be eligible for a refund only after raising a complaint that remains unresolved within 7 working days.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <span className="text-muted-foreground font-medium">Duplicate Payment:</span>
                  <p className="text-sm text-muted-foreground mt-1">If a customer accidentally makes a duplicate payment for the same course, the refund will be processed through the same payment channel used for the original transaction.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <div>
                  <span className="text-muted-foreground font-medium">Event Cancellations:</span>
                  <p className="text-sm text-muted-foreground mt-1">For live events or webinars that are cancelled by RoboLearn, eligible participants will be entitled to a refund or credit towards future events.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-400/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-semibold text-red-600">3. Non-Refundable Situations</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Refunds will <strong>NOT</strong> be provided in the following cases:
            </p>
            <ul className="list-none space-y-3">
              <li className="flex items-center space-x-3">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Change of mind after course enrollment</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Dissatisfaction with course content or teaching methodology</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Missing out on using a coupon code and making full payment</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Technical issues on student&apos;s end (internet, device problems)</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Violation of terms and conditions</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Sharing of course materials or account credentials</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Any reason not explicitly mentioned in exceptional circumstances</span>
              </li>
            </ul>
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-red-700 text-sm">
                <strong>Note:</strong> No refund will be processed unless the exceptional circumstances mentioned above are met.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">4. Refund Processing Timeline</h2>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-400 pl-4">
                <h4 className="font-semibold text-muted-foreground mb-2">Step 1: Complaint Submission</h4>
                <p className="text-sm text-muted-foreground">Submit your complaint to support@robolearn.in with detailed explanation and supporting evidence.</p>
              </div>
              <div className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-semibold text-muted-foreground mb-2">Step 2: Review Process</h4>
                <p className="text-sm text-muted-foreground">Our team will review your case and verify if it meets the exceptional circumstances criteria.</p>
              </div>
              <div className="border-l-4 border-green-400 pl-4">
                <h4 className="font-semibold text-muted-foreground mb-2">Step 3: Refund Processing (If Approved)</h4>
                <p className="text-sm text-muted-foreground">All approved refund claims will be processed within 7 working days from the approval of the refund request.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">5. Refund Method</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Approved refunds will be processed through the same payment method used for the original transaction:
            </p>
            <ul className="list-none space-y-2 mb-4">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground"><strong>Credit/Debit Cards:</strong> 5-7 business days</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground"><strong>Net Banking:</strong> 5-7 business days</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground"><strong>UPI/Wallets:</strong> 3-5 business days</span>
              </li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-blue-700 text-sm">
                <strong>Note:</strong> Processing times may vary depending on your bank or payment provider. RoboLearn is not responsible for delays by third-party payment processors.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">6. Our Commitment to Quality</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              We believe in the quality and value of our courses. Our curriculum is carefully designed by industry experts and regularly updated to meet current market demands. We encourage you to:
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Review course curriculum and preview materials before enrollment</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Contact our support team for any pre-enrollment queries</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Utilize our support resources throughout your learning journey</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">7. Contact for Support</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              For any questions regarding this policy or to raise a complaint under exceptional circumstances, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                <strong>Email:</strong> support@robolearn.in
              </p>
              <p className="text-muted-foreground">
                <strong>Subject Line:</strong> Refund Inquiry - [Your Order ID]
              </p>
              <p className="text-muted-foreground">
                <strong>Phone:</strong> +91 9878555767 (Mon-Fri, 9 AM - 6 PM IST)
              </p>
              <p className="text-muted-foreground">
                <strong>Address:</strong> ROBOLEARNINDIA LLP, B-29-1251/2c/581/1a St- 1 3-r, Ludhiana, Gne College, Ludhiana, Ludhiana, Punjab, India - 141006
              </p>
            </div>
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-yellow-700 text-sm">
                <strong>Important:</strong> Please include your order ID, registered email, and detailed explanation with supporting evidence for faster processing.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center p-8 bg-primary/5 rounded-lg">
          <p className="text-muted-foreground mb-2">
            We hope you enjoy learning with us and make the most of your educational journey!
          </p>
          <p className="text-sm text-muted-foreground">
            Best regards,<br />
            <strong>RoboLearn Team</strong>
          </p>
        </div>
      </div>
    </main>
  );
} 