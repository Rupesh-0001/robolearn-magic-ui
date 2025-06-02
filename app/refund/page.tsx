'use client';

import { CreditCard, RefreshCw, Clock, AlertCircle, CheckCircle } from "lucide-react";

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
            Our commitment to your satisfaction and learning experience
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">1. 7-Day Money Back Guarantee</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              We offer a 7-day money-back guarantee for all our courses. If you are not satisfied with your purchase, you can request a full refund within 7 days of enrollment.
            </p>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="text-green-700 text-sm">
                <strong>Note:</strong> The 7-day period starts from the date of successful payment and course enrollment.
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
              <h2 className="text-2xl font-semibold text-primary">2. Refund Eligibility Criteria</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              To be eligible for a refund, the following conditions must be met:
            </p>
            <ul className="list-none space-y-3">
              <li className="flex items-start space-x-3">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-muted-foreground">Refund request must be made within 7 days of enrollment</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-muted-foreground">You must not have completed more than 20% of the course content</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-muted-foreground">You must not have downloaded course materials or certificates</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-muted-foreground">Account must be in good standing with no policy violations</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">3. Refund Process & Timeline</h2>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-400 pl-4">
                <h4 className="font-semibold text-muted-foreground mb-2">Step 1: Request Submission</h4>
                <p className="text-sm text-muted-foreground">Send your refund request to support@robolearn.in with your enrollment details and reason for refund.</p>
              </div>
              <div className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-semibold text-muted-foreground mb-2">Step 2: Review Process (2-3 Business Days)</h4>
                <p className="text-sm text-muted-foreground">Our team will review your request and verify eligibility criteria.</p>
              </div>
              <div className="border-l-4 border-green-400 pl-4">
                <h4 className="font-semibold text-muted-foreground mb-2">Step 3: Refund Processing (5-7 Business Days)</h4>
                <p className="text-sm text-muted-foreground">Once approved, refunds will be processed to your original payment method within 5-7 business days.</p>
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
              <h2 className="text-2xl font-semibold text-primary">4. Payment Gateway Refunds</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Refunds are processed through the same payment method used for the original transaction:
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
                <strong>Note:</strong> Bank processing times may vary. We are not responsible for delays by payment processors or banks.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-semibold text-red-600">5. Non-Refundable Situations</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Refunds will NOT be provided in the following cases:
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Requests made after 7 days of enrollment</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Course completion of more than 20%</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Violation of terms and conditions</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Sharing of course materials or account credentials</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full"></span>
                <span className="text-muted-foreground">Promotional or discounted course purchases (unless specified)</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">6. Course Cancellation by RoboLearn</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              In rare cases where we need to cancel a course due to unforeseen circumstances:
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Full refund will be provided automatically</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Alternative course options will be offered</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">24-48 hours advance notice when possible</span>
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
              <h2 className="text-2xl font-semibold text-primary">7. Contact for Refund Requests</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              To request a refund or for any questions regarding this policy, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                <strong>Email:</strong> support@robolearn.in
              </p>
              <p className="text-muted-foreground">
                <strong>Subject Line:</strong> Refund Request - [Your Order ID]
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
                <strong>Important:</strong> Please include your order ID, registered email, and reason for refund in your request for faster processing.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 