import { AIService, AIChatMessage, AIChatContext, GeneratedMCQ } from './types';
import { Difficulty, QuestionType, MistakeType } from '@/types';

export class MockAIService implements AIService {
  async chat(messages: AIChatMessage[], context?: AIChatContext): Promise<string> {
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
    const exam = context?.targetExam || 'MDCAT / ECAT / NET';
    const topic = context?.topic || 'General Science & Reasoning';

    if (lastMessage.includes('simply') || lastMessage.includes('explain simply')) {
      return `### 💡 Simple Conceptual Breakdown: ${topic}\n\nThink of this concept like water flowing through a garden pipe:\n\n1. **The Core Law**: Every action produces a direct proportional reaction in equilibrium.\n2. **The Analogy**: When you increase the pressure, the flow rate increases unless resistance builds up.\n3. **Pakistan Entry Test Shortcut**: In ${exam}, questions on this topic usually test ratio changes. If parameter $A$ doubles, check whether parameter $B$ scales linearly ($k \\cdot x$) or quadratically ($k \\cdot x^2$).\n\n*Would you like me to give you a quick 1-minute drill question to test this?*`;
    }

    if (lastMessage.includes('example') || lastMessage.includes('give me an example')) {
      return `### 📝 Realistic ${exam} Example Problem\n\n**Problem:**\nA vehicle starts from rest with uniform acceleration $a = 4\\text{ m/s}^2$. What distance does it cover during the 3rd second of its motion?\n\n**Step-by-Step Thought Process:**\n- *Trap to avoid:* Don't use $S = \\frac{1}{2} a t^2$ with $t=3$ because that gives the **total** distance in 3 seconds!\n- *Formula for $n$-th second:* $S_n = u + \\frac{a}{2}(2n - 1)$\n- Here $u = 0$, $a = 4$, $n = 3$:\n$$S_3 = 0 + \\frac{4}{2}(2(3) - 1) = 2 \\times 5 = 10\\text{ m}$$\n\nNotice how remembering the $n$-th second shortcut saves you 45 seconds in entry tests!`;
    }

    if (lastMessage.includes('shortcut') || lastMessage.includes('trick')) {
      return `### ⚡ High-Yield Entry Test Shortcut for ${topic}\n\nWhen solving questions under time pressure (under 45 seconds):\n\n1. **Dimensional Analysis:** Look at the options before calculating. Often 2 options have wrong units or impossible signs.\n2. **Extreme Value Substitution:** Set variables to 0, 1, or infinity to eliminate distractors in algebraic MCQs.\n3. **Proportionality Rule:** Write the formula, circle the constant terms, and relate the remaining variables directly.\n\nWhich specific question would you like to apply this shortcut to right now?`;
    }

    if (lastMessage.includes('notes') || lastMessage.includes('revision notes')) {
      return `### 📚 Rapid Revision Notes: ${topic}\n\n- **Definition & Formula:** Core governing equation and boundary conditions.\n- **SI Units & Dimensions:** Check standard dimensions and fundamental conversion factors.\n- **High-Yield Past Paper Themes:** Frequently tested in ${exam} past papers from 2018–2024.\n- **Common Student Trap:** Confusing instantaneous rate with average rate.\n- **Quick Self-Check:** Can you write the governing formula without looking?`;
    }

    if (lastMessage.includes('quiz') || lastMessage.includes('test me')) {
      return `### 🎯 Quick Diagnostic Quiz on ${topic}\n\n**Question:**\nIf the radius of a circular path is doubled while keeping the centripetal force constant, what happens to the linear speed $v$?\n\n- **A)** Remains unchanged\n- **B)** Increases by a factor of $\\sqrt{2}$\n- **C)** Doubles\n- **D)** Halves\n\nReply with your option and your 1-line reasoning, and I will guide your solution!`;
    }

    return `Hello! I am your **PrepAI Academic Mentor**, calibrated specifically for Pakistani entry tests like **${exam}**.\n\nI can help you:\n- Break down difficult concepts into simple, memorable mental models\n- Teach you entry-test calculation shortcuts (solving in < 45 seconds)\n- Provide step-by-step Socratic hints without spoiling answers\n- Analyze your repeated mistakes and formulate targeted speed drills\n\nWhat topic or specific question are we working on right now?`;
  }

  async getSocraticHint(params: {
    questionText: string;
    options: { A: string; B: string; C: string; D: string };
    hintLevel: 1 | 2;
    previousHints?: string[];
    userAnswer?: string;
  }): Promise<{ hint: string; guidingQuestion: string }> {
    if (params.hintLevel === 1) {
      return {
        hint: `Start by identifying what physical/mathematical quantities are given and what is explicitly asked. Pay special attention to whether any quantity remains constant or conserved.`,
        guidingQuestion: `Which fundamental law or formula connects the given parameters directly?`,
      };
    } else {
      return {
        hint: `Notice the relationships between the options. Substitute the given boundary conditions into the core equation. Check if any option can be eliminated right away due to incorrect proportionality.`,
        guidingQuestion: `If you isolate the target variable on the left side, what does the right side evaluate to?`,
      };
    }
  }

  async explainMistake(params: {
    questionText: string;
    selectedOption: string;
    selectedText: string;
    correctOption: string;
    correctText: string;
    explanation: string;
    mistakeType?: MistakeType;
    topicName?: string;
  }): Promise<{
    misconception: string;
    whyStudentChoseThis: string;
    keyRuleToRemember: string;
    howToAvoidNextTime: string;
    similarQuestionHint: string;
  }> {
    return {
      misconception: `Confusing proportional changes with inverse or quadratic relationships under specific boundary constraints in ${params.topicName || 'this topic'}.`,
      whyStudentChoseThis: `Option ${params.selectedOption} (${params.selectedText}) is a common distractor designed for students who apply a simplified linear equation instead of checking whether another variable was held constant.`,
      keyRuleToRemember: `Always write the complete relationship formula and verify all assumptions before plugging in numerical values.`,
      howToAvoidNextTime: `Under exam pressure, spend 3 seconds underlining the keywords: 'constant', 'initial', 'maximum', or 'rate'.`,
      similarQuestionHint: `Focus on the exponent of the dependent variable to determine the correct scaling factor.`,
    };
  }

  async generateMCQs(params: {
    examName: string;
    subjectName: string;
    chapterName?: string;
    topicName: string;
    difficulty: Difficulty;
    questionType: QuestionType;
    count: number;
  }): Promise<GeneratedMCQ[]> {
    const list: GeneratedMCQ[] = [];
    const templates = [
      {
        q: `In ${params.subjectName} (${params.topicName}), when a system undergoes a transition under standard conditions, what is the net effect on the primary state function?`,
        a: `Increases proportionally with the absolute temperature`,
        b: `Decreases inversely with the square of volume`,
        c: `Remains invariant because it is a cyclic state variable`,
        d: `Fluctuates depending solely on the path chosen`,
        correct: 'C' as const,
        explanation: `State functions (like internal energy, enthalpy, entropy) depend only on initial and final states. In a cyclic process or equilibrium state, their net change over the closed cycle is identically zero.`,
        hint: `Recall the definition of a state function versus a path-dependent function.`,
      },
      {
        q: `Consider a sample analyzed in ${params.topicName}. If the initial rate of the reaction triples when the concentration of reactant $X$ is increased by a factor of $\\sqrt{3}$, what is the reaction order with respect to $X$?`,
        a: `Order 0.5`,
        b: `Order 1`,
        c: `Order 2`,
        d: `Order 3`,
        correct: 'C' as const,
        explanation: `Rate $\\propto [X]^n$. Here $3 = (\\sqrt{3})^n = 3^{n/2} \\implies n/2 = 1 \\implies n = 2$. Therefore, the reaction is second order with respect to $X$.`,
        hint: `Express the rate law as $R = k[X]^n$ and equate exponents using powers of 3.`,
      },
      {
        q: `A particle executes periodic motion associated with ${params.topicName}. If its total mechanical energy is $E$, what is its potential energy when its displacement is half of its maximum amplitude?`,
        a: `$\\frac{1}{4} E$`,
        b: `$\\frac{1}{2} E$`,
        c: `$\\frac{3}{4} E$`,
        d: `$\\frac{1}{\\sqrt{2}} E$`,
        correct: 'A' as const,
        explanation: `Potential energy $U = \\frac{1}{2} k x^2$. When $x = \\frac{A}{2}$, $U = \\frac{1}{2} k \\left(\\frac{A}{2}\\right)^2 = \\frac{1}{4} \\left(\\frac{1}{2} k A^2\\right) = \\frac{1}{4} E$.`,
        hint: `Remember that potential energy scales with the square of the displacement.`,
      },
      {
        q: `Which of the following statements regarding ${params.topicName} is strictly consistent with the official ${params.examName} syllabus?`,
        a: `It violates conservation of energy at microscopic scales`,
        b: `It operates strictly in accordance with thermodynamic and kinetic equilibrium`,
        c: `It is completely independent of external catalyst or medium effects`,
        d: `It can only occur in idealized non-inertial reference systems`,
        correct: 'B' as const,
        explanation: `All physical and chemical phenomena in ${params.subjectName} conform to fundamental thermodynamic conservation laws and kinetic equilibrium principles tested in ${params.examName}.`,
        hint: `Identify the universally true law among the choices.`,
      },
    ];

    for (let i = 0; i < params.count; i++) {
      const t = templates[i % templates.length];
      list.push({
        questionText: `[Q${i + 1}] ${t.q}`,
        optionA: t.a,
        optionB: t.b,
        optionC: t.c,
        optionD: t.d,
        correctOption: t.correct,
        explanation: t.explanation,
        whyOthersWrong: `Other options reflect classic distractors that ignore either exponential relationships or thermodynamic conservation constraints.`,
        hint: t.hint,
        difficulty: params.difficulty,
        questionType: params.questionType,
        formulaLatex: `E = mc^2`,
        conceptTested: `${params.topicName} fundamentals`,
        estimatedTimeSeconds: params.difficulty === 'HARD' ? 75 : 50,
      });
    }

    return list;
  }

  async analyzeMockTest(params: {
    testTitle: string;
    examName: string;
    totalQuestions: number;
    score: number;
    accuracy: number;
    timeSpentSeconds: number;
    subjectStats: Array<{ subject: string; correct: number; total: number; accuracy: number }>;
    weakTopics: string[];
  }): Promise<{
    overallSummary: string;
    strengths: string[];
    weaknesses: string[];
    speedAnalysis: string;
    actionableRecommendations: string[];
    predictedExamScore: string;
  }> {
    const avgSecPerQuestion = Math.round(params.timeSpentSeconds / (params.totalQuestions || 1));
    const isSpeedIssue = avgSecPerQuestion > 65;

    return {
      overallSummary: `You achieved ${params.accuracy.toFixed(1)}% accuracy on '${params.testTitle}' for ${params.examName}. Your conceptual foundation is stable, but timing and precision under exam pressure require targeted speed drills.`,
      strengths: params.subjectStats.filter(s => s.accuracy >= 70).map(s => `${s.subject} (${s.accuracy}% accuracy)`),
      weaknesses: params.weakTopics.length > 0 ? params.weakTopics : ['High-difficulty numerical calculation questions'],
      speedAnalysis: isSpeedIssue 
        ? `You averaged ${avgSecPerQuestion} seconds per MCQ, which is higher than the recommended 45–54 second benchmark for ${params.examName}. You spent disproportionate time recalculating numerical problems.`
        : `Your pacing was solid at ${avgSecPerQuestion} seconds per MCQ, leaving adequate time for review.`,
      actionableRecommendations: [
        `Complete a 15-question speed drill targeting ${params.weakTopics[0] || 'Physics Numericals'}.`,
        `Review the formula sheet for kinematics and electrostatics before your next mock.`,
        `Practice the 2-pass strategy: solve all instant recall MCQs first, then circle back for multi-step calculations.`,
      ],
      predictedExamScore: `${Math.min(98, Math.max(45, Math.round(params.accuracy * 0.95 + 4)))}% (estimated based on current percentile distribution)`,
    };
  }

  async generateStudyPlan(params: {
    examName: string;
    examDate: string;
    dailyMinutes: number;
    weakTopics: string[];
    strongTopics: string[];
    targetScore: number;
  }): Promise<{
    headline: string;
    weeklyFocus: Array<{
      day: string;
      focusSubject: string;
      tasks: string[];
      targetMinutes: number;
    }>;
    tacticalAdvice: string[];
  }> {
    return {
      headline: `Targeted ${params.dailyMinutes}-Minute Daily Strategy for ${params.examName}`,
      weeklyFocus: [
        {
          day: 'Monday',
          focusSubject: 'Physics & Weak Topics',
          tasks: ['15 min review of weak formulas', '30 min targeted MCQ practice', '15 min error notebook analysis'],
          targetMinutes: params.dailyMinutes,
        },
        {
          day: 'Tuesday',
          focusSubject: 'Chemistry (Organic & Physical)',
          tasks: ['20 min reaction mechanism review', '35 min medium difficulty MCQs', '5 min flashcards'],
          targetMinutes: params.dailyMinutes,
        },
        {
          day: 'Wednesday',
          focusSubject: 'Biology / Mathematics Core',
          tasks: ['25 min diagram/formula mastery', '30 min timed speed drill', '5 min summary notes'],
          targetMinutes: params.dailyMinutes,
        },
        {
          day: 'Thursday',
          focusSubject: 'English & Analytical Reasoning',
          tasks: ['15 min vocabulary & grammar rules', '30 min logical reasoning practice', '15 min AI tutor drill'],
          targetMinutes: params.dailyMinutes,
        },
        {
          day: 'Friday',
          focusSubject: 'Full Mixed Practice Drill',
          tasks: ['45 min mixed test session', '15 min mistake notebook review'],
          targetMinutes: params.dailyMinutes,
        },
        {
          day: 'Saturday',
          focusSubject: 'Full-Length Timed Mock Exam',
          tasks: ['Simulated entry test conditions', 'Review post-test AI diagnostic report'],
          targetMinutes: params.dailyMinutes + 30,
        },
        {
          day: 'Sunday',
          focusSubject: 'Revision & Spaced Repetition',
          tasks: ['Review all bookmarked questions', 'Clear unresolved items from Mistake Notebook'],
          targetMinutes: Math.round(params.dailyMinutes * 0.75),
        },
      ],
      tacticalAdvice: [
        `Never practice without a countdown timer. Pacing is 50% of the entry test score.`,
        `Every question you get wrong must be categorized in your Mistake Notebook immediately.`,
        `Prioritize high-yield chapters that carry 60%+ weightage in ${params.examName}.`,
      ],
    };
  }

  async generateFlashcards(params: {
    topicName: string;
    subjectName: string;
    count: number;
  }): Promise<Array<{ front: string; back: string; difficulty: 'EASY' | 'MEDIUM' | 'HARD' }>> {
    return [
      {
        front: `What is the core law governing ${params.topicName}?`,
        back: `The rate of change or conservation condition holds constant across closed boundaries under equilibrium.`,
        difficulty: 'EASY',
      },
      {
        front: `What is the key mathematical formula tested in ${params.topicName}?`,
        back: `$$F = k \\cdot \\frac{q_1 q_2}{r^2} \\quad \\text{or} \\quad \\Delta U = Q - W$$`,
        difficulty: 'MEDIUM',
      },
      {
        front: `What is the most frequent trap in past entry test papers for ${params.topicName}?`,
        back: `Forgetting that when distance or radius is halved, inverse square laws increase the resulting field or force by a factor of 4.`,
        difficulty: 'HARD',
      },
    ];
  }

  async generateTopicSummary(params: {
    topicName: string;
    subjectName: string;
  }): Promise<{
    overview: string;
    keyFormulas: string[];
    commonTraps: string[];
    highYieldPoints: string[];
  }> {
    return {
      overview: `${params.topicName} is a high-yield topic in ${params.subjectName}. Entry tests specifically evaluate your grasp of fundamental definitions, dimensional formulas, and graphical relationships.`,
      keyFormulas: [
        `Core Equation: $y = f(x)$ with boundary conditions`,
        `Conservation principle: $E_{\\text{total}} = \\text{constant}$`,
        `Proportionality factor: $k = \\frac{1}{4\\pi \\varepsilon_0}$`,
      ],
      commonTraps: [
        `Using standard time equations when acceleration is variable instead of uniform.`,
        `Confusing standard molar units with mass units in stoichiometric equations.`,
        `Overlooking negative signs indicating work done BY the system versus ON the system.`,
      ],
      highYieldPoints: [
        `Accounted for 3–5 questions in recent past papers.`,
        `Questions are split between 40% conceptual recall and 60% ratio calculations.`,
        `Mastering the 3 primary shortcuts cuts average solving time from 80s to 35s.`,
      ],
    };
  }
}
