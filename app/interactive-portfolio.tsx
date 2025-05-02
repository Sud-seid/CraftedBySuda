"use client";
import { FaTelegramPlane } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiFigma, SiAdobeillustrator, SiAdobephotoshop, SiSketch, SiBlender } from 'react-icons/si';
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import {
  Palette,
  Layers,
  PenTool,
  ImageIcon,
  Monitor,
  Figma,
  Mail,
  Menu,
  X,
  ArrowRight,
  Download
} from "lucide-react";
import { motion } from "framer-motion";

export default function InteractivePortfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);
  const projects = {
    posters: [
      { src: "/pst1.png", alt: "Poster 1", width: 600, height: 400 },
      { src: "/pst2.png", alt: "Poster 2", width: 600, height: 400 }
    ],
    logos: [
      { src: "/logo1.png", alt: "Logo 1", width: 300, height: 300 },
      { src: "/logo2.png", alt: "Logo 2", width: 300, height: 300 }
    ],
    branding: [
      { src: "/branding1.png", alt: "Branding 1", width: 600, height: 400 },
      { src: "/branding2.png", alt: "Branding 2", width: 600, height: 400 }
    ],
    ui: [
      { src: "/ui1.png", alt: "UI Design 1", width: 600, height: 400 },
      { src: "/ui2.png", alt: "UI Design 2", width: 600, height: 400 }
    ]
  };
  useEffect(() => {
    setIsClient(true); 
    
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll(".particle");

      particles.forEach((particle) => {
        const particleElement = particle as HTMLElement;
        const speed = 0.3 + Math.random() * 0.4;
        const angle = Math.random() * Math.PI * 2;
        const xVelocity = Math.cos(angle) * speed;
        const yVelocity = Math.sin(angle) * speed;

        let x = Number.parseFloat(particleElement.getAttribute("data-x") || "0");
        let y = Number.parseFloat(particleElement.getAttribute("data-y") || "0");

        const moveParticle = () => {
          x += xVelocity;
          y += yVelocity;

          if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            const height = window.innerHeight;

            if (x < -10) x = width + 10;
            if (x > width + 10) x = -10;
            if (y < -10) y = height + 10;
            if (y > height + 10) y = -10;
          }

          particleElement.setAttribute("data-x", x.toString());
          particleElement.setAttribute("data-y", y.toString());
          particleElement.style.transform = `translate(${x}px, ${y}px)`;
          requestAnimationFrame(moveParticle);
        };
        moveParticle();
      });
    }
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Suda-Creative-Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Download failed:', error);
      if (typeof window !== 'undefined') {
        window.open('/resume.pdf', '_blank');
      }
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };


  const getInitialParticlePositions = () => {
    if (typeof window === 'undefined') {
      return Array.from({ length: 100 }).map(() => ({ x: 0, y: 0 }));
    }
    return Array.from({ length: 100 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
     <div ref={particlesRef} className="fixed inset-0 pointer-events-none overflow-hidden">
  {isClient && Array.from({ length: 100 }).map((_, i) => {
    const positions = getInitialParticlePositions();
    return (
      <motion.div
        key={i}
        className="particle absolute w-1 h-1 bg-white rounded-full opacity-70"
        style={{
          left: 0,
          top: 0,
          opacity: Math.random() * 0.5 + 0.2,
        }}
        initial={{ 
          x: positions[i]?.x || 0, 
          y: positions[i]?.y || 0 
        }}
        animate={{
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
        }}
        transition={{
          duration: Math.random() * 10 + 10, // 10-20 seconds
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
    );
  })}
</div>
      
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-[#a855f7] font-bold text-2xl">SUDA</div>

          <nav className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full">
              <ul className="flex space-x-8">
                {["Home", "About", "Projects", "Services", "Process", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-white/80 hover:text-[#a855f7] transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <button 
  className="px-4 py-2 bg-[#a855f7] text-white rounded-full text-sm font-medium hidden md:block hover:bg-[#9333ea] transition-colors"
  onClick={() => window.open('mailto:semeriyaseid@gmail.com?subject=Hiring%20Inquiry&body=Hello%20Semeriya,', '_blank')}
>
  Hire Me
</button>

          {/* Mobile menu*/}
          <button className="text-white md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 pt-20 md:hidden">
          <div className="container mx-auto px-6 py-8">
            <ul className="flex flex-col space-y-6">
              {["Home", "About", "Projects", "Services", "Process", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-white/80 hover:text-[#a855f7] transition-colors text-xl font-medium block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <button 
  className="mt-8 px-6 py-3 bg-[#a855f7] text-white rounded-full text-base font-medium w-full"
  onClick={() => window.location.href = "mailto:semeriyaseid@gmail.com"}
>
  Hire Me
</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-white text-xl font-medium mb-2">SEMERIYA SEID</h1>

          <div className="relative inline-block my-6">
            {/* Main Text */}
            <div className="relative inline-block">
              <div className="text-white text-6xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-4 relative z-10">
                <div className="relative inline-block">
                  <span className="block transform hover:translate-y-[-5px] transition-transform">GRAPHIC</span>
                </div>
                <div className="relative inline-block">
                  <span
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] to-[#ec4899] transform hover:translate-y-[-5px] transition-transform"
                    style={{
                      textShadow: "0 10px 20px rgba(168, 85, 247, 0.3), 0 6px 6px rgba(168, 85, 247, 0.2)",
                    }}
                  >
                    DESIGNER
                  </span>
                </div>
              </div>

              {/* Graphic design icons around text*/}
              <motion.div
                className="absolute top-[-20px] left-[-20px] text-[#a855f7]"
                animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
              >
                <Palette size={24} />
              </motion.div>
              <motion.div
                className="absolute top-[-10px] right-[-20px] text-[#a855f7]"
                animate={{ x: [0, -5, 0], y: [0, -3, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
              >
                <PenTool size={24} />
              </motion.div>
              <motion.div
                className="absolute bottom-[0px] right-[10px] text-[#a855f7]"
                animate={{ x: [0, -3, 0], y: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3.5, ease: "easeInOut" }}
              >
                <Layers size={24} />
              </motion.div>
              <motion.div
                className="absolute bottom-[0px] left-[10px] text-[#a855f7]"
                animate={{ x: [0, 5, 0], y: [0, 3, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4.5, ease: "easeInOut" }}
              >
                <ImageIcon size={24} />
              </motion.div>
            </div>
          </div>

          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Transforming ideas into stunning visuals with the power of creativity and modern design
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a href="#projects" className="px-8 py-3 bg-[#a855f7] text-white rounded-full text-base font-medium flex items-center group">
  View My Work
  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
</a>


            <button 
        onClick={handleDownload}
        disabled={isDownloading}
        className={`px-8 py-3 bg-transparent border ${
          isDownloading ? 'border-[#a855f7]' : 'border-white/30'
        } text-white rounded-full text-base font-medium flex items-center group hover:border-[#a855f7]/50 transition-colors`}
      >
        {isDownloading ? (
          <span className="flex items-center">
            <svg className="animate-spin mr-2 w-4 h-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Downloading...
          </span>
        ) : (
          <span className="flex items-center">
            <Download className="mr-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            Download Resume
          </span>
        )}
      </button>
          </div>
        </div>
      </section>

      {/*Tools Section */}
      <div className="py-12 overflow-hidden relative">
  <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>
  <motion.div
    className="flex space-x-28 items-center" 
    animate={{ x: [0, -1500] }}
    transition={{
      repeat: Number.POSITIVE_INFINITY,
      duration: 30,
      ease: "linear",
    }}
  >
    {[...Array(2)].map((_, setIndex) => (
      <div key={setIndex} className="flex space-x-24 items-center"> 
        {/* Figma */}
        <motion.div className="text-[#a259ff] hover:text-[#a855f7] w-20 h-20 flex items-center justify-center text-4xl">
          <SiFigma />
        </motion.div>

        {/* Illustrator */}
        <motion.div className="text-[#ff9a00] hover:text-[#a855f7] w-20 h-20 flex items-center justify-center text-4xl">
          <SiAdobeillustrator />
        </motion.div>

        {/* Photoshop */}
        <motion.div className="text-[#00c8ff] hover:text-[#a855f7] w-20 h-20 flex items-center justify-center text-4xl">
          <SiAdobephotoshop />
        </motion.div>

        {/* Sketch */}
        <motion.div className="text-[#fdad00] hover:text-[#a855f7] w-20 h-20 flex items-center justify-center text-4xl">
          <SiSketch />
        </motion.div>

        {/* Blender */}
        <motion.div className="text-[#e87d0d] hover:text-[#a855f7] w-20 h-20 flex items-center justify-center text-4xl">
          <SiBlender />
        </motion.div>
      </div>
    ))}
  </motion.div>
</div>




      {/* About Section */}
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-[350px] rounded-2xl overflow-hidden">
            <Image
              src="/about.png"
              alt="Picture of Suda"
              width={800}
              height={500}
              className="rounded-2xl object-cover"
              priority
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">I'm SUDA, a Passionate Graphic Designer</h3>
            <p className="text-white/70 mb-4">
              I'm a creative mind currently based in Ethiopia, with a heart full of ideas and a tablet full of sketches.
              I blend modern aesthetics with thoughtful design to bring brands to life — whether it's a bold logo, sleek UI, or expressive illustration.
            </p>
            <p className="text-white/70 mb-6">
              My journey started with a simple pencil and a dream, and now I help others shape their identity visually. Whether you're a startup or a personal brand, I'm here to make you look *unforgettable*.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div>
                <h4 className="text-[#a855f7] font-bold mb-2">Skills</h4>
                <ul className="text-white/70 space-y-2">
                  <li>Branding & Identity</li>
                  <li>UI/UX Design</li>
                  <li>Digital Illustration</li>
                  <li>Layout & Typography</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#a855f7] font-bold mb-2">Tools I Use</h4>
                <ul className="text-white/70 space-y-2">
                  <li>Figma & Adobe XD</li>
                  <li>Photoshop & Illustrator</li>
                  <li>Procreate (for digital art)</li>
                  <li>Canva (for quick turnarounds)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Recent Work</h2>
        <p className="text-white/70 text-center mb-16 max-w-2xl mx-auto">
          A brief showcase of the amazing projects I've built recently.
        </p>

        <div className="space-y-24">
          {/* Posters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Creative Posters</h3>
              <p className="text-white/70 mb-4">
                Eye-catching posters designed to visually communicate ideas, events, and brands in vibrant layouts.
              </p>
              <p className="text-white/70 mb-6">Used for both digital campaigns and print advertising.</p>
              <button className="px-6 py-2 bg-[#a855f7] text-white rounded-md text-sm font-medium">
                View Designs
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {projects.posters.map((image, i) => (
                <div key={i} className="overflow-hidden rounded-xl group aspect-video relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-cover scale-125 group-hover:scale-100 transition-transform duration-300 ease-in-out"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Logos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
              {projects.logos.map((image, i) => (
                <div key={i} className="overflow-hidden rounded-xl group aspect-video bg-white p-4 relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-contain scale-110 group-hover:scale-100 transition-transform duration-300 ease-in-out"
                  />
                </div>
              ))}
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold text-white mb-4">Logo Designs</h3>
              <p className="text-white/70 mb-4">
                Minimal, memorable, and meaningful logos for startups, brands, and personal projects.
              </p>
              <p className="text-white/70 mb-6">
                Built with design consistency and visual identity in mind.
              </p>
              <button className="px-6 py-2 bg-[#a855f7] text-white rounded-md text-sm font-medium">
                View Logos
              </button>
            </div>
          </div>

          {/* Branding */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Brand Identity</h3>
              <p className="text-white/70 mb-4">
                Complete branding systems including typography, color palettes, packaging, and tone.
              </p>
              <p className="text-white/70 mb-6">
                Created to help brands stand out with clarity and character.
              </p>
              <button className="px-6 py-2 bg-[#a855f7] text-white rounded-md text-sm font-medium">
                View Branding
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {projects.branding.map((image, i) => (
                <div key={i} className="overflow-hidden rounded-xl group aspect-video relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-cover scale-125 group-hover:scale-100 transition-transform duration-300 ease-in-out"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* UI/UX */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
              {projects.ui.map((image, i) => (
                <div key={i} className="overflow-hidden rounded-xl group aspect-video relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-cover scale-125 group-hover:scale-100 transition-transform duration-300 ease-in-out"
                  />
                </div>
              ))}
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold text-white mb-4">UI/UX Projects</h3>
              <p className="text-white/70 mb-4">
                Beautiful and intuitive interfaces with strong user experience principles.
              </p>
              <p className="text-white/70 mb-6">
                Designed with responsiveness, usability, and accessibility in mind.
              </p>
              <button className="px-6 py-2 bg-[#a855f7] text-white rounded-md text-sm font-medium">
                View UI/UX
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>


      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">My Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Brand Identity",
                desc: "I create comprehensive brand identities that help businesses stand out and connect with their audience.",
                icon: <Palette className="w-10 h-10" />,
              },
              {
                title: "UI/UX Design",
                desc: "I design intuitive and engaging user interfaces that enhance the user experience and drive conversions.",
                icon: <Monitor className="w-10 h-10" />,
              },
              {
                title: "Print Design",
                desc: "From business cards to billboards, I create print materials that make a lasting impression.",
                icon: <ImageIcon className="w-10 h-10" />,
              },
              {
                title: "Digital Illustration",
                desc: "I create custom illustrations that bring your ideas to life and enhance your visual storytelling.",
                icon: <PenTool className="w-10 h-10" />,
              },
              {
                title: "Web Design",
                desc: "I design responsive websites that look great on all devices and help you achieve your business goals.",
                icon: <Figma className="w-10 h-10" />,
              },
              {
                title: "Motion Graphics",
                desc: "I create animated visuals that capture attention and effectively communicate your message.",
                icon: <Layers className="w-10 h-10" />,
              },
            ].map((service, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-white/10 hover:border-[#a855f7]/30 transition-colors"
              >
                <div className="text-[#a855f7] mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/70">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">My Design Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "I start by understanding your business, goals, and target audience.",
              },
              {
                step: "02",
                title: "Concept",
                desc: "I develop initial concepts and ideas based on research and requirements.",
              },
              {
                step: "03",
                title: "Design",
                desc: "I create detailed designs and refine them based on your feedback.",
              },
              {
                step: "04",
                title: "Delivery",
                desc: "I deliver the final designs and provide support for implementation.",
              },
            ].map((process, i) => (
              <div key={i} className="relative">
                <div className="text-[#a855f7] text-5xl font-bold opacity-30 mb-4">{process.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{process.title}</h3>
                <p className="text-white/70">{process.desc}</p>

                {i < 3 && (
                  <div className="hidden md:block absolute top-6 right-0 transform translate-x-1/2">
                    <ArrowRight className="text-[#a855f7]/30 w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-white mb-12 text-center">Get In Touch</h2>

    <div className="max-w-md mx-auto text-center">
      <p className="text-white/70 mb-8">
        Interested in working together? Feel free to reach out through any of these platforms.
      </p>

      <div className="flex justify-center space-x-6 mb-12">
        <a
          href="https://t.me/sud_seid"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-[#a855f7] transition-colors"
        >
          <FaTelegramPlane />
        </a>
        <a
          href="https://github.com/Sud-seid"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-[#a855f7] transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/semeriya-seid-b24b48356/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-[#a855f7] transition-colors"
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:bintabuha753@gmail.com"
          className="text-white/70 hover:text-[#a855f7] transition-colors"
        >
          <FaEnvelope/>
        </a>
      </div>

      <a
        href="mailto:bintabuha753@gmail.com"
        className="px-8 py-3 bg-[#a855f7] text-white rounded-full text-base font-medium inline-flex items-center"
      >
        Send Me an Email
        <ArrowRight className="ml-2 w-4 h-4" />
      </a>
    </div>
  </div>
</section>




      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} SUDA Creative. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
