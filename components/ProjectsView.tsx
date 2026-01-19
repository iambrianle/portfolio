import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/projects';
import ProjectCard from './ProjectCard';
import { ArrowLeft, ArrowUpRight, Code, Layers } from 'lucide-react';
import ScrambleText from './ScrambleText';

const ProjectsView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Detail View (Technical Dossier)
  if (selectedProject) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 min-h-screen">
        <div className="sticky top-24 z-30 bg-theme-bg/80 backdrop-blur-md py-4 mb-8 border-b border-white/5">
            <button 
            onClick={() => setSelectedProject(null)}
            className="group flex items-center gap-2 text-theme-muted hover:text-white transition-colors text-xs font-mono uppercase tracking-widest cursor-hover"
            >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Return to Index
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="mb-10">
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight tracking-tight">
                    {selectedProject.title}
                </h1>
                <p className="text-xl md:text-2xl text-theme-muted font-light leading-relaxed border-l-2 border-theme-accent/50 pl-6">
                    {selectedProject.description}
                </p>
            </div>

            <div className="aspect-video w-full rounded-sm overflow-hidden relative mb-12 group">
               <img 
                 src={selectedProject.image} 
                 alt={selectedProject.title} 
                 className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-theme-bg/10 mix-blend-multiply"></div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
                <div className="flex items-center gap-2 mb-6 text-white font-mono text-sm uppercase tracking-wider">
                    <Layers size={16} className="text-theme-accent" />
                    <span>Project Brief</span>
                </div>
                <p className="text-gray-300 font-light">{selectedProject.fullDescription}</p>
                
                <div className="my-12 border-t border-b border-white/10 py-12">
                    <div className="flex items-center gap-2 mb-8 text-white font-mono text-sm uppercase tracking-wider">
                        <Code size={16} className="text-theme-accent" />
                        <span>Technical Specs</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedProject.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 group">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-theme-muted group-hover:bg-theme-accent transition-colors"></div>
                                <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-8 sticky top-40">
                <div className="py-6 border-t border-white/10">
                    <span className="block text-xs font-mono text-theme-muted mb-2 uppercase tracking-widest">Year</span>
                    <span className="text-xl text-white font-display font-medium">{selectedProject.year}</span>
                </div>

                <div className="py-6 border-t border-white/10">
                    <span className="block text-xs font-mono text-theme-muted mb-2 uppercase tracking-widest">Role</span>
                    <span className="text-xl text-white font-display font-medium">{selectedProject.role}</span>
                </div>
                
                <div className="py-6 border-t border-white/10">
                    <span className="block text-xs font-mono text-theme-muted mb-4 uppercase tracking-widest">Stack</span>
                    <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <a 
                    href={selectedProject.link} 
                    className="group flex items-center justify-between w-full py-4 px-6 bg-white text-black font-bold font-mono uppercase tracking-wider hover:bg-theme-accent hover:text-white transition-all cursor-hover"
                >
                    Launch
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Showcase List View
  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="relative pt-0 md:pt-10 border-b border-white/10 pb-12 md:pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6 max-w-2xl">
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-theme-accent rounded-full animate-pulse"></span>
                    <span className="text-xs font-mono text-theme-accent uppercase tracking-widest">
                        <ScrambleText text="Portfolio Index" />
                    </span>
                </div>
                <h1 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tight leading-[0.9]">
                    Selected<br />Works
                </h1>
            </div>
        </div>
      </div>

      {/* Projects Timeline Layout */}
      <div className="relative">
          {/* Central Line (Desktop Only) */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block"></div>

          <div className="space-y-32">
            {PROJECTS.map((project, index) => (
               <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  onClick={setSelectedProject} 
               />
            ))}
          </div>
      </div>
      
      <div className="h-24"></div>
    </div>
  );
};

export default ProjectsView;