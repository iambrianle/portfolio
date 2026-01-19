import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, ArrowUpRight, Hash } from 'lucide-react';
import { BLOG_POSTS } from '../data/posts';
import { BlogPost } from '../types';
import ScrambleText from './ScrambleText';

const BlogView: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pt-8 pb-20 max-w-4xl mx-auto">
        <div className="sticky top-24 z-30 bg-theme-bg/90 backdrop-blur-md py-4 mb-12 border-b border-white/5">
            <button 
            onClick={() => setSelectedPost(null)}
            className="group flex items-center gap-2 text-theme-muted hover:text-white transition-colors text-xs font-mono uppercase tracking-widest cursor-hover"
            >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Logs
            </button>
        </div>

        <article>
            <header className="mb-16">
                <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono text-theme-accent">
                    {selectedPost.tags.map(tag => (
                        <span key={tag}>#{tag}</span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                    {selectedPost.title}
                </h1>
                <div className="flex items-center gap-8 text-theme-muted font-mono text-xs border-y border-white/10 py-6">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {selectedPost.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={14} />
                        {selectedPost.readTime}
                    </div>
                </div>
            </header>

            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-p:font-light prose-p:text-gray-300 prose-a:text-theme-accent prose-code:text-theme-secondary">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
            </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="pt-10 mb-20">
            <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-theme-secondary rounded-full animate-pulse"></span>
                <span className="text-xs font-mono text-theme-secondary uppercase tracking-widest">
                    <ScrambleText text="Engineering Log" />
                </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6">Thoughts.</h1>
            <p className="text-xl text-theme-muted font-light max-w-xl">
                Documentation of technical challenges, system architectures, and learning processes.
            </p>
        </div>

        <div className="border-t border-white/10">
            {BLOG_POSTS.map((post, index) => (
                <div 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="group relative border-b border-white/10 py-12 cursor-hover hover:bg-white/[0.02] transition-colors"
                >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
                        <div className="md:col-span-2 text-xs font-mono text-theme-muted group-hover:text-theme-accent transition-colors">
                            {post.date}
                        </div>
                        
                        <div className="md:col-span-7">
                            <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-theme-accent transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-theme-muted font-light leading-relaxed">
                                {post.excerpt}
                            </p>
                        </div>

                        <div className="md:col-span-3 flex md:justify-end items-center gap-4">
                             <div className="flex gap-2">
                                {post.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded text-gray-500">
                                        {tag}
                                    </span>
                                ))}
                             </div>
                             <ArrowUpRight className="text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={20} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default BlogView;