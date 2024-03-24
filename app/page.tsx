import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Hero from "@/components/pages/hero"
import FeatureCards from "@/components/pages/feature-cards"
import Features from "@/components/pages/features"
export default async function Home() {
  
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/mangas");
  }

  return (
    <main>
      <Hero />
      <FeatureCards />
      <Features />
    </main>
  );
}
