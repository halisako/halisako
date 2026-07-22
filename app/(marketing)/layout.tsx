import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

/**
 * Chrome for the marketing site only (/, /products, /technology, /vision,
 * /waitlist). Product experiences like /chess2fight live outside this
 * route group and bring their own navigation — see app/chess2fight/layout.tsx.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
