'use client';

import { Shield, FileText, Users, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 pt-16 mt-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using our services
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
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">1. Acceptance of Terms</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              By accessing and using the RoboLearn platform, you accept and agree to be bound by the terms and provision of this agreement. These Terms & Conditions constitute a legally binding agreement between you and ROBOLEARNINDIA LLP
            </p>
            <p className="text-muted-foreground">
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">2. Services Provided</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              RoboLearn provides online educational services including but not limited to:
            </p>
            <ul className="list-none space-y-2 mb-4">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">AI Agent Development Bootcamp</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Autonomous Car Development Bootcamp</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Robotic Arm Development Bootcamp</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Online learning materials and resources</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Mentorship and support services</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">3. User Responsibilities</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              As a user of our platform, you agree to:
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Provide accurate and truthful information during registration</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Use the platform only for lawful purposes</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Not share your account credentials with others</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Not distribute or resell course content without permission</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                <span className="text-muted-foreground">Respect intellectual property rights</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">4. Payment Terms</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Payment for courses must be made in full before access is granted. We accept payments through Razorpay and other authorized payment gateways. All prices are in Indian Rupees (INR) and include applicable taxes.
            </p>
            <p className="text-muted-foreground">
              Course fees are subject to change without prior notice. However, enrolled students will not be affected by price changes for their current enrollment.
            </p>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">5. Intellectual Property</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              All content, including but not limited to text, graphics, videos, audio, software, and other materials available on the platform are the intellectual property of ROBOLEARNINDIA LLP or its licensors.
            </p>
            <p className="text-muted-foreground">
              Students are granted a limited, non-exclusive, non-transferable license to access and use the course materials for personal educational purposes only.
            </p>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">6. Limitation of Liability</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              ROBOLEARNINDIA LLP shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
            <p className="text-muted-foreground">
              Our total liability to you for any damages shall not exceed the amount paid by you for the course or service in question.
            </p>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur"></div>
          <div className="relative bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary">7. Contact Information</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              For any questions regarding these Terms & Conditions, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                <strong>Email:</strong> support@robolearn.in
              </p>
              <p className="text-muted-foreground">
                <strong>Phone:</strong> +91 9878555767
              </p>
              <p className="text-muted-foreground">
                <strong>Address:</strong> ROBOLEARNINDIA LLP, B-29-1251/2c/581/1a St- 1 3-r, Ludhiana, GNE College, Ludhiana, Ludhiana, Punjab, India - 141006
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 