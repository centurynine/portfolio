import { Navbar } from "@/components/Navbar";
import { MyAppClient } from "./MyAppClient";

export const metadata = {
  title: "Apps Privacy | Portfolio",
  description: "Privacy policies and store links for CenturyNine apps.",
};

export default function AppPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <MyAppClient />
      </main>
    </>
  );
}
