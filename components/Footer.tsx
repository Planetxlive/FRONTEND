'use client';

import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ArrowUp,
  Building2,
  Users,
  Award,
  Shield,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="w-8 h-8 text-emerald-400" />
              <h3 className="text-2xl font-bold text-white">PlanetX</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner in real estate excellence. We connect dreams
              with properties, making every transaction seamless and every home
              perfect.
            </p>

            {/* Company Stats */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">10,000+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">5,000+ Properties Sold</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">15+ Years Experience</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/buy"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  Buy Property
                </Link>
              </li>
              <li>
                <Link
                  href="/sell"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  Sell Property
                </Link>
              </li>
              <li>
                <Link
                  href="/rent"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  Rent Property
                </Link>
              </li>
              <li>
                <Link
                  href="/invest"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  Investment
                </Link>
              </li>
              <li>
                <Link
                  href="/valuation"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link
                  href="/consultation"
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                >
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    123 Business District
                    <br />
                    Mumbai, Maharashtra 400001
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">+91 98765 43210</p>
                  <p className="text-gray-400 text-xs">Mon-Sat 9AM-6PM</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">info@planetx.com</p>
              </div>

              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">www.planetx.com</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-3">
                Follow Us
              </h5>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-emerald-500 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-semibold text-white mb-3">
              Stay Updated with Latest Properties
            </h4>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for exclusive property listings and
              market insights
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-400 text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>&copy; 2024 PlanetX. All rights reserved.</span>
              <span>•</span>
              <Link
                href="/privacy"
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                href="/terms"
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <span>•</span>
              <Link
                href="/sitemap"
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Made with love in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
}
