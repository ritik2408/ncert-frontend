export interface StudyGuideItem {
  topic: string;
  content: string;
}

export interface QuestionSolution {
  id: number;
  question: string;
  solution: string;
}

export interface Chapter {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  pdfUrl: string;
  studyGuide: StudyGuideItem[];
  solutions: QuestionSolution[];
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Chapter 1: Electric Charges and Fields",
    shortTitle: "Electric Charges & Fields",
    description: "This chapter introduces the fundamental concepts of electric charge, Coulomb's law, electric field, and Gauss's law.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph101.pdf",
    studyGuide: [
      {
        topic: "Electric Charge",
        content: "Charge is a fundamental property of matter. There are two types: positive and negative. Like charges repel, unlike charges attract."
      },
      {
        topic: "Coulomb's Law",
        content: "The force between two point charges is directly proportional to the product of their magnitudes and inversely proportional to the square of the distance between them."
      },
      {
        topic: "Electric Field",
        content: "An electric field is a region around a charged particle where a force would be exerted on other charged particles."
      },
      {
        topic: "Gauss's Law",
        content: "The total electric flux through a closed surface is equal to 1/ε0 times the net charge enclosed by the surface."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "What is the force between two small charged spheres having charges of 2 × 10⁻⁷ C and 3 × 10⁻⁷ C placed 30 cm apart in air?",
        solution: "Given: q1 = 2 × 10⁻⁷ C, q2 = 3 × 10⁻⁷ C, r = 0.3 m. F = (9 × 10⁹ × 2 × 10⁻⁷ × 3 × 10⁻⁷) / (0.3)² = 6 × 10⁻³ N."
      }
    ]
  },
  {
    id: 2,
    title: "Chapter 2: Electrostatic Potential and Capacitance",
    shortTitle: "Potential & Capacitance",
    description: "Explores electric potential, potential energy, and the concept of capacitance in electrical circuits.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph102.pdf",
    studyGuide: [
      {
        topic: "Electric Potential",
        content: "The work done per unit charge in bringing a positive test charge from infinity to a point in an electric field."
      },
      {
        topic: "Capacitance",
        content: "The ability of a system to store electric charge. C = Q/V."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "A 12pF capacitor is connected to a 50V battery. How much electrostatic energy is stored in the capacitor?",
        solution: "U = 1/2 CV². U = 0.5 × 12 × 10⁻¹² × 50² = 1.5 × 10⁻⁸ J."
      }
    ]
  },
  {
    id: 3,
    title: "Chapter 3: Current Electricity",
    shortTitle: "Current Electricity",
    description: "Covers electric current, Ohm's law, resistance, and complex circuit analysis using Kirchhoff's rules.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph103.pdf",
    studyGuide: [
      {
        topic: "Ohm's Law",
        content: "V = IR. The current through a conductor is proportional to the voltage across it, provided temperature remains constant."
      },
      {
        topic: "Kirchhoff's Rules",
        content: "Junction Rule: ΣI = 0. Loop Rule: ΣV = 0."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "The storage battery of a car has an emf of 12 V. If the internal resistance of the battery is 0.4 Ω, what is the maximum current that can be drawn from the battery?",
        solution: "I = E/r = 12 / 0.4 = 30 A."
      }
    ]
  }
];
