import Navbar from "@/components/Navbar";
import PNGtoWebPConverter from "@/section/converter";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="pt-6">
        <PNGtoWebPConverter />
      </main>
    </div>
  );
}
