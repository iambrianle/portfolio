import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div 
      onClick={() => onClick(project)}
      className={`group relative flex flex-col md:flex-row items-center gap-12 md:gap-24 cursor-hover ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Decorative Center Dot (Desktop) */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-theme-bg border border-theme-accent rounded-full z-10 group-hover:scale-150 group-hover:bg-theme-accent transition-all duration-500"></div>

      {/* Image Side */}
      <div className="w-full md:w-1/2">
         <div className="aspect-[4/3] w-full overflow-hidden relative rounded-sm group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500">
            <div className="absolute inset-0 bg-theme-accent/0 group-hover:bg-theme-accent/10 transition-colors duration-500 z-10 mix-blend-overlay"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            />
            {/* Corner Markers */}
            <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-white/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         </div>
      </div>

      {/* Content Side */}
      <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} items-start text-left`}>
         <div className="flex items-center gap-4 mb-4">
             <span className="text-xs font-mono text-theme-accent uppercase tracking-widest">
                Project 0{index + 1}
             </span>
             <div className="h-px w-12 bg-white/10 group-hover:bg-theme-accent/50 transition-colors"></div>
         </div>
         
         <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 group-hover:text-theme-accent transition-colors duration-300">
            {project.title}
         </h3>
         
         <p className="text-theme-muted font-light leading-relaxed mb-8 max-w-md">
            {project.description}
         </p>

         <div className={`flex flex-wrap gap-2 mb-8 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
            {project.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs font-mono text-gray-500 border border-white/5 px-3 py-1 bg-white/[0.02] group-hover:border-white/20 transition-colors">
                  {tag}
                </span>
            ))}
         </div>

         <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest border-b border-transparent group-hover:border-theme-accent pb-1 transition-all">
            View More
            <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" size={14} />
         </div>
      </div>
    </div>
  );
};

export default ProjectCard;