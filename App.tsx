import React, { useState, useEffect } from 'react';
import { Globe, Mail, ArrowRight, Menu, X, GraduationCap, Award, Briefcase, Code2, Cpu, Terminal } from 'lucide-react';
import Background from './components/Background';
import ProjectsView from './components/ProjectsView';
import BlogView from './components/BlogView';
import CustomCursor from './components/CustomCursor';
import ScrambleText from './components/ScrambleText';
import { ViewState } from './types';

// CONFIGURATION
const ENABLE_BLOG = false; // Set to false to hide the blog section

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    // Reduced delay to ensure content appears quickly
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: ViewState.HOME, label: 'home' },
    { id: ViewState.PROJECTS, label: 'work' },
    { id: ViewState.BLOG, label: 'blog' },
    { id: ViewState.ABOUT, label: 'about' },
  ].filter(item => item.id !== ViewState.BLOG || ENABLE_BLOG);

  return (
    <div className="relative min-h-screen flex flex-col text-theme-text font-sans selection:bg-theme-accent/30 selection:text-white overflow-x-hidden">
      <Background currentView={currentView} />
      <CustomCursor />
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md bg-theme-bg/50 border-b border-white/5 transition-all duration-300">
        <div className="text-lg font-mono font-bold tracking-tight flex items-center gap-2 cursor-hover group z-50" onClick={() => setCurrentView(ViewState.HOME)}>
            <div className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-accent opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-theme-accent"></span>
            </div>
            <span className="group-hover:text-theme-accent transition-colors">notbrian.me</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`group relative text-sm font-mono transition-colors duration-300 cursor-hover ${currentView === item.id ? 'text-theme-accent' : 'text-theme-muted hover:text-white'}`}
                >
                    <span className="absolute -left-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-theme-accent font-bold">/</span>
                    {item.label}
                </button>
            ))}
        </div>

        <button 
            onClick={() => setCurrentView(ViewState.CONTACT)}
            className="hidden md:flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-white text-xs font-mono lowercase hover:bg-theme-accent hover:border-theme-accent transition-all duration-300 cursor-hover rounded-sm group"
        >
            <span className="group-hover:hidden">contact</span>
            <span className="hidden group-hover:inline">say hello</span>
            <Mail size={12} className="group-hover:rotate-12 transition-transform" />
        </button>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-50 p-2 text-white bg-white/5 rounded-sm border border-white/10 cursor-hover"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-theme-bg/95 backdrop-blur-2xl transition-all duration-500 md:hidden overflow-y-auto ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="min-h-full w-full flex flex-col justify-center items-center py-24">
            <div className="flex flex-col gap-8 w-full px-12 text-center">
                {navItems.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id)}
                        style={{ transitionDelay: `${index * 50}ms` }}
                        className={`text-3xl font-mono font-bold lowercase transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${currentView === item.id ? 'text-theme-accent' : 'text-white'}`}
                    >
                        {item.label}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentView(ViewState.CONTACT)}
                    style={{ transitionDelay: `${navItems.length * 50}ms` }}
                    className={`text-3xl font-mono font-bold lowercase transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${currentView === ViewState.CONTACT ? 'text-theme-accent' : 'text-white'}`}
                >
                    contact
                </button>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div key={currentView} className="animate-fade-in-up w-full">
        {/* VIEW: HOME */}
        {currentView === ViewState.HOME && (
            <div className="min-h-[70vh] flex flex-col justify-center relative z-10">
                <div className="mb-12">
                     <div className="inline-flex items-center gap-3 px-4 py-2 bg-theme-surface/80 border border-theme-accent/20 backdrop-blur-sm">
                        <Code2 size={14} className="text-theme-accent" />
                        <span className="text-xs font-mono text-theme-accent uppercase tracking-widest">
                            <ScrambleText text="Hello Stranger!" />
                        </span>
                        <span className="w-1.5 h-1.5 bg-theme-accent rounded-full animate-pulse"></span>
                    </div>
                </div>

                <div className="space-y-2 mb-10">
                    <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-white leading-[0.85] select-none">
                        <div className="flex flex-col">
                            <span className="block opacity-90"><ScrambleText text="VU ANH" /></span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-theme-accent via-theme-secondary to-theme-accent animate-gradient-x">
                                <ScrambleText text="MINH LE" delay={500} />
                            </span>
                        </div>
                    </h1>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-start max-w-4xl">
                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-theme-accent via-theme-accent/50 to-transparent"></div>
                    
                    <div className="space-y-8">
                        <p className="text-xl md:text-2xl text-theme-muted font-light leading-relaxed">
                            Building intelligent systems at the intersection of <span className="text-white font-medium">Statistics</span> and <span className="text-white font-medium">Computer Engineering</span>.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 font-mono text-xs md:text-sm text-theme-muted">
                            <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/5 rounded hover:border-theme-accent/50 transition-colors">
                                <Cpu size={14} /> Prev. HS Intern @ Microsoft
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/5 rounded hover:border-theme-accent/50 transition-colors">
                                <Globe size={14} /> Jackson Reed HS '26
                            </div>
                            <a 
                                href="https://www.linkedin.com/in/minhlevu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/5 rounded hover:border-theme-accent/50 transition-colors cursor-hover"
                            >
                                <span className="text-theme-accent">linkedin</span> /in/minhlevu
                            </a>
                        </div>

                        <div className="flex gap-6 pt-4">
                            <button 
                                onClick={() => setCurrentView(ViewState.PROJECTS)}
                                className="group px-8 py-4 bg-white text-black font-bold font-mono uppercase tracking-wider hover:bg-theme-accent hover:text-white transition-all cursor-hover flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            >
                                View Work
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* VIEW: PROJECTS */}
        {currentView === ViewState.PROJECTS && (
            <ProjectsView />
        )}

        {/* VIEW: BLOG */}
        {currentView === ViewState.BLOG && ENABLE_BLOG && (
            <BlogView />
        )}

        {/* VIEW: ABOUT */}
        {currentView === ViewState.ABOUT && (
             <div className="animate-zoom-in max-w-7xl mx-auto py-12">
                 
                 <div className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-2 h-2 bg-theme-accent rounded-full animate-pulse"></span>
                        <span className="text-xs font-mono text-theme-accent uppercase tracking-widest">
                            <ScrambleText text="About Profile" />
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 leading-[0.9]">
                        Driven by <span className="text-theme-accent">Data</span>,<br/>Powered by <span className="text-theme-secondary">Innovation</span>.
                    </h1>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 border-t border-white/10 pt-16">
                     
                     <div className="lg:col-span-4 space-y-12">
                         <div>
                            <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                                <Briefcase size={16} /> Experience Log
                             </h3>
                             <div className="space-y-0 border-l border-white/10">
                                {[
                                  { role: "AI Intern", company: "Microsoft", date: "2025" },
                                  { role: "Help Desk Technician", company: "DC Public Schools", date: "2024 - Present" },
                                  { role: "Student Consultant", company: "UDC", date: "2024 - Present" },
                                  { role: "Student Fellow", company: "Asian American LEAD", date: "2025 - Present" },
                                ].map((job, idx) => (
                                   <div key={idx} className="pl-6 pb-8 relative group">
                                      <span className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg-theme-bg border border-theme-muted rounded-full group-hover:bg-theme-accent group-hover:border-theme-accent transition-colors"></span>
                                      <div className="text-white font-bold text-lg group-hover:text-theme-accent transition-colors">{job.role}</div>
                                      <div className="text-sm text-theme-muted mb-1">{job.company}</div>
                                      <div className="text-xs font-mono text-gray-500 uppercase">{job.date}</div>
                                   </div>
                                ))}
                             </div>
                         </div>

                         <div>
                            <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                                <GraduationCap size={16} /> Education
                             </h3>
                             <div className="space-y-6">
                                <div>
                                    <div className="text-white font-bold">Jackson Reed High School</div>
                                    <div className="text-theme-muted text-sm font-mono">Class of 2026 • Grade 12</div>
                                </div>
                                <div>
                                    <div className="text-white font-bold">Johns Hopkins University</div>
                                    <div className="text-theme-muted text-sm font-mono">Engineering Innovation</div>
                                </div>
                             </div>
                         </div>
                     </div>

                     <div className="lg:col-span-8 space-y-12">
                         <div className="space-y-8 text-xl md:text-2xl text-theme-muted font-light leading-relaxed">
                             <p>
                                 <span className="text-white">I don't just write code; I build systems.</span> As a senior at Jackson Reed High School, I want to bridge the gap between statistics and practical computer engineering.
                             </p>
                             <p>
                                 My work focuses on creating <span className="text-theme-accent decoration-1 underline decoration-theme-accent/30 underline-offset-4">human-centric AI solutions</span>. Whether it's developing RAG chatbots for Microsoft or troubleshooting issues at the Help Desk, I aim for impact.
                             </p>
                             <p>
                                 Beyond this, I help with projects relating to motion capture in university labs and design fundraising products. I believe engineering is fundamentally about solving people problems.
                             </p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                             <div className="p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                                 <Award className="text-theme-secondary mb-4" size={24} />
                                 <h4 className="text-white font-bold mb-2">Certifications</h4>
                                 <ul className="space-y-2 text-sm text-theme-muted">
                                     <li>Microsoft Certified: Azure Fundamentals</li>
                                     {/* <li>AP Scholar with Distinction</li> */}
                                 </ul>
                             </div>
                             <div className="p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                                 <Terminal className="text-theme-accent mb-4" size={24} />
                                 <h4 className="text-white font-bold mb-2">Technical Arsenal</h4>
                                 <div className="flex flex-wrap gap-2">
                                     {['Python', 'Azure', 'React', 'CAD', 'Vite', 'Firebase', 'JavaScript'].map(skill => (
                                         <span key={skill} className="text-xs font-mono text-gray-400 border border-white/10 px-2 py-1">
                                             {skill}
                                         </span>
                                     ))}
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        )}

        {/* VIEW: CONTACT */}
        {currentView === ViewState.CONTACT && (
             <div className="min-h-[70vh] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-500">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-mono text-white">Available for internships</span>
                        </div>
                        
                        <h1 className="text-7xl md:text-9xl font-display font-bold text-white tracking-tighter leading-none">
                            Let's<br/>Talk.
                        </h1>
                        
                        <div className="space-y-2">
                             <p className="text-theme-muted font-mono text-sm uppercase tracking-widest">Email Address</p>
                             <a href="mailto:iambrian@duck.com" className="block text-2xl md:text-4xl font-bold text-white hover:text-theme-accent transition-colors">
                                iambrian@duck.com
                             </a>
                        </div>
                    </div>

                    <div className="lg:pl-12 border-l border-white/10 space-y-12">
                        <p className="text-xl text-theme-muted font-light leading-relaxed">
                            I'm currently exploring opportunities in Software Engineering, AI Research, and Data Science for Fall of 2026.
                        </p>
                        
                        <div className="space-y-6">
                            {[
                                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/minhlevu/' },
                                { name: 'GitHub', url: 'https://github.com/iambrianle' },
                                { name: 'Twitter', url: 'https://twitter.com/' }
                            ].map((social) => (
                                <a 
                                    key={social.name} 
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="group flex items-center justify-between py-4 border-b border-white/10 hover:border-white transition-colors cursor-hover"
                                >
                                    <span className="text-2xl font-display font-bold text-white">{social.name}</span>
                                    <ArrowRight className="text-theme-muted group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>
                 </div>
             </div>
        )}
        </div>
      </main>

      <footer className="relative w-full py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-theme-muted border-t border-white/5 bg-theme-bg mt-auto z-10">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
             <span>© {new Date().getFullYear()} Vu Anh Minh Le</span>
          </div>
          <div className="flex items-center gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Washington, D.C. [38.9072° N, 77.0369° W]</span>
          </div>
      </footer>
    </div>
  );
};

export default App;