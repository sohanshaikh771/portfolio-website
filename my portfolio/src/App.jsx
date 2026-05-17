import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mail, ExternalLink, Code2, Terminal, Database, Layout, Download, ChevronRight } from 'lucide-react'
import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'

const profileImage = "/profile.jpeg"

const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function App() {
  const [activeSection, setActiveSection] = useState('Home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top >= 0 && rect.top <= window.innerHeight / 2
        }
        return false
      })
      if (current) setActiveSection(current.charAt(0).toUpperCase() + current.slice(1))
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050A05] text-slate-300 font-sans selection:bg-green-500/30 overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-[#050A05] to-[#050A05]"></div>
        <div 
          className="absolute w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter text-white"
          >
            DM<span className="text-green-500">.</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`text-sm font-medium transition-colors hover:text-green-400 ${activeSection === item ? 'text-green-500' : 'text-slate-400'}`}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050A05]/95 backdrop-blur-xl pt-24 px-6 flex flex-col items-center space-y-8 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-medium text-slate-300 hover:text-green-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificatesSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-block px-4 py-2 rounded-full glass border-green-500/20 text-green-400 text-sm font-medium">
            Available for Internships & Freelance
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
              Crafting Digital <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                Experiences
              </span>
            </h1>
            <h2 className="text-xl text-slate-400 font-light">
              DHOBI MAHAMMADSOHAN MAKSUDBHAI
            </h2>
            <p className="text-lg text-slate-400 max-w-xl font-light leading-relaxed">
              Computer Engineering Student • Full Stack Developer • Future Tech Builder. 
              I transform ideas into powerful, scalable, and visually stunning digital products.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projects" className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-400 text-black font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
              View Projects <ChevronRight size={18} />
            </a>
            <a href="#contact" className="px-8 py-3 rounded-full glass hover:bg-white/5 text-white font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border-white/10">
              <Download size={18} /> Resume
            </a>
          </div>

          <div className="flex gap-6 pt-8 border-t border-white/5">
            {[FiGithub, FiLinkedin, FiInstagram].map((Icon, i) => (
              <a key={i} href="#" className="text-slate-400 hover:text-green-400 transition-colors hover:scale-110">
                <Icon size={24} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full p-2 bg-gradient-to-tr from-green-500/20 to-transparent flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-green-500/20 animate-spin-slow"></div>
            <div className="w-full h-full rounded-full overflow-hidden border border-white/10 glass">
              {/* Replace with actual image */}
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-black/20">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">About Me</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 text-lg text-slate-300 leading-relaxed text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <p className="mb-6 relative z-10">
            I am a Computer Engineering student with a strong interest in web development, frontend design, backend systems, modern UI/UX, and future technologies. I enjoy learning new tools, building real-world projects, and continuously improving my development skills.
          </p>
          <p className="relative z-10">
            My goal is to become a highly skilled developer capable of creating impactful digital products that combine performance, scalability, creativity, and premium user experience.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
          {[
            { label: 'Projects Built', value: '10+' },
            { label: 'Technologies', value: '15+' },
            { label: 'Coding Hours', value: '1000+' },
            { label: 'Passion Level', value: '100%' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl border-white/5 hover:border-green-500/30 transition-colors"
            >
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-green-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Terminal className="w-6 h-6 text-green-400" />,
      skills: ["Java", "Python", "JavaScript", "C", "C++"]
    },
    {
      title: "Frontend",
      icon: <Layout className="w-6 h-6 text-green-400" />,
      skills: ["HTML5", "CSS3", "Tailwind CSS", "React.js"]
    },
    {
      title: "Backend & DB",
      icon: <Database className="w-6 h-6 text-green-400" />,
      skills: ["Node.js", "Express.js", "MongoDB", "MySQL"]
    },
    {
      title: "Tools",
      icon: <Code2 className="w-6 h-6 text-green-400" />,
      skills: ["Git", "GitHub", "VS Code", "Figma"]
    }
  ]

  return (
    <section id="skills" className="py-32 px-6 lg:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Technical Arsenal</h2>
          <div className="w-20 h-1 bg-green-500 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="p-3 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.skills.map((skill, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const projects = [
    {
      title: "ALSayyada Luxury",
      description: "A premium Islamic luxury fashion e-commerce platform with elegant UI, WhatsApp integration, and modern responsive design.",
      tags: ["React", "Tailwind", "Node.js"],
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "AI Chat Application",
      description: "A modern AI-powered chat interface with responsive UI and real-time interaction capabilities.",
      tags: ["React", "OpenAI API", "Tailwind"],
      image: "https://images.unsplash.com/photo-1676299081847-824916de030a?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Student Management System",
      description: "A full-stack student data management system with authentication and database integration.",
      tags: ["Java", "MySQL", "JDBC"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Modern Portfolio",
      description: "A futuristic personal portfolio website with animations and responsive design.",
      tags: ["React", "Framer Motion", "Tailwind"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
    }
  ]

  return (
    <section id="projects" className="py-32 px-6 lg:px-12 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-green-500 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 mb-6 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href="#" className="flex items-center gap-2 text-sm font-medium text-white hover:text-green-400 transition-colors">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                    <FiGithub size={16} /> Source
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  const experiences = [
    {
      title: "Diploma/Bachelor in Computer Engineering",
      role: "Student",
      period: "Present",
      description: "Passionate learner focused on software development, web technologies, and modern computing systems. Consistently engaging in coding practice and problem-solving."
    },
    {
      title: "Self-learning Full Stack Development",
      role: "Independent Developer",
      period: "Continuous",
      description: "Building modern web applications, exploring new frameworks, and implementing UI/UX best practices through personal projects."
    }
  ]

  return (
    <section id="experience" className="py-32 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Journey</h2>
          <div className="w-20 h-1 bg-green-500 rounded-full"></div>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050A05] bg-green-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(34,197,94,0.4)] z-10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 md:p-8 hover:border-green-500/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <h3 className="font-bold text-xl text-white">{exp.title}</h3>
                  <span className="text-sm font-medium text-green-400 bg-green-500/10 px-3 py-1 rounded-full whitespace-nowrap">{exp.period}</span>
                </div>
                <div className="text-slate-300 font-medium mb-3">{exp.role}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificatesSection() {
  const certificates = [
    "Java Programming",
    "Web Development",
    "Python Basics",
    "UI/UX Fundamentals"
  ]

  return (
    <section id="certificates" className="py-32 px-6 lg:px-12 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-green-500 rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex flex-col items-center text-center group hover:border-green-500/50 hover:bg-green-500/5 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-500/20 transition-all">
                <Code2 className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                {cert}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 lg:px-12 bg-black/20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's build <br/>something <span className="text-green-400">great.</span></h2>
            <p className="text-slate-400 text-lg mb-12 max-w-md">
              I'm currently looking for new opportunities, internships, and freelance projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="space-y-6">
              <a href="mailto:sohanshaikh771@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-green-400 transition-colors group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Email Me</div>
                  <div className="font-medium">sohanshaikh771@gmail.com</div>
                </div>
              </a>
              {/* Add more social links here if needed */}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-colors" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-colors" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Message</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-colors resize-none" placeholder="Your message here..."></textarea>
            </div>
            <button className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 px-6 lg:px-12 border-t border-white/5 text-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-2xl font-bold tracking-tighter text-white">
          DM<span className="text-green-500">.</span>
        </div>
        <p className="text-slate-500 text-sm">
          Designed & Developed with Passion by <span className="text-slate-300">DHOBI MAHAMMADSOHAN MAKSUDBHAI</span>
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-slate-500 hover:text-green-400 transition-colors"><FiGithub size={20} /></a>
          <a href="#" className="text-slate-500 hover:text-green-400 transition-colors"><FiLinkedin size={20} /></a>
          <a href="#" className="text-slate-500 hover:text-green-400 transition-colors"><FiInstagram size={20} /></a>
        </div>
      </div>
    </footer>
  )
}
