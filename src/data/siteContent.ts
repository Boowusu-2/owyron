export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface PrincipleItem {
  index: string;
  title: string;
  description: string;
}

export interface TechnologyDomain {
  id: string;
  index: string;
  title: string;
  summary: string;
  capabilities: string[];
  architectureNote: string;
  diagramType: 'ai' | 'systems' | 'engineering' | 'emerging';
}

export type ResearchCategory = 'Publications' | 'Experiments' | 'Prototypes';

export interface ResearchTrack {
  id: string;
  code: string;
  category: ResearchCategory;
  title: string;
  scope: string;
  status: 'Active Exploration' | 'In Preparation' | 'Forthcoming';
  focusAreas: string[];
}

export interface VisionPillar {
  index: string;
  title: string;
  description: string;
}

export interface EnquiryChannel {
  id: 'general' | 'partnership' | 'collaboration';
  label: string;
  title: string;
  description: string;
  emailPlaceholder: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'technologies', label: 'Technologies', href: '#technologies' },
  { id: 'research', label: 'Research', href: '#research' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const ABOUT_PRINCIPLES: PrincipleItem[] = [
  {
    index: '01',
    title: 'First-Principles Engineering',
    description:
      'We approach hard technical problems from mathematical and architectural foundations rather than assembling transient abstractions.',
  },
  {
    index: '02',
    title: 'Independent Research Direction',
    description:
      'OWYRON operates with the freedom to pursue long-horizon inquiry across intelligence, computation, and physical automation.',
  },
  {
    index: '03',
    title: 'Precision & Reliability',
    description:
      'Every system we explore is guided by clarity of design, verifiable behaviour, and enduring engineering discipline.',
  },
];

export const TECHNOLOGY_DOMAINS: TechnologyDomain[] = [
  {
    id: 'artificial-intelligence',
    index: '01',
    title: 'Artificial Intelligence',
    summary:
      'Investigating foundational intelligence models, multimodal perception, and reasoning architectures built for complex real-world environments.',
    capabilities: [
      'Machine learning',
      'Generative AI',
      'Intelligent agents',
      'Computer vision',
      'Natural language processing',
    ],
    architectureNote: 'Adaptive representation learning & structured inference pipelines',
    diagramType: 'ai',
  },
  {
    id: 'intelligent-systems',
    index: '02',
    title: 'Intelligent Systems',
    summary:
      'Designing cohesive control loops and decision frameworks where machine intelligence operates reliably alongside human judgment.',
    capabilities: [
      'Autonomous systems',
      'Intelligent automation',
      'Decision-support systems',
    ],
    architectureNote: 'Closed-loop perception, planning, and deterministic verification',
    diagramType: 'systems',
  },
  {
    id: 'software-engineering',
    index: '03',
    title: 'Software Engineering',
    summary:
      'Architecting resilient computational foundations capable of supporting high-throughput workloads, distributed orchestration, and long-term scale.',
    capabilities: [
      'Scalable software platforms',
      'Cloud-native applications',
      'Distributed systems',
    ],
    architectureNote: 'Fault-tolerant distributed state and low-latency execution topologies',
    diagramType: 'engineering',
  },
  {
    id: 'emerging-technologies',
    index: '04',
    title: 'Emerging Technologies',
    summary:
      'Exploring frontier intersections between embodied hardware, next-generation compute paradigms, and experimental engineering.',
    capabilities: [
      'Robotics',
      'Advanced computing',
      'Experimental technology',
    ],
    architectureNote: 'Embodied actuation, specialized compute, and exploratory R&D',
    diagramType: 'emerging',
  },
];

export const RESEARCH_TRACKS: ResearchTrack[] = [
  {
    id: 'track-publications',
    code: 'RES — 01',
    category: 'Publications',
    title: 'Research Publications',
    scope:
      'A dedicated archive reserved for forthcoming technical papers, foundational notes, and open methodological writing as OWYRON formalizes its research findings.',
    status: 'Forthcoming',
    focusAreas: ['Foundational AI', 'Reasoning Systems', 'System Reliability'],
  },
  {
    id: 'track-experiments',
    code: 'EXP — 02',
    category: 'Experiments',
    title: 'Technical Experiments',
    scope:
      'Structured exploratory studies evaluating novel model behaviours, agent coordination patterns, and computational efficiency across controlled testbeds.',
    status: 'Active Exploration',
    focusAreas: ['Intelligent Agents', 'Multimodal Vision', 'Inference Optimization'],
  },
  {
    id: 'track-prototypes',
    code: 'PRT — 03',
    category: 'Prototypes',
    title: 'Prototypes & Engineering Systems',
    scope:
      'Early-stage internal architectures bridging software infrastructure, autonomous decision-support, and robotic or advanced computing interfaces.',
    status: 'In Preparation',
    focusAreas: ['Autonomous Control', 'Distributed Platforms', 'Robotics Interfaces'],
  },
];

export const VISION_PILLARS: VisionPillar[] = [
  {
    index: 'I',
    title: 'Continuous Learning',
    description:
      'Remaining intellectually rigorous as theory, tooling, and computational capabilities evolve.',
  },
  {
    index: 'II',
    title: 'Deliberate Research',
    description:
      'Asking foundational questions before committing to architecture, ensuring depth over noise.',
  },
  {
    index: 'III',
    title: 'Disciplined Experimentation',
    description:
      'Testing hypotheses empirically through working prototypes, measurable benchmarks, and iteration.',
  },
  {
    index: 'IV',
    title: 'Enduring Engineering',
    description:
      'Translating insights into resilient software and intelligent systems built to stand the test of time.',
  },
];

export const ENQUIRY_CHANNELS: EnquiryChannel[] = [
  {
    id: 'general',
    label: 'General enquiries',
    title: 'General Enquiries',
    description:
      'Questions regarding OWYRON, our technological focus areas, or ongoing exploratory directions.',
    emailPlaceholder: '[general-contact-email-placeholder]',
  },
  {
    id: 'partnership',
    label: 'Partnership enquiries',
    title: 'Partnership Enquiries',
    description:
      'Strategic alignment with research institutions, technology organizations, and aligned innovators.',
    emailPlaceholder: '[partnerships-email-placeholder]',
  },
  {
    id: 'collaboration',
    label: 'Project collaboration enquiries',
    title: 'Project Collaboration Enquiries',
    description:
      'Technical collaboration on ambitious engineering initiatives, prototypes, and applied R&D.',
    emailPlaceholder: '[collaboration-email-placeholder]',
  },
];

