import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#dc2626"/>
              <path d="M16.9423 15.3462H15.0577V11.5769H16.9423V15.3462ZM16.9423 18.2308H15.0577V16.9231H16.9423V18.2308ZM21.9904 11.5769V21.0385H20.5481V12.8462L18.8269 13.5V12.3365L21.8077 11.0192V11.5769H21.9904ZM13.0192 11.0192V21.0385H10V11.0192H13.0192ZM11.4615 19.7692H11.5769V12.2885H11.4615V19.7692Z" fill="white"/>
            </svg>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} MedPlus Inc. All rights reserved.
          </p>
          <p className="text-sm mt-1">
            Empowering pharmacy partners with technology and support.
          </p>
          <div className="flex gap-4 mt-4 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-500">|</span>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
