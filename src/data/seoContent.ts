export interface SEOContent {
  overview: string;
  importantTopics: string[];
  studyTips: string[];
  examStrategy: string;
  weightage?: { unit: string; marks: number }[];
  chapterDetails?: { title: string; description: string; topics: string[] }[];
}

export const subjectSEOData: Record<string, Record<string, SEOContent>> = {
  "class-12": {
    "physics": {
      overview: "Class 12 Physics is a pivotal subject for students aiming for careers in engineering and pure sciences. It bridges the gap between basic concepts and advanced physical theories. The curriculum is divided into two parts, covering everything from Electrostatics to modern Physics like Atoms and Nuclei.",
      weightage: [
        { unit: "Electrostatics & Current Electricity", marks: 16 },
        { unit: "Magnetic Effects of Current & Magnetism", marks: 17 },
        { unit: "Electromagnetic Induction & Alternating Currents", marks: 18 },
        { unit: "Electromagnetic Waves & Optics", marks: 18 },
        { unit: "Dual Nature of Radiation, Atoms & Nuclei", marks: 12 },
        { unit: "Electronic Devices", marks: 7 }
      ],
      chapterDetails: [
        {
          title: "Chapter 1: Electric Charges and Fields",
          description: "This chapter introduces the concept of electric charge, Coulomb's law, and the electric field. It is the foundation of electrostatics and explains how charges interact at a distance.",
          topics: [
            "Coulomb's Law in vector form",
            "Electric Field due to a dipole",
            "Gauss's Law and its applications",
            "Electric Flux and Continuous charge distribution"
          ]
        },
        {
          title: "Chapter 2: Electrostatic Potential and Capacitance",
          description: "Focuses on the work done in moving a charge in an electric field and the storage of energy in capacitors. It is crucial for understanding electronic circuits.",
          topics: [
            "Equipotential surfaces",
            "Potential energy of a system of charges",
            "Capacitance of a parallel plate capacitor",
            "Energy stored in a capacitor"
          ]
        },
        {
          title: "Chapter 3: Current Electricity",
          description: "Explores the motion of charges in conductors. It covers basic laws like Ohm's law and complex circuit analysis tools like Kirchhoff's rules.",
          topics: [
            "Drift velocity and mobility",
            "Kirchhoff's Laws and their applications",
            "Wheatstone Bridge and Meter Bridge",
            "Potentiometer and its sensitivity"
          ]
        }
      ],
      importantTopics: [
        "Electrostatic Potential and Capacitance",
        "Current Electricity and Kirchhoff's Laws",
        "Moving Charges and Magnetism",
        "Electromagnetic Induction and AC",
        "Optics (Ray and Wave)",
        "Dual Nature of Radiation and Matter",
        "Semiconductor Electronics"
      ],
      studyTips: [
        "Focus on derivations as they are frequently asked in board exams.",
        "Practice numerical problems daily to build speed and accuracy.",
        "Use circuit diagrams and ray diagrams to visualize complex concepts.",
        "Understand the SI units and dimensional formulas for all physical quantities."
      ],
      examStrategy: "Start with high-weightage chapters like Optics and Electrostatics. Ensure you have a strong grasp of the theory before attempting complex numericals. Use NCERT Solutions to understand the ideal way to present your answers."
    },
    "chemistry": {
      overview: "Class 12 Chemistry is divided into Physical, Organic, and Inorganic sections. It requires a balanced approach of understanding concepts, memorizing reactions, and practicing numericals. The subject is highly scoring if approached systematically.",
      importantTopics: [
        "Solutions and Colligative Properties",
        "Electrochemistry and Chemical Kinetics",
        "d and f Block Elements",
        "Coordination Compounds",
        "Haloalkanes and Haloarenes",
        "Alcohols, Phenols and Ethers",
        "Biomolecules"
      ],
      studyTips: [
        "Maintain a separate notebook for named reactions in Organic Chemistry.",
        "Practice the structures of p-block and d-block elements regularly.",
        "Focus on the reasoning questions from Inorganic Chemistry.",
        "Solve previous year papers to understand the pattern of case-based questions."
      ],
      examStrategy: "Physical Chemistry is numerical-heavy, so practice formulas. Organic Chemistry is about mechanisms and conversions. Inorganic requires thorough reading of NCERT textbooks."
    },
    "maths": {
      overview: "Class 12 Mathematics is the foundation for higher technical education. It emphasizes Calculus, Algebra, and Probability. Consistency is the key to mastering this subject.",
      importantTopics: [
        "Relations and Functions",
        "Inverse Trigonometric Functions",
        "Matrices and Determinants",
        "Calculus (Differentiation and Integration)",
        "Differential Equations",
        "Vectors and 3D Geometry",
        "Linear Programming"
      ],
      studyTips: [
        "Understand the properties of Integrals and Derivatives thoroughly.",
        "Practice 3D Geometry with diagrams to avoid visualization errors.",
        "Matrices and Determinants are scoring; ensure you don't make calculation mistakes.",
        "Solve NCERT Exemplar for higher-level thinking problems."
      ],
      examStrategy: "Time management is crucial. Start with sections you are most confident in. Always show step-by-step calculations as CBSE provides step-marking."
    }
  },
  "class-11": {
    "physics": {
      overview: "Class 11 Physics introduces students to the fundamental laws of nature, from Mechanics to Thermodynamics. It is the base for Class 12 and competitive exams like JEE and NEET.",
      importantTopics: [
        "Units and Measurements",
        "Motion in a Straight Line and Plane",
        "Laws of Motion",
        "Work, Energy and Power",
        "Gravitation",
        "Thermodynamics",
        "Waves and Oscillations"
      ],
      studyTips: [
        "Master Vectors and Basic Calculus as they are used throughout Physics.",
        "Focus on Free Body Diagrams (FBD) in Mechanics.",
        "Understand the conceptual difference between Heat and Temperature.",
        "Don't skip the 'Points to Ponder' section in NCERT."
      ],
      examStrategy: "Mechanics forms the bulk of the syllabus. Focus on understanding the 'why' behind physical laws rather than just memorizing formulas."
    }
  },
  "class-10": {
    "science": {
      overview: "Class 10 Science is a crucial milestone that integrates Physics, Chemistry, and Biology. It builds the foundation for choosing streams in higher secondary education.",
      importantTopics: [
        "Chemical Reactions and Equations",
        "Acids, Bases and Salts",
        "Life Processes",
        "Control and Coordination",
        "Light - Reflection and Refraction",
        "Human Eye and Colorful World",
        "Electricity"
      ],
      studyTips: [
        "Draw neat and labeled diagrams for Biology.",
        "Practice balancing chemical equations regularly.",
        "Understand the sign conventions for spherical mirrors and lenses.",
        "Learn the circuit symbols and Ohm's Law applications."
      ],
      examStrategy: "Divide your time equally between the three sections. Biology requires good memory, Chemistry requires logic, and Physics requires practice."
    }
  }
};

export const getGenericSEOContent = (subject: string, classLevel: string): SEOContent => ({
  overview: `${subject} for ${classLevel} is designed to provide students with a comprehensive understanding of the subject matter as per the NCERT curriculum. It covers all essential concepts required for academic excellence.`,
  importantTopics: [
    "Core conceptual understanding",
    "Application-based questions",
    "Important definitions and terminology",
    "Previous year exam trends"
  ],
  studyTips: [
    "Read the NCERT textbook thoroughly.",
    "Make concise notes for quick revision.",
    "Practice questions from the back of each chapter.",
    "Discuss difficult topics with teachers or peers."
  ],
  examStrategy: "Focus on understanding the syllabus weightage. Prioritize chapters that carry more marks and ensure you practice writing answers in a structured format."
});
