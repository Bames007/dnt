// components/Footer.tsx
import Link from "next/link";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

const Footer = () => {
  return (
    <footer
      className={`border-t border-gray-200 bg-white py-6 px-4 text-center text-xs text-gray-500 ${openSans.className}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} Diaspora Network For Tinubu. All rights
          reserved.
        </p>
        <p>
          Powered &amp; Designed by{" "}
          <Link
            href="https://ebcomtechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 font-bold hover:underline"
          >
            EBCom Technologies
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
