import { Metadata } from "next";
import { Shield, Database, Lock, UserCheck, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | RoboLearn",
  description: "Learn about how RoboLearn protects your privacy and handles your personal information.",
};

// Use a static date to avoid hydration mismatch
const LAST_UPDATED = "May 15, 2025";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-20 mt-15">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-6">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-xl text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">1. Introduction</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              At RoboLearn, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our platform. Please read this 
              privacy policy carefully. If you do not agree with the terms of this privacy policy, 
              please do not access the platform.
            </p>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">2. Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-none space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                  <span className="text-muted-foreground">Register for an account</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                  <span className="text-muted-foreground">Express interest in our services</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                  <span className="text-muted-foreground">Participate in activities on our platform</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                  <span className="text-muted-foreground">Contact us for support</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">3. How We Use Your Information</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Provide and maintain our services</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Improve and personalize your learning experience</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Communicate with you about updates and support</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Analyze usage patterns to enhance our platform</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Comply with legal obligations</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">4. Your Rights</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Access your personal information</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Correct inaccurate data</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Request deletion of your data</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Object to processing of your data</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Data portability</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 relative">
        <div className="my-12">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Have More Questions?
              </h3>
              <p className="text-sm sm:text-base text-gray-500 md:flex items-center">
                You can email us at&nbsp;
                <a
                  href="mailto:no-reply@robolearn.in"
                  className="text-[#3e48ce] underline"
                >
                  no-reply@robolearn.in
                </a>
                &nbsp; or contact us on &nbsp;
                <a
                  href="tel:+919878555767"
                  className="text-[#3e48ce] underline"
                >
                  +91 987 855 5767
                </a>
              </p>
              <a
                href="https://wa.me/919878555767?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Autonomous%20Car%20Masterclass"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 px-6 py-3 bg-white hover:bg-gray-900 text-gray-900 border border-gray-900 hover:text-white font-medium rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 