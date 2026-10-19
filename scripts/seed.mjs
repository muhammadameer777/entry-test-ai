import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting PrepAI database seeding...');

  // 1. Seed Exams
  const examsData = [
    {
      id: 'exam-mdcat',
      name: 'MDCAT',
      slug: 'mdcat',
      description: 'National Medical & Dental College Admission Test (PMDC / UHS / SZABMU syllabus)',
      totalQuestions: 200,
      durationMinutes: 210,
      negativeMarking: 0.0,
      syllabus: JSON.stringify({
        biology: '34% weightage (68 MCQs)',
        chemistry: '27% weightage (54 MCQs)',
        physics: '27% weightage (54 MCQs)',
        english: '9% weightage (18 MCQs)',
        logicalReasoning: '3% weightage (6 MCQs)'
      }),
    },
    {
      id: 'exam-ecat',
      name: 'ECAT',
      slug: 'ecat',
      description: 'Engineering College Admission Test (UET Lahore & Punjab Engineering Colleges)',
      totalQuestions: 100,
      durationMinutes: 100,
      negativeMarking: 1.0,
      syllabus: JSON.stringify({
        mathematics: '30 questions',
        physics: '30 questions',
        chemistry: '30 questions',
        english: '10 questions'
      }),
    },
    {
      id: 'exam-net',
      name: 'NET (NUST)',
      slug: 'net',
      description: 'National University of Sciences & Technology Entry Test (Engineering & Computing)',
      totalQuestions: 200,
      durationMinutes: 180,
      negativeMarking: 0.0,
      syllabus: JSON.stringify({
        mathematics: '40% weightage (80 MCQs)',
        physics: '30% weightage (60 MCQs)',
        chemistryOrComputer: '15% weightage (30 MCQs)',
        english: '10% weightage (20 MCQs)',
        intelligence: '5% weightage (10 MCQs)'
      }),
    },
    {
      id: 'exam-nums',
      name: 'NUMS',
      slug: 'nums',
      description: 'National University of Medical Sciences Admission Test (Army Medical College)',
      totalQuestions: 150,
      durationMinutes: 150,
      negativeMarking: 0.0,
    },
    {
      id: 'exam-fast',
      name: 'FAST-NU',
      slug: 'fast-nu',
      description: 'National University of Computer & Emerging Sciences Entry Test (CS & Engineering)',
      totalQuestions: 100,
      durationMinutes: 120,
      negativeMarking: 0.25,
    }
  ];

  for (const exam of examsData) {
    await prisma.exam.upsert({
      where: { id: exam.id },
      update: exam,
      create: exam,
    });
  }
  console.log(`✅ Seeded ${examsData.length} Exams`);

  // 2. Seed Subjects
  const subjectsData = [
    { id: 'sub-phy', examId: 'exam-mdcat', name: 'Physics', slug: 'physics', icon: 'Atom', order: 1 },
    { id: 'sub-chem', examId: 'exam-mdcat', name: 'Chemistry', slug: 'chemistry', icon: 'FlaskConical', order: 2 },
    { id: 'sub-bio', examId: 'exam-mdcat', name: 'Biology', slug: 'biology', icon: 'Dna', order: 3 },
    { id: 'sub-eng', examId: 'exam-mdcat', name: 'English', slug: 'english', icon: 'BookOpen', order: 4 },
    { id: 'sub-log', examId: 'exam-mdcat', name: 'Logical Reasoning', slug: 'logical-reasoning', icon: 'Brain', order: 5 },
    { id: 'sub-net-math', examId: 'exam-net', name: 'Advanced Mathematics', slug: 'adv-math-net', icon: 'Binary', order: 1 },
    { id: 'sub-net-iq', examId: 'exam-net', name: 'Intelligence & Analytical', slug: 'iq-net', icon: 'Lightbulb', order: 5 },
  ];

  for (const sub of subjectsData) {
    await prisma.subject.upsert({
      where: { id: sub.id },
      update: sub,
      create: sub,
    });
  }
  console.log(`✅ Seeded ${subjectsData.length} Subjects`);

  // 3. Seed Chapters
  const chaptersData = [
    { id: 'chap-mechanics', subjectId: 'sub-phy', name: 'Force & Motion (Mechanics)', slug: 'force-and-motion', order: 1 },
    { id: 'chap-work-energy', subjectId: 'sub-phy', name: 'Work & Energy', slug: 'work-and-energy', order: 2 },
    { id: 'chap-electrostatics', subjectId: 'sub-phy', name: 'Electrostatics', slug: 'electrostatics', order: 3 },
    { id: 'chap-organic', subjectId: 'sub-chem', name: 'Hydrocarbons & Organic Mechanisms', slug: 'organic-chemistry', order: 1 },
    { id: 'chap-bonding', subjectId: 'sub-chem', name: 'Chemical Bonding & Hybridization', slug: 'chemical-bonding', order: 2 },
    { id: 'chap-cell', subjectId: 'sub-bio', name: 'Cell Structure & Function', slug: 'cell-biology', order: 1 },
    { id: 'chap-genetics', subjectId: 'sub-bio', name: 'Genetics & Inheritance', slug: 'genetics', order: 2 },
    { id: 'chap-differentiation', subjectId: 'sub-net-math', name: 'Differentiation & Applications', slug: 'differentiation', order: 1 },
    { id: 'chap-integration', subjectId: 'sub-net-math', name: 'Definite & Indefinite Integration', slug: 'integration', order: 2 },
    { id: 'chap-grammar', subjectId: 'sub-eng', name: 'Grammar & Subject-Verb Agreement', slug: 'grammar-syntax', order: 1 },
  ];

  for (const chap of chaptersData) {
    await prisma.chapter.upsert({
      where: { id: chap.id },
      update: chap,
      create: chap,
    });
  }
  console.log(`✅ Seeded ${chaptersData.length} Chapters`);

  // 4. Seed Topics
  const topicsData = [
    { id: 'top-newton', chapterId: 'chap-mechanics', name: "Newton's Laws & Momentum", slug: 'newtons-laws', order: 1, masteryWeight: 1.2 },
    { id: 'top-projectile', chapterId: 'chap-mechanics', name: 'Projectile Motion & Trajectory', slug: 'projectile-motion', order: 2, masteryWeight: 1.1 },
    { id: 'top-work', chapterId: 'chap-work-energy', name: 'Work-Energy Theorem & Power', slug: 'work-energy-theorem', order: 1, masteryWeight: 1.0 },
    { id: 'top-coulomb', chapterId: 'chap-electrostatics', name: "Coulomb's Law & Electric Potential", slug: 'coulombs-law', order: 1, masteryWeight: 1.2 },
    { id: 'top-hydrocarbons', chapterId: 'chap-organic', name: 'Alkanes, Alkenes & Benzene', slug: 'hydrocarbons-benzene', order: 1, masteryWeight: 1.3 },
    { id: 'top-hybridization', chapterId: 'chap-bonding', name: 'Hybridization & VSEPR Theory', slug: 'hybridization-vsepr', order: 1, masteryWeight: 1.1 },
    { id: 'top-organelles', chapterId: 'chap-cell', name: 'Cell Organelles & Membranes', slug: 'cell-organelles', order: 1, masteryWeight: 1.0 },
    { id: 'top-mendel', chapterId: 'chap-genetics', name: "Mendel's Laws & Gene Interaction", slug: 'mendelian-genetics', order: 1, masteryWeight: 1.2 },
    { id: 'top-derivatives', chapterId: 'chap-differentiation', name: 'Derivative Rules & Chain Rule', slug: 'derivatives-chain-rule', order: 1, masteryWeight: 1.2 },
    { id: 'top-integrals', chapterId: 'chap-integration', name: 'Integration by Parts & Substitution', slug: 'integration-by-parts', order: 1, masteryWeight: 1.3 },
    { id: 'top-sva', chapterId: 'chap-grammar', name: 'Subject-Verb Agreement Rules', slug: 'subject-verb-agreement', order: 1, masteryWeight: 1.0 },
  ];

  for (const top of topicsData) {
    await prisma.topic.upsert({
      where: { id: top.id },
      update: top,
      create: top,
    });
  }
  console.log(`✅ Seeded ${topicsData.length} Topics`);

  // 5. Seed Questions
  const questionsData = [
    {
      id: 'q-phy-01',
      examId: 'exam-mdcat',
      subjectId: 'sub-phy',
      chapterId: 'chap-mechanics',
      topicId: 'top-newton',
      questionText: 'A body of mass 2 kg is dropped from a height of 20 m. Assuming g = 10 m/s² and negligible air resistance, what is its kinetic energy midway through its fall (at 10 m)?',
      optionA: '100 J',
      optionB: '200 J',
      optionC: '300 J',
      optionD: '400 J',
      correctOption: 'B',
      explanation: 'By the conservation of mechanical energy, the gain in kinetic energy equals the loss in potential energy. Loss in PE = m · g · Δh = 2 kg · 10 m/s² · (20 m - 10 m) = 200 J. Hence, the KE at the midpoint is exactly 200 J.',
      whyOthersWrong: 'A (100 J) assumes mass was 1 kg. C (300 J) is greater than total initial energy (400 J / 2 = 200 J). D (400 J) is the total energy at the very bottom just before impact.',
      hint: 'Use the work-energy theorem: loss in potential energy equals gain in kinetic energy.',
      difficulty: 'EASY',
      questionType: 'NUMERICAL',
      estimatedTimeSeconds: 40,
      tags: 'Mechanics, Conservation of Energy, MDCAT Past Paper',
      source: 'UHS MDCAT 2022',
      status: 'PUBLISHED',
      formulaLatex: 'E_k = m \\cdot g \\cdot \\Delta h',
    },
    {
      id: 'q-phy-02',
      examId: 'exam-mdcat',
      subjectId: 'sub-phy',
      chapterId: 'chap-mechanics',
      topicId: 'top-projectile',
      questionText: 'A projectile is launched with an initial velocity v at an angle θ with the horizontal. At the highest point of its trajectory, what are the magnitude of its velocity and acceleration respectively?',
      optionA: '0 and 0',
      optionB: 'v cos θ and 0',
      optionC: 'v cos θ and g downward',
      optionD: 'v sin θ and g downward',
      correctOption: 'C',
      explanation: 'At the apex of a projectile trajectory, the vertical velocity component becomes zero (v_y = 0), but the horizontal velocity component remains constant (v_x = v cos θ) in the absence of air resistance. The gravitational acceleration g acts continuously downward at all points.',
      whyOthersWrong: 'A assumes the projectile stops completely. B incorrectly claims acceleration is zero. D uses v sin θ which is zero at the summit.',
      hint: 'Gravity never turns off mid-flight, and horizontal velocity has no horizontal acceleration.',
      difficulty: 'MEDIUM',
      questionType: 'CONCEPTUAL',
      estimatedTimeSeconds: 45,
      tags: 'Projectile, Kinematics',
      source: 'NUMS 2021',
      status: 'PUBLISHED',
      formulaLatex: 'v_x = v_0 \\cos\\theta, \\quad a_y = -g',
    },
    {
      id: 'q-chem-01',
      examId: 'exam-mdcat',
      subjectId: 'sub-chem',
      chapterId: 'chap-bonding',
      topicId: 'top-hybridization',
      questionText: 'What is the hybridization and molecular geometry of the central carbon in the ethyne (acetylene, C₂H₂) molecule?',
      optionA: 'sp³, Tetrahedral',
      optionB: 'sp², Trigonal planar',
      optionC: 'sp, Linear',
      optionD: 'dsp², Square planar',
      correctOption: 'C',
      explanation: 'Each carbon atom in ethyne (H-C≡C-H) forms one single σ bond with hydrogen and one σ bond with the adjacent carbon (plus two unhybridized π bonds). Two electron domains correspond to sp hybridization with a linear bond angle of 180°.',
      whyOthersWrong: 'A describes methane (CH₄) with 4 σ bonds. B describes ethene (C₂H₄) with 3 σ domains. D is typical for transition metal complexes.',
      hint: 'Count only the sigma (σ) bonds and lone pairs on the central carbon atom.',
      difficulty: 'EASY',
      questionType: 'CONCEPTUAL',
      estimatedTimeSeconds: 30,
      tags: 'Hybridization, Chemical Bonding, MDCAT',
      source: 'PMDC Model Paper',
      status: 'PUBLISHED',
      formulaLatex: 'H-C \\equiv C-H \\quad (180^\\circ)',
    },
    {
      id: 'q-chem-02',
      examId: 'exam-mdcat',
      subjectId: 'sub-chem',
      chapterId: 'chap-organic',
      topicId: 'top-hydrocarbons',
      questionText: 'Which reagent and condition are required to convert benzene into nitrobenzene via electrophilic aromatic substitution?',
      optionA: 'Dilute HNO₃ at room temperature',
      optionB: 'Concentrated HNO₃ + Concentrated H₂SO₄ at 50°C–60°C',
      optionC: 'NaNO₂ + Dilute HCl at 0°C–5°C',
      optionD: 'HNO₃ + AlCl₃ at 100°C',
      correctOption: 'B',
      explanation: 'The nitration of benzene requires the nitronium ion (NO₂⁺) as the electrophile, generated by reacting concentrated nitric acid with concentrated sulfuric acid at 50°C–60°C.',
      whyOthersWrong: 'A is too weak to generate the NO₂⁺ electrophile. C is used for diazotization of aromatic amines. D pairs an incorrect Lewis acid.',
      hint: 'Sulfuric acid protonates nitric acid to produce the active nitronium ion NO₂⁺.',
      difficulty: 'MEDIUM',
      questionType: 'APPLICATION',
      estimatedTimeSeconds: 45,
      tags: 'Organic Chemistry, Benzene, Nitration',
      source: 'UHS MDCAT 2023',
      status: 'PUBLISHED',
      formulaLatex: 'HNO_3 + 2H_2SO_4 \\rightleftharpoons NO_2^+ + H_3O^+ + 2HSO_4^-',
    },
    {
      id: 'q-bio-01',
      examId: 'exam-mdcat',
      subjectId: 'sub-bio',
      chapterId: 'chap-cell',
      topicId: 'top-organelles',
      questionText: 'Which organelle contains hydrolytic enzymes responsible for autophagy and programmed cell death (apoptosis)?',
      optionA: 'Peroxisome',
      optionB: 'Lysosome',
      optionC: 'Golgi Apparatus',
      optionD: 'Smooth Endoplasmic Reticulum',
      correctOption: 'B',
      explanation: 'Lysosomes are single-membrane bound organelles containing acidic hydrolases (~pH 4.5–5.0) that degrade intracellular debris (autophagy) and trigger cellular autolysis in apoptosis.',
      whyOthersWrong: 'A degrades fatty acids and detoxifies hydrogen peroxide. C packages proteins. D synthesizes lipids.',
      hint: 'Known colloquially as the "suicide bags" of the eukaryotic cell.',
      difficulty: 'EASY',
      questionType: 'CONCEPTUAL',
      estimatedTimeSeconds: 30,
      tags: 'Cell Biology, Lysosomes, MDCAT Biology',
      source: 'SZABMU MDCAT 2023',
      status: 'PUBLISHED',
    },
    {
      id: 'q-math-01',
      examId: 'exam-net',
      subjectId: 'sub-net-math',
      chapterId: 'chap-differentiation',
      topicId: 'top-derivatives',
      questionText: 'What is the derivative with respect to x of f(x) = ln(sec x + tan x)?',
      optionA: 'sec x',
      optionB: 'tan x',
      optionC: 'sec² x',
      optionD: 'sec x · tan x',
      correctOption: 'A',
      explanation: "Using the chain rule: f'(x) = [1 / (sec x + tan x)] · (sec x · tan x + sec² x) = sec x.",
      whyOthersWrong: 'B is the derivative of ln(sec x). C is the derivative of tan x. D is the derivative of sec x.',
      hint: 'Factor out sec(x) from the derivative of the inner term in the numerator.',
      difficulty: 'MEDIUM',
      questionType: 'APPLICATION',
      estimatedTimeSeconds: 50,
      tags: 'Calculus, Derivatives, NET Engineering',
      source: 'NUST NET 2024 Past Paper',
      status: 'PUBLISHED',
      formulaLatex: '\\frac{d}{dx}\\ln(\\sec x + \\tan x) = \\sec x',
    },
    {
      id: 'q-eng-01',
      examId: 'exam-mdcat',
      subjectId: 'sub-eng',
      chapterId: 'chap-grammar',
      topicId: 'top-sva',
      questionText: 'Choose the grammatically correct sentence conforming to formal entry test syntax:',
      optionA: 'Neither the professor nor the students was present in the auditorium.',
      optionB: 'Neither the professor nor the students were present in the auditorium.',
      optionC: 'Neither the students nor the professor were present in the auditorium.',
      optionD: 'Neither the professor or the students were present in the auditorium.',
      correctOption: 'B',
      explanation: 'When subjects are joined by "neither... nor", the verb agrees with the closer subject (rule of proximity). Here, "students" is plural and adjacent to the verb, requiring the plural verb "were".',
      whyOthersWrong: 'A uses singular "was" with plural "students". C places singular "professor" closer to plural "were". D uses "or" with "neither".',
      hint: 'In "neither... nor" constructions, match the verb to the subject immediately preceding it.',
      difficulty: 'EASY',
      questionType: 'CONCEPTUAL',
      estimatedTimeSeconds: 30,
      tags: 'Subject-Verb Agreement, Syntax, English Grammar',
      source: 'UHS English 2023',
      status: 'PUBLISHED',
    }
  ];

  for (const q of questionsData) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: q,
      create: q,
    });
  }
  console.log(`✅ Seeded ${questionsData.length} Sample Questions`);

  // 6. Seed Users
  const studentPasswordHash = await bcrypt.hash('StudentPassword123!', 10);
  const adminPasswordHash = await bcrypt.hash('AdminPassword123!', 10);

  const demoStudent = await prisma.user.upsert({
    where: { email: 'ali@prepai.pk' },
    update: {},
    create: {
      id: 'user-ali-demo',
      name: 'Ali Khan',
      email: 'ali@prepai.pk',
      passwordHash: studentPasswordHash,
      role: 'STUDENT',
      educationLevel: 'FSc Pre-Medical',
      targetExamId: 'exam-mdcat',
      targetExamDate: new Date('2026-11-10T00:00:00.000Z'),
      dailyStudyTimeMinutes: 75,
      targetUniversity: 'King Edward Medical University / Army Medical College',
      currentLevel: 4,
      xp: 1420,
      streak: 12,
      longestStreak: 15,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  });

  const demoAdmin = await prisma.user.upsert({
    where: { email: 'admin@prepai.pk' },
    update: {},
    create: {
      id: 'user-admin-demo',
      name: 'PrepAI Administrator',
      email: 'admin@prepai.pk',
      passwordHash: adminPasswordHash,
      role: 'SUPER_ADMIN',
      dailyStudyTimeMinutes: 120,
      currentLevel: 10,
      xp: 9999,
      streak: 45,
      longestStreak: 60,
    },
  });

  console.log(`✅ Seeded Demo Student: ${demoStudent.email} and Admin: ${demoAdmin.email}`);

  // 7. Seed Mock Tests
  const mockTests = [
    {
      id: 'mock-mdcat-full-01',
      examId: 'exam-mdcat',
      title: 'MDCAT Grand Diagnostic Mock Exam 2026',
      description: 'Comprehensive 100-question PMDC format simulation covering Biology, Chemistry, Physics, and English with authentic time limits.',
      durationMinutes: 120,
      totalQuestions: 10,
      passingPercentage: 65.0,
      negativeMarkingRatio: 0.0,
      isOfficial: true,
    },
    {
      id: 'mock-ecat-speed-01',
      examId: 'exam-ecat',
      title: 'ECAT Math & Physics Speed Drill Simulation',
      description: 'Timed engineering drill with -1 negative marking penalty to calibrate accuracy under time pressure.',
      durationMinutes: 60,
      totalQuestions: 10,
      passingPercentage: 50.0,
      negativeMarkingRatio: 0.25,
      isOfficial: true,
    }
  ];

  for (const m of mockTests) {
    await prisma.mockTest.upsert({
      where: { id: m.id },
      update: m,
      create: m,
    });
  }
  console.log(`✅ Seeded ${mockTests.length} Mock Tests`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
