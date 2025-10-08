import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            // "url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop')",
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDOSokJcDBcUpvCx1U0W37W3_RE8os_gkS1sgM39MSF8lnb0VDmbi_uIo4nrgdDIPpzqNyX64B58BiFakaF6Uw3vzwfTmssPX0M-YFV2WM2x2-fuF3K03Z1qODInsNRGaarz1wMXQ8YH3kvNhZ1Uptr22S4bfjxVMkA-zs1UCWL9KLrygKNEmUOaFba_7DdmDaLE0kqvXC7UHIfST3HaE62sYRUJxLeoUPR4MIYcCQ_4qu_4eN9pnpyKP6xYa1L81rxCsUBruiDwKNh')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Connect, Contribute, Change the World
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-8">
          ImpactConnect bridges the gap between non-profit organizations and
          individuals eager to make a difference. Whether you're looking to
          donate, volunteer your time, or find a cause that resonates, we're
          here to help you create a meaningful impact.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="h-12 px-6 rounded-lg bg-[#1193d4] text-white font-bold text-base hover:opacity-90">
            Explore Projects
          </button>
          <button
            onClick={() => navigate("/register")}
            className="h-12 px-6 rounded-lg bg-white/20 text-white font-bold text-base backdrop-blur-sm hover:bg-white/30"
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
