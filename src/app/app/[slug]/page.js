import { Navbar } from "@/components/Navbar";
import { myApps } from "@/data/MyAppData";
import { notFound } from "next/navigation";
import { MyAppClient } from "../MyAppClient";

export function generateStaticParams() {
  return myApps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const app = myApps.find((item) => item.slug === slug);

  if (!app) {
    return {
      title: "My Apps Privacy | Portfolio",
    };
  }

  return {
    title: `${app.name} Privacy Policy | Portfolio`,
    description: app.summary,
  };
}

export default async function AppSlugPage({ params }) {
  const { slug } = await params;
  const app = myApps.find((item) => item.slug === slug);

  if (!app) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <MyAppClient initialSlug={app.slug} />
      </main>
    </>
  );
}
