import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'microsoft-rag',
    title: 'Azure RAG AI Chatbot',
    description: 'A Retrieval-Augmented Generation chatbot developed at Microsoft using Azure AI and Python.',
    fullDescription: 'During my internship at Microsoft, I developed and customized a Retrieval-Augmented Generation (RAG) chatbot using Python. By integrating Azure AI’s o3-mini model, I enabled the system to deliver accurate, context-aware responses with real-time source citations. The project involved architecting a solution for K-5 classrooms, creating an AI-driven teaching assistant that enhanced personalized student engagement.',
    tags: ['Python', 'Azure AI', 'Gradio', 'RAG'],
    image: 'https://res.cloudinary.com/dcr5jbw1n/image/upload/v1768803661/Screenshot_2026-01-19_at_12.59.17_AM_dg5yv3.png',
    link: '#',
    features: [
        'Azure AI o3-mini Model Integration', 
        'Real-time Source Citation', 
        'Gradio Web Interface', 
        'Educational Use-case Optimization'
    ],
    year: '2025',
    role: 'Artificial Intelligence Intern'
  },
  {
    id: 'biomechanics-curriculum',
    title: 'Biomechanics Data Analysis',
    description: 'Developing a Python-based curriculum for motion capture data analysis at UDC.',
    fullDescription: 'Collaborating with an Assistant Professor of Biomechanical Engineering at the University of the District of Columbia, I designed a curriculum integrating Python for motion capture data analysis. This role involved setting up and calibrating biomechanics-related technology to ensure accurate data collection and processing for educational purposes.',
    tags: ['Python', 'Data Analysis', 'Engineering', 'Education'],
    image: 'https://res.cloudinary.com/dcr5jbw1n/image/upload/v1768803547/5-Figure4-1_bukwyv.png',
    link: '#',
    features: [
        'Motion Capture Calibration', 
        'Python Data Curriculum', 
        'Biomedical Engineering Integration', 
        'Research Collaboration'
    ],
    year: '2024',
    role: 'Student Consultant'
  },
  {
    id: 'centra-track',
    title: 'Centra Track - Workforce Management System',
    description: 'A full-stack attendance and workflow management application built for the Jackson-Reed HS Help Desk program.',
    fullDescription: 'Centra Track is a custom-built web application designed to modernize the tracking of interns and volunteers. It replaces manual timekeeping with a secure, geolocation-based clock-in system. The platform handles complex payroll logic (tracking against a 288-hour paid cap), provides real-time administrative oversight, includes a digital communication board, and features detailed data visualization for weekly performance trends.',
    tags: ['React', 'Firebase', 'Geolocation API', 'Data Visualization', 'RBAC'],
    image: 'https://res.cloudinary.com/dcr5jbw1n/image/upload/v1768803821/Screenshot_2026-01-19_at_1.23.06_AM_vwnfkm.png',
    link: '#',
    features: [
        'GPS-Fenced Attendance Tracking', 
        'Real-time Admin Dashboard & Audit Logs', 
        'Automated Payroll/Hour Cap Logic', 
        'Role-Based Access (Admin/Intern/Vol)'
    ],
    year: '2025',
    role: 'Full-Stack Developer'
  },
  {
    id: 'cad-fundraising',
    title: 'CAD Fundraising Initiative',
    description: 'Designed and produced 200+ custom products to support community educational initiatives.',
    fullDescription: 'At Asian American LEAD (AALEAD), I utilized Computer-Aided Design (CAD) to create over 200 custom keychains. I managed the entire production and sales lifecycle, raising over $1,000 to directly support community and educational programs. I also conducted research on disability access in education to inform advocacy efforts.',
    tags: ['CAD', '3D Design', 'Project Lead', 'Advocacy'],
    image: 'https://res.cloudinary.com/dcr5jbw1n/image/upload/v1768804281/IMG_8651_oact9f.jpg',
    link: '#',
    features: [
        'Computer-Aided Design (CAD)', 
        'Product Manufacturing', 
        'Fundraising Strategy', 
        'Community Advocacy'
    ],
    year: '2025',
    role: 'Student Fellow'
  }
];