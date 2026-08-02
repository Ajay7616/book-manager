import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Link from "next/link";
import { BookOpen, Library, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f0f0ea]">
      <Navbar />
      <main className="flex items-center justify-center px-5 sm:px-8 py-16 sm:py-24">
        <div className="w-full max-w-5xl text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#2E7D5B] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen size={16} />
              Your Reading Companion
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              Your Personal{" "}
              <span className="text-[#2E7D5B]">
                Book Manager
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed">
              Track your reading journey, manage your collection,
              and rediscover your favorite books in one simple place.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link
                href="/signup"
                className="bg-[#2E7D5B] text-white px-7 py-3 rounded-xl font-medium
                  hover:bg-[#25684B] transition"
              >
                Get Started
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
              <FeatureCard
                icon={<Library size={22} />}
                title="Manage Books"
                text="Add, edit, and organize your personal collection easily."
                color="green"
              />
              <FeatureCard
                icon={<BookOpen size={22} />}
                title="Track Progress"
                text="Move books from your wishlist to currently reading and completed."
                color="green"
              />
              <FeatureCard
                icon={<BarChart3 size={22} />}
                title="Reading Insights"
                text="Understand your habits and stay motivated with reading goals."
                color="orange"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, text, color }) {
  return (
    <div 
      className="bg-white p-6 rounded-2xl text-left border border-[#E8F5E9]
      shadow-lg hover:shadow-md hover:-translate-y-1 transition-all"
    >
      <div
        className={`w-25 h-11 flex items-center justify-center rounded-xl mb-4
          ${color === "orange"
            ? "bg-[#FFF0E8] text-[#FF8A3D]"
            : "bg-[#E8F5E9] text-[#2E7D5B]"
          }
        `}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );
}