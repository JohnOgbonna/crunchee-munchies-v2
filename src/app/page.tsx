import AboutUsHome from "./homepage/aboutUs";
import Featured from "./homepage/featured";
import Hero from "./homepage/hero";

export default function Home() {
  return (
    <div className={` text-slate-700  mx-auto`}>
      <Hero />
      <Featured />
      <AboutUsHome />
    </div>
  );
}
