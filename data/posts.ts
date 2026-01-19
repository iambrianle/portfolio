import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'microsoft-internship',
    title: 'Building AI for Education at Microsoft',
    excerpt: 'Reflections on my summer developing RAG chatbots using Azure AI to personalize K-5 education.',
    date: 'Aug 15, 2025',
    readTime: '6 min read',
    tags: ['Microsoft', 'AI', 'Azure'],
    content: `
# Building AI for Education at Microsoft

This summer, I had the incredible opportunity to join Microsoft as an Artificial Intelligence Intern in the Federal Division. My primary focus was leveraging Azure AI to solve real-world problems in education.

## The Challenge: Differentiated Learning

Every student learns differently. In a K-5 classroom, teachers often struggle to provide personalized attention to every student simultaneously. 

## The Solution: RAG Chatbots

I developed a Retrieval-Augmented Generation (RAG) chatbot using Python and the **Azure AI o3-mini model**. 

### Key Technical Achievements:
*   **Context Awareness**: The bot doesn't just answer questions; it understands the specific curriculum context.
*   **Real-time Citations**: To ensure trust, every answer cites its source material immediately.
*   **Gradio Interface**: I built a web-based frontend to make the tool accessible for non-technical users.

Working within the framework of Microsoft's Federal Division taught me not just about code, but about security, scalability, and the operational framework of deploying enterprise AI.
    `
  },
  {
    id: 'teaching-english-vietnam',
    title: 'Bridging Gaps: Teaching English in Vietnam',
    excerpt: 'How leading a student-led initiative for 100+ students taught me about leadership and empathy.',
    date: 'Jul 20, 2025',
    readTime: '4 min read',
    tags: ['Volunteering', 'Leadership', 'Education'],
    content: `
# Bridging Gaps: Teaching English in Vietnam

For the past year, I've served as an English Teacher for "Lớp Tiếng Anh Vui Vẻ" (Happy English Kids), a student-led initiative providing free education to low-income students across Vietnam.

## Beyond the Grammar

Teaching 100+ students remotely isn't just about conjugation and vocabulary. It's about building confidence. 

*   **Curriculum Design**: I designed lessons tailored to beginner and intermediate learners, focusing on practical usage.
*   **Remote Engagement**: Keeping young students engaged over Zoom requires creativity and energy.

This experience has reinforced my belief in the power of education as a tool for social mobility, a theme that connects back to my technical work in EdTech.
    `
  },
  {
    id: 'physics-club',
    title: 'Leading the Jackson Reed Physics Club',
    excerpt: 'From organizing guest speakers to drafting particle acceleration proposals for CERN.',
    date: 'Feb 10, 2025',
    readTime: '5 min read',
    tags: ['Physics', 'Leadership', 'STEM'],
    content: `
# Leading the Jackson Reed Physics Club

Physics is the study of how the universe behaves, but running a Physics Club is the study of how to get high schoolers excited about the universe.

## CERN Research Proposal

One of my proudest moments was co-leading a team of four to draft a particle acceleration experiment proposal for a research competition hosted by **CERN**.

We dove deep into advanced physics concepts that were well beyond our standard curriculum. It required:
1.  Rigorous self-study.
2.  Collaborative problem solving.
3.  Technical writing skills.

## Building a Community

As Co-founder, I didn't just want a study group. I wanted a community. We organized guest speaker events and recruitment drives to make physics accessible to everyone, not just the "science kids."
    `
  }
];