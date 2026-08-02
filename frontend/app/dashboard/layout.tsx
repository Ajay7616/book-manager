import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-[#F0F0EA]">
            <Navbar />
            <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}