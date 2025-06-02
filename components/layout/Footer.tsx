import Link from "next/link";
// import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">RoboLearn</h2>
            <p className="text-muted-foreground max-w-md">
              Empowering learners worldwide with AI-powered education that adapts to your unique learning style.
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Address:</strong><br />
                RoboLearn Technologies Pvt. Ltd.<br />
                B-29-1251/2c/581/1a St- 1 3-r, Ludhiana<br />
                Gne College, Ludhiana, Ludhiana<br />
                Punjab, India - 141006
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Contact:</strong> +91 9878555767
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Email:</strong> support@robolearn.in
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#faqs" className="text-muted-foreground hover:text-foreground transition-colors">FAQs</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/refund" className="text-muted-foreground hover:text-foreground transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} RoboLearn Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 