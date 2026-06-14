export interface Teacher {
  name: string;
  role: string;
  email: string | null;
  photoUrl: string | null;
}

export interface Subject {
  _id: string;
  title: string;
  slug: string;
  department: string;
  description: string;
  imageUrl: string | null;
  gradeLevel: string[];
  teacher: Teacher | null;
  content: string;
}

export interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  excerpt: string;
  imageUrl: string | null;
  author: { name: string; role: string; photoUrl: string | null } | null;
  content: string;
}

export const staticSubjects: Subject[] = [
  {
    _id: '1',
    title: 'Mathematics',
    slug: 'mathematics',
    department: 'Sciences',
    description: 'Pure and applied mathematics focusing on algebra, calculus, geometry, and trigonometry.',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800',
    gradeLevel: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Dr. Evelyn Jacobs',
      role: 'Head of Mathematics Department',
      email: 'ejacobs@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300',
    },
    content: `Mathematics is a key pillar of our academic programme. For senior learners (Grades 10–12), we offer both Core Mathematics and Mathematical Literacy, ensuring each student is placed in the stream best suited to their future career goals.
    
    Our curriculum emphasizes logical reasoning, analytical thinking, and problem-solving. We host regular extra-lessons and enter learners into the South African Mathematics Olympiad annually, celebrating numerous provincial achievements.`,
  },
  {
    _id: '2',
    title: 'Physical Sciences',
    slug: 'physical-sciences',
    department: 'Sciences',
    description: 'Physics and chemistry explored through theory and interactive practical lab experiments.',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800',
    gradeLevel: ['Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Mr. Adrian Botha',
      role: 'Senior Physical Sciences Teacher',
      email: 'abotha@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300',
    },
    content: `Physical Sciences investigates physical and chemical systems. The subject is divided into two main components: Physics (focusing on mechanics, waves, electricity, and magnetism) and Chemistry (focusing on chemical change, matter, and organic chemistry).
    
    With our newly upgraded science laboratory, learners conduct hands-on experiments weekly. This practical component helps bridge the gap between abstract theoretical laws and real-world phenomena.`,
  },
  {
    _id: '3',
    title: 'Life Sciences',
    slug: 'life-sciences',
    department: 'Sciences',
    description: 'The study of life in our changing world, covering molecular biology, anatomy, and ecology.',
    imageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=800',
    gradeLevel: ['Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Mrs. Sandra Marais',
      role: 'Biology Specialist',
      email: 'smarais@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300',
    },
    content: `Life Sciences explores the complexity of living organisms, from microscopic cellular structures to complex ecological networks. 

    Key study areas include genetics, human anatomy and physiology, plant reproduction, and environmental studies. The curriculum encourages environmental stewardship and critical thinking regarding bioethics and sustainability.`,
  },
  {
    _id: '4',
    title: 'History',
    slug: 'history',
    department: 'Humanities',
    description: 'Exploring South African and world history to build critical analysis, research, and essay-writing skills.',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=800',
    gradeLevel: ['Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Mr. David Hendricks',
      role: 'Head of Humanities',
      email: 'dhendricks@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300',
    },
    content: `History is not merely about memorizing dates; it is the study of human experience, conflict, and progress. Learners study 20th-century world events (including the Cold War and Civil Rights movements) alongside comprehensive South African history.
    
    This subject is highly regarded for developing research capability, source evaluation, and cohesive essay writing, preparing learners for careers in law, journalism, and public administration.`,
  },
  {
    _id: '5',
    title: 'Geography',
    slug: 'geography',
    department: 'Humanities',
    description: 'Human and physical geography featuring climatology, geomorphology, mapwork, and GIS.',
    imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800',
    gradeLevel: ['Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Ms. Clara van Wyk',
      role: 'Geography Educator',
      email: 'cvanwyk@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300',
    },
    content: `Geography is a bridge between the physical and social sciences. Our learners explore weather patterns, plate tectonics, demographics, and urbanization.
    
    A strong emphasis is placed on practical spatial analysis, map calculations, and Geographic Information Systems (GIS), preparing students to address modern environmental and urban planning challenges.`,
  },
  {
    _id: '6',
    title: 'Afrikaans',
    slug: 'afrikaans',
    department: 'Languages',
    description: 'Comprehensive language, literature, and communication programmes in Afrikaans.',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800',
    gradeLevel: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Mev. Elize de Villiers',
      role: 'Senior Afrikaans Educator',
      email: 'edevilliers@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=300',
    },
    content: `Ons bied Afrikaans aan op sowel Huistaal as Eerste Addisionele Taal vlakke. Deur die bestudering van klassieke en kontemporêre letterkunde, poësie en taalleer bou ons leerders se taalvaardigheid en kultuurbewustheid uit.
    
    Debatskompetisies en skryfsessies word gereeld aangebied om kreatiewe selfuitdrukking te bevorder en ons leerders voor te berei vir uitnemendheid in 'n veeltalige samelewing.`,
  },
  {
    _id: '7',
    title: 'English',
    slug: 'english',
    department: 'Languages',
    description: 'English Home Language and First Additional Language covering literature, grammar, and public speaking.',
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800',
    gradeLevel: ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Ms. Sarah Jenkins',
      role: 'Language Department Coordinator',
      email: 'sjenkins@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=300',
    },
    content: `English is the primary medium of instruction and a vital gateway to global communication. Our courses balance rigorous grammar study with the appreciation of literature, including Shakespearean drama, modern novels, and international poetry.
    
    Through public speaking, essay writing, and interactive debates, we empower learners to articulate complex thoughts with clarity and confidence.`,
  },
  {
    _id: '8',
    title: 'Visual Arts',
    slug: 'visual-arts',
    department: 'Arts',
    description: 'Nurturing creative expression through drawing, painting, photography, design, and art history.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800',
    gradeLevel: ['Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Mr. Leon Vermeulen',
      role: 'Creative Arts Coordinator',
      email: 'lvermeulen@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
    },
    content: `Visual Arts allows students to explore their creative voice while developing high-level practical skills. The syllabus is split between practical art-making (portfolio projects) and the study of visual culture and art history.
    
    The year culminates in our annual school art exhibition, showcasing portfolios from our senior learners to the wider Villiersdorp community.`,
  },
  {
    _id: '9',
    title: 'Business Studies',
    slug: 'business-studies',
    department: 'Commerce',
    description: 'Introduction to corporate structures, marketing, entrepreneurship, and contracts.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
    gradeLevel: ['Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Mrs. Nomsa Dlamini',
      role: 'Business Management Educator',
      email: 'ndlamini@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300',
    },
    content: `Business Studies prepares learners for the modern economic environment. Topics covered include business environments, public and private sectors, corporate governance, human resources, and marketing strategies.
    
    Our curriculum includes practical tasks like writing business plans and participating in entrepreneurship days, where students run simulated businesses.`,
  },
  {
    _id: '10',
    title: 'Economics',
    slug: 'economics',
    department: 'Commerce',
    description: 'An analysis of microeconomics, macroeconomics, market models, and economic indicators.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800',
    gradeLevel: ['Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Mr. Adrian Botha',
      role: 'Senior Physical Sciences Teacher',
      email: 'abotha@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300',
    },
    content: `Economics provides a framework for understanding resource allocation, pricing systems, and government policies. Students explore inflation, unemployment, fiscal and monetary policies, and international trade.
    
    We connect textbook theories to South Africa's contemporary economic landscape, helping learners develop informed opinions on national and global economic matters.`,
  },
  {
    _id: '11',
    title: 'Computer Applications Technology',
    slug: 'cat',
    department: 'Technology',
    description: 'Practical computing skills covering office suites, databases, html, and information management.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800',
    gradeLevel: ['Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Mr. Francois du Toit',
      role: 'IT & CAT Specialist',
      email: 'fdutoit@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300',
    },
    content: `Computer Applications Technology (CAT) equips learners with the digital skills required in the modern workplace. The focus is on advanced usage of word processors, spreadsheets, databases, and presentations.
    
    Additionally, students study information management, networking basics, cybersecurity, and basic web design (HTML & CSS) to ensure full digital literacy.`,
  },
  {
    _id: '12',
    title: 'Accounting',
    slug: 'accounting',
    department: 'Commerce',
    description: 'Financial accounting, cost accounting, and budgeting principles for the corporate world.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800',
    gradeLevel: ['Grade 10', 'Grade 11', 'Grade 12'],
    teacher: {
      name: 'Mrs. Nomsa Dlamini',
      role: 'Business Management Educator',
      email: 'ndlamini@villiersdorphs.co.za',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300',
    },
    content: `Accounting focuses on the systematic recording, analysis, and interpretation of financial information. Senior students study general ledgers, financial statements, cash flow analysis, cost accounting, and auditing.
    
    A strong emphasis is placed on professional ethics and internal control systems, laying a firm foundation for prospective Chartered Accountants.`,
  },
];

export const staticNews: NewsItem[] = [
  {
    _id: '1',
    title: 'Grade 12 Class of 2025 Achieves Outstanding Matric Results',
    slug: 'matric-results-2025',
    category: 'Achievement',
    publishedAt: '2026-01-15T00:00:00Z',
    excerpt: 'Villiersdorp Secondary School celebrates a 98% matric pass rate for the class of 2025, with 14 distinctions awarded.',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800',
    author: {
      name: 'Principal J. van der Merwe',
      role: 'School Principal',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300',
    },
    content: `Villiersdorp Secondary School is incredibly proud to announce the matric results for the Class of 2025. Our learners achieved an outstanding 98% pass rate, marking one of the highest academic achievements in the school's history.
    
    In addition to the exceptional overall pass rate, our students secured a total of 14 subject distinctions. Over 65% of our learners qualified for Bachelor Degree studies, paving the way for their entry into universities across South Africa.
    
    We would like to express our heartfelt gratitude to our dedicated teaching staff, who went above and beyond with extra lessons, and to the parents for their unwavering support throughout this academic year. Congratulations to the Class of 2025!`,
  },
  {
    _id: '2',
    title: 'Annual Cultural Festival Returns with Record Participation',
    slug: 'cultural-festival-2025',
    category: 'Arts & Culture',
    publishedAt: '2025-11-02T00:00:00Z',
    excerpt: "This year's cultural festival saw participation from all 1,200 learners, showcasing the rich diversity of our school community.",
    imageUrl: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=800',
    author: {
      name: 'Mr. Leon Vermeulen',
      role: 'Creative Arts Coordinator',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
    },
    content: `The highly anticipated VSS Annual Cultural Festival concluded last night with a spectacular finale showcase. This year, the festival achieved a record milestone with participation from our entire student body.
    
    From traditional choir performances and modern dance routines to poetry slams and visual arts galleries, the campus was alive with creativity and cultural exchange. The event highlights the school's commitment to holistic development, giving learners a stage to express their unique heritages and talents.
    
    A special thank you to all the community leaders and families who attended, and to the student representative council for organizing the logistical flow. We look forward to an even bigger showcase next year!`,
  },
  {
    _id: '3',
    title: 'New Science Lab Opening Elevates STEM Programme',
    slug: 'new-science-lab',
    category: 'Academics',
    publishedAt: '2025-09-18T00:00:00Z',
    excerpt: 'Thanks to community partnerships, our state-of-the-art science laboratory opened this term, benefiting all Grade 10–12 science learners.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800',
    author: {
      name: 'Mr. Adrian Botha',
      role: 'Senior Physical Sciences Teacher',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300',
    },
    content: `This term marked a major milestone for our science department with the official opening of our brand-new, state-of-the-art Science Laboratory. The facility was made possible through generous contributions from our local community partners and agricultural associations.
    
    The new laboratory features advanced safety equipment, individual student workstations, digital projection systems, and a fully stocked chemistry and physics prep room. This upgrade allows our Grade 10, 11, and 12 Physical and Life Sciences students to conduct complex curriculum experiments in a safe, modern environment.
    
    "This laboratory shifts our science classes from theoretical lectures to active, empirical discovery," noted Mr. Adrian Botha. We look forward to seeing our students excel in their practical assessments.`,
  },
  {
    _id: '4',
    title: 'U16 Rugby Team Reaches Western Cape Finals',
    slug: 'u16-rugby-finals',
    category: 'Sports',
    publishedAt: '2025-08-10T00:00:00Z',
    excerpt: 'Our Under-16 rugby team has qualified for the Western Cape School Sports finals for the first time in school history.',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800',
    author: {
      name: 'Coach R. Louw',
      role: 'Sports Director',
      photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300',
    },
    content: `History was made on Saturday as our Under-16 rugby team secured a hard-fought victory in the regional semi-finals, qualifying for the Western Cape School Sports Finals for the first time.
    
    In a tense match against strong regional rivals, the team showed incredible resilience, securing the winning try in the final minutes of the match. The dedication shown by our student-athletes during early-morning training sessions has truly paid off.
    
    The finals will take place next month in Cape Town. We encourage all students, parents, and community members to support the team as they prepare for this major sporting event. Go VSS!`,
  },
  {
    _id: '5',
    title: 'School Garden Project Wins Community Award',
    slug: 'garden-award',
    category: 'Community',
    publishedAt: '2025-07-22T00:00:00Z',
    excerpt: 'Our learner-run vegetable garden project received the Overberg Community Excellence Award this month.',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800',
    author: {
      name: 'Ms. Clara van Wyk',
      role: 'Geography Educator & Garden Advisor',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300',
    },
    content: `The Villiersdorp Secondary School Garden Project has been awarded the prestigious Overberg Community Excellence Award for its contribution to sustainable agriculture and food security.
    
    Started two years ago as an extension of the Geography and Life Sciences curricula, the garden is completely managed by student volunteers. The project grows a variety of organic vegetables, which are used to supply the school kitchen and shared with families in need within the local community.
    
    The award committee praised the project for teaching students valuable agricultural skills while fostering a spirit of community service and ecological responsibility.`,
  },
  {
    _id: '6',
    title: 'Term 3 Examination Timetable Released',
    slug: 'term-3-timetable',
    category: 'Announcement',
    publishedAt: '2025-06-30T00:00:00Z',
    excerpt: 'The Term 3 examination timetable is now available. All learners should check the schedule on the school notice board.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800',
    author: {
      name: 'Deputy Principal S. Naidoo',
      role: 'Academic Administrator',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300',
    },
    content: `The academic administration has officially released the exam timetable for the Term 3 examinations. Testing will commence on August 15 and conclude on September 5.
    
    This exam period is vital for cumulative assessment portfolios, especially for our Grade 11 and 12 students. We urge all learners to review the timetable posted on the main notice board and the student portal to prevent any scheduling conflicts.
    
    Study halls and peer tutoring programmes will be active in the library every afternoon from Monday to Thursday. We wish all students the best of luck with their study preparations.`,
  },
];
