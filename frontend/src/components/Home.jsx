import { useInView } from 'react-intersection-observer';
import AboutBg from '../Assets/about-bg.png';
import EventsHomeBg from '../Assets/events-home-bg.png';
import ProjectHomeBg from '../Assets/project-home-bg.png';

function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [eventsRef, eventsInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  return (
    <div className="bg-black text-white font-sans h-full overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
  <iframe
    className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-75"
    src="https://www.youtube.com/embed/ASSI9TRgQlg?autoplay=1&mute=1&loop=1&playlist=ASSI9TRgQlg&controls=0&modestbranding=1&rel=0"
    
    allow="autoplay; fullscreen"
  />
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
</div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className={`flex justify-center items-center w-full h-screen relative z-[5] ${
          heroInView ? 'animate-slide-down' : 'opacity-0'
        }`}
      >
        <div className="text-center mt-[-5vh] px-4">
          <h1 className="text-4xl md:text-8xl font-bold">CyFuse</h1>
          <h2 className="text-lg md:text-2xl mt-4">Dare to Innovate, Unite to Create</h2>
        </div>
      </div>

      {/* About Section */}
      <div
        ref={aboutRef}
        className={`flex flex-col md:flex-row justify-center items-center w-full h-auto py-10 md:h-screen relative bg-black px-4 ${
          aboutInView ? 'animate-fade-left' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col justify-center items-start z-[5]">
          <h1 className="text-2xl md:text-3xl mx-2">About Us</h1>
          <span className="mx-2 my-2 p-3 md:p-4 border border-white rounded-full cursor-pointer transition-all duration-1000 hover:bg-white hover:text-black hover:scale-110">
            Learn More
          </span>
        </div>
        <div className="flex justify-center items-center w-full md:w-1/3 h-auto md:h-1/2 min-w-[160px] min-h-[320px] ml-0 md:ml-12 p-6 md:p-16 text-sm md:text-lg bg-gradient-to-br from-white/10 to-white/30 shadow-lg backdrop-blur-md rounded-2xl z-[5]">
          <p>
            An ultimate tech club where we're all about fusing diverse technologies and
            domains to create groundbreaking innovations!
          </p>
        </div>
        <img
          src={AboutBg}
          className="absolute w-4/5 md:w-2/5 right-0 top-[-2vh] min-w-[320px] z-[2]"
          alt="About Background"
        />
      </div>

      {/* Projects Section */}
      <div
        ref={projectsRef}
        className={`flex flex-col md:flex-row justify-center items-center w-full h-auto py-10 md:h-screen relative px-4 ${
          projectsInView ? 'animate-zoom-in' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-2xl md:text-3xl mx-2">Projects</h1>
          <span className="mx-2 my-2 p-3 md:p-4 border border-white rounded-full cursor-pointer transition-all duration-1000 hover:bg-white hover:text-black hover:scale-110">
            View More
          </span>
        </div>
        <div className="flex justify-center items-center w-full md:w-1/3 h-auto md:h-1/3 min-w-[280px] ml-0 md:ml-5 p-6 md:p-12">
          <img src={ProjectHomeBg} alt="Project Background" />
        </div>
      </div>

      {/* Events Section */}
      <div
        ref={eventsRef}
        className={`flex flex-col md:flex-row justify-center items-center w-full h-auto py-10 md:h-screen relative px-4 ${
          eventsInView ? 'animate-fade-right' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-2xl md:text-3xl mx-2">Events</h1>
          <span className="mx-2 my-2 p-3 md:p-4 border border-white rounded-full cursor-pointer transition-all duration-1000 hover:bg-white hover:text-black hover:scale-110">
            View More
          </span>
        </div>
        <div className="flex justify-center items-center w-full md:w-1/3 h-auto md:h-1/3 min-w-[280px] ml-0 md:ml-5 p-6 md:p-12">
          <img src={EventsHomeBg} alt="Events Background" />
        </div>
      </div>
    </div>
  );
}

export default Home;
