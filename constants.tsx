
import { Panel } from './types';

export const INITIAL_PANELS: Panel[] = [
  { 
    id: 1, 
    title: 'Introduction to\nthe IVM Process', 
    tag: 'START HERE', 
    type: 'video', 
    videoUrl: 'Panel_01.mp4', 
    text: 'This introduction covers the basics of the Integrated Vegetation Management (IVM) process.', 
    isVisited: false 
  },
  { 
    id: 2, 
    title: 'Develop Vegetation Management Program Specifications and Goals', 
    type: 'video', 
    videoUrl: 'Panel_02.mp4', 
    text: 'Learn how to set clear goals and specifications.', 
    isVisited: false,
    bgColor: '#5E3B8E'
  },
  { 
    id: 3, 
    title: 'Create Maintenance Plans and Objectives', 
    type: 'video', 
    videoUrl: 'Panel_03.mp4', 
    text: 'Step-by-step guide to maintenance plans.', 
    isVisited: false,
    bgColor: '#5E3B8E'
  },
  { 
    id: 4, 
    title: 'Conduct Assessments, Select Control Methods, Write Statement of Work', 
    type: 'video', 
    videoUrl: 'Panel_04.mp4', 
    text: 'Understanding assessments and documentation.', 
    isVisited: false,
    bgColor: '#E66B41'
  },
  { 
    id: 5, 
    title: 'Landowner Notifications / Communicate with Shareholders', 
    type: 'video', 
    videoUrl: 'Panel_05.mp4', 
    text: 'Effective communication strategies.', 
    isVisited: false,
    bgColor: '#E66B41'
  },
  { 
    id: 6, 
    title: 'Schedule and Perform Work', 
    type: 'video', 
    videoUrl: 'Panel_06.mp4', 
    text: 'Efficient execution management.', 
    isVisited: false,
    bgColor: '#82A44B'
  },
  { 
    id: 7, 
    title: 'Evaluate (QA/QC), Record Data', 
    type: 'video', 
    videoUrl: 'Panel_07.mp4', 
    text: 'Quality control measures.', 
    isVisited: false,
    bgColor: '#E66B41'
  },
  { 
    id: 8, 
    title: 'Adaptive Management', 
    type: 'video', 
    videoUrl: 'Panel_08.mp4', 
    text: 'Iterative improvement through learning.', 
    isVisited: false,
    bgColor: '#5E3B8E'
  }
];
