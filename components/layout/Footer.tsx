import Link from "next/link";
// import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-[3.09rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-[1.23rem] font-bold mb-2">RoboLearn</h2>
            <p className="text-[1.03rem] text-muted-foreground max-w-md">
              Empowering learners worldwide with AI-powered education that adapts to your unique learning style.
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-[13.8px] text-muted-foreground">
                <strong>Address:</strong><br />
                ROBOLEARNINDIA LLP<br />
                B-29-1251/2c/581/1a St- 1 3-r, Ludhiana<br />
                Gne College, Ludhiana, Ludhiana<br />
                Punjab, India - 141006
              </p>
              <p className="text-[13.8px] text-muted-foreground">
                <strong>Contact:</strong> +91 9878555767
              </p>
              <p className="text-[13.8px] text-muted-foreground">
                <strong>Email:</strong> support@robolearn.in
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-[0.93rem] font-semibold uppercase tracking-wider mb-2">Resources</h3>
            <ul className="space-y-1">
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors duration-300 ease-in-out text-[0.93rem]">FAQs</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-[0.93rem]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-[0.93rem]">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[0.93rem] font-semibold uppercase tracking-wider mb-2">Company</h3>
            <ul className="space-y-1">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-[0.93rem]">About Us</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors text-[0.93rem]">Careers</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-[0.93rem]">Contact</Link></li>
              <li><Link href="/refund" className="text-muted-foreground hover:text-foreground transition-colors text-[0.93rem]">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-[3.09rem] pt-[1.85rem] border-t border-border">
          <p className="text-center text-[1.03rem] text-muted-foreground">
            &copy; {new Date().getFullYear()} ROBOLEARNINDIA LLP All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 