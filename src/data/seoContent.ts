export interface ChapterTopicLink {
  name: string;
  href: string;
}

export interface ChapterDetail {
  title: string;
  description: string;
  topics: string[];
  topicLinks?: ChapterTopicLink[];
  solutionLink?: string;
}

export interface SEOContent {
  overview: string;
  importantTopics: string[];
  studyTips: string[];
  examStrategy: string;
  weightage?: { unit: string; marks: number }[];
  chapterDetails?: ChapterDetail[];
}

export const subjectSEOData: Record<string, Record<string, SEOContent>> = {
  "class-12": {
    "physics": {
      overview: "Class 12 Physics is a important subject for students aiming for careers in engineering and pure sciences. It bridges the gap between basic concepts and advanced physical theories. The curriculum is divided into two parts, covering everything from Electrostatics to modern Physics like Atoms and Nuclei.",
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
          title: "Class 12 Physics Notes for Chapter 1: Electric Charges and Fields",
          description: "The Class 12 Physics chapter 1 deals with the studies on Electric Charges and Fields. In this chapter the Gauss's law, Coulomb's Law, Dipole in a Uniform External Field are also described.",
          topics: ["Electric Charges", "Maxwell's Equations", "Conservation of Charge", "Electric Dipole", "Electric Flux", "Electric Field", "Applications of Gauss's Law", "Electrostatic Potential and Capacitance"],
          topicLinks: [
            { name: "Electric Charges", href: "/chapter/1" },
            { name: "Maxwell's Equations", href: "/chapter/1" },
            { name: "Conservation of Charge", href: "/chapter/1" },
            { name: "Electric Dipole", href: "/chapter/1" },
            { name: "Electric Flux", href: "/chapter/1" },
            { name: "Electric Field", href: "/chapter/1" },
            { name: "Applications of Gauss's Law", href: "/chapter/1" },
            { name: "Electrostatic Potential and Capacitance", href: "/chapter/2" }
          ],
          solutionLink: "/chapter/1"
        },
        {
          title: "Class 12 Physics Notes for Chapter 2: Electrostatic Potential and Capacitance",
          description: "In the Class 12 Physics Chapter 2, the ideas of Electrostatic Potential and Capacitance are discussed. These ideas are also crucial for understanding basic electrical circuits and electronic devices.",
          topics: ["Electrostatic Potential", "Equipotential Surfaces", "Potential due to a System of Charges", "Dielectrics and Polarisation", "Electrostatic Shielding", "Capacitors and Capacitance"],
          topicLinks: [
            { name: "Electrostatic Potential", href: "/chapter/2" },
            { name: "Equipotential Surfaces", href: "/chapter/2" },
            { name: "Potential due to a System of Charges", href: "/chapter/2" },
            { name: "Dielectrics and Polarisation", href: "/chapter/2" },
            { name: "Electrostatic Shielding", href: "/chapter/2" },
            { name: "Capacitors and Capacitance", href: "/chapter/2" }
          ],
          solutionLink: "/chapter/2"
        },
        {
          title: "Class 12 Physics Notes for Chapter 3: Current Electricity",
          description: "The Class 12 Physics Chapter 3 includes the topics Electric Current, Wheatstone Bridge, Potentiometer, Resistor Colour Codes. In this chapter, you will also learn concepts like Ampere, Drift Velocity, and Electromotive Force.",
          topics: ["Kirchhoff's Rules", "Ohm's Law And its Limitations", "Meter Bridge", "Electric Current Formula", "Cells, emf, Internal Resistance", "Combination of Resistors - Series and Parallel", "Cells in Series and in Parallel", "Static Electricity", "Difference between emf and voltage"],
          topicLinks: [
            { name: "Kirchhoff's Rules", href: "/chapter/3" },
            { name: "Ohm's Law And its Limitations", href: "/chapter/3" },
            { name: "Meter Bridge", href: "/chapter/3" },
            { name: "Electric Current Formula", href: "/chapter/3" },
            { name: "Cells, emf, Internal Resistance", href: "/chapter/3" },
            { name: "Combination of Resistors - Series and Parallel", href: "/chapter/3" },
            { name: "Cells in Series and in Parallel", href: "/chapter/3" },
            { name: "Static Electricity", href: "/chapter/3" },
            { name: "Difference between emf and voltage", href: "/chapter/3" }
          ],
          solutionLink: "/chapter/3"
        },
        {
          title: "Class 12 Physics Notes for Chapter 4: Moving Charges and Magnetism",
          description: "In the Class 12 Physics Chapter 4, the basic concepts of Magnetism along with the ideas of Lorentz Force and Biot-Savart Law are explained.",
          topics: ["Magnetic Force and Magnetic Field", "Ampere's Circuital Law", "The Moving Coil Galvanometer", "Solenoid and the Toroids", "Derivation of Lorentz transformation", "Magnetic Field on the Axis of a Circular Current Loop", "Cyclotron"],
          topicLinks: [
            { name: "Magnetic Force and Magnetic Field", href: "/chapter/4" },
            { name: "Ampere's Circuital Law", href: "/chapter/4" },
            { name: "The Moving Coil Galvanometer", href: "/chapter/4" },
            { name: "Solenoid and the Toroids", href: "/chapter/4" },
            { name: "Derivation of Lorentz transformation", href: "/chapter/4" },
            { name: "Magnetic Field on the Axis of a Circular Current Loop", href: "/chapter/4" },
            { name: "Cyclotron", href: "/chapter/4" }
          ],
          solutionLink: "/chapter/4"
        },
        {
          title: "Class 12 Physics Notes for Chapter 5: Magnetism and Matter",
          description: "This Class 12 Physics chapter includes the relationship between magnetism and various matters. The related concepts like Magnetism and Gauss's Law, Ferromagnetism, Magnetic Susceptibility, Magnetic Relay are also included.",
          topics: ["Magnetic Properties of Materials", "Magnetisation and Magnetic Intensity", "Difference between electromagnet and permanent magnet", "Permanent Magnets and Electromagnets", "The Earth's Magnetism", "Curie Weiss Law", "Magnetometer", "Einstein Field Equation"],
          topicLinks: [
            { name: "Magnetic Properties of Materials", href: "/chapter/5" },
            { name: "Magnetisation and Magnetic Intensity", href: "/chapter/5" },
            { name: "Difference between electromagnet and permanent magnet", href: "/chapter/5" },
            { name: "Permanent Magnets and Electromagnets", href: "/chapter/5" },
            { name: "The Earth's Magnetism", href: "/chapter/5" },
            { name: "Curie Weiss Law", href: "/chapter/5" },
            { name: "Magnetometer", href: "/chapter/5" },
            { name: "Einstein Field Equation", href: "/chapter/5" }
          ],
          solutionLink: "/chapter/5"
        },
        {
          title: "Class 12 Physics Notes for Chapter 6: Electromagnetic Induction",
          description: "This Class 12 Physics chapter includes the explanations of the concepts like Magnetic Flux, Faraday's Law of Induction, Lenz's Law and Conservation of Energy. This chapter also includes the detailed studies of Unit of Magnetic Flux, Motional emf.",
          topics: ["Electromagnetism", "Faraday's Law of Electromagnetic Induction", "Eddy Currents", "Types of generators"],
          topicLinks: [
            { name: "Electromagnetism", href: "/chapter/6" },
            { name: "Faraday's Law of Electromagnetic Induction", href: "/chapter/6" },
            { name: "Eddy Currents", href: "/chapter/6" },
            { name: "Types of Generators", href: "/chapter/6" }
          ],
          solutionLink: "/chapter/6"
        },
        {
          title: "Class 12 Physics Notes for Chapter 7: Alternating Current",
          description: "In the Class 12 Physics Chapter 7, the core concept related to Alternating Current is explained. This chapter includes the explanations of LC Oscillations and Transformers, Power in AC Circuit, and the Power Factor.",
          topics: ["LC Oscillations", "Root Mean Square Power", "Power in AC Circuit, the Power Factor", "Sharpness of Resonance", "Impedance and Capacitative Reactance", "AC Voltage Applied to a Capacitor", "Difference between a capacitor and an inductor", "Relation between line voltage and phase voltage", "AC Voltage Applied to a Series LCR Circuit", "AC Voltage Applied to a Resistor"],
          topicLinks: [
            { name: "LC Oscillations", href: "/chapter/7" },
            { name: "Root Mean Square Power", href: "/chapter/7" },
            { name: "Power in AC Circuit, the Power Factor", href: "/chapter/7" },
            { name: "Sharpness of Resonance", href: "/chapter/7" },
            { name: "Impedance and Capacitative Reactance", href: "/chapter/7" },
            { name: "AC Voltage Applied to a Capacitor", href: "/chapter/7" },
            { name: "Difference between a capacitor and an inductor", href: "/chapter/7" },
            { name: "Relation between line voltage and phase voltage", href: "/chapter/7" },
            { name: "AC Voltage Applied to a Series LCR Circuit", href: "/chapter/7" },
            { name: "AC Voltage Applied to a Resistor", href: "/chapter/7" }
          ],
          solutionLink: "/chapter/7"
        },
        {
          title: "Class 12 Physics Notes for Chapter 8: Electromagnetic Waves",
          description: "This Class 12 Physics chapter can be considered as the introductory chapter to the concept of Electromagnetic Waves, along with the ideas of Maxwell Equations and Gamma Radiation.",
          topics: ["Displacement Current", "Electromagnetic Spectrum", "Impedance of free space", "X Ray", "Infrared Radiation"],
          topicLinks: [
            { name: "Displacement Current", href: "/chapter/8" },
            { name: "Electromagnetic Spectrum", href: "/chapter/8" },
            { name: "Impedance of free space", href: "/chapter/8" },
            { name: "X-Ray", href: "/chapter/8" },
            { name: "Infrared Radiation", href: "/chapter/8" }
          ],
          solutionLink: "/chapter/8"
        },
        {
          title: "Class 12 Physics Notes for Chapter 9: Ray Optics and Optical Instruments",
          description: "The Class 12 Physics chapter deals with the ideas of Reflection and Refraction. The important topics related to Ray Optics and Optical Instruments include reflection of light by spherical mirrors and refraction.",
          topics: ["Reflection of Light by Spherical Mirrors", "Refraction at a Plane Surface", "Total Internal Reflection", "Refraction at a Spherical Surface", "Dispersion through a Prism", "Expression for Prism Formula", "Difference between simple and compound microscope", "Power of a Concave Mirror", "Uses of Concave Mirror", "Refraction At Spherical Surfaces and By Lenses"],
          topicLinks: [
            { name: "Reflection of Light by Spherical Mirrors", href: "/chapter/9" },
            { name: "Refraction at a Plane Surface", href: "/chapter/9" },
            { name: "Total Internal Reflection", href: "/chapter/9" },
            { name: "Refraction at a Spherical Surface", href: "/chapter/9" },
            { name: "Dispersion through a Prism", href: "/chapter/9" },
            { name: "Expression for Prism Formula", href: "/chapter/9" },
            { name: "Difference between simple and compound microscope", href: "/chapter/9" },
            { name: "Power of a Concave Mirror", href: "/chapter/9" },
            { name: "Uses of Concave Mirror", href: "/chapter/9" },
            { name: "Refraction At Spherical Surfaces and By Lenses", href: "/chapter/9" }
          ],
          solutionLink: "/chapter/9"
        },
        {
          title: "Class 12 Physics Notes for Chapter 10: Wave Optics",
          description: "The Physics Class 12 chapter of Wave Optics includes the study of the relations between light and waves. This chapter also explains concepts like Huygens Principle, Brewster's Law and Coherent Sources.",
          topics: ["Polarisation", "Diffraction", "Difference between diffraction and interference", "Coherent and Incoherent Addition of Waves", "Doppler Effect Formula", "Interference of Light Waves and Young's Experiment", "Raman Scattering", "Brewster's Law Formula"],
          topicLinks: [
            { name: "Polarisation", href: "/chapter/10" },
            { name: "Diffraction", href: "/chapter/10" },
            { name: "Difference between diffraction and interference", href: "/chapter/10" },
            { name: "Coherent and Incoherent Addition of Waves", href: "/chapter/10" },
            { name: "Doppler Effect Formula", href: "/chapter/10" },
            { name: "Interference of Light Waves and Young's Experiment", href: "/chapter/10" },
            { name: "Raman Scattering", href: "/chapter/10" },
            { name: "Brewster's Law Formula", href: "/chapter/10" }
          ],
          solutionLink: "/chapter/10"
        },
        {
          title: "Class 12 Physics Notes for Chapter 11: Dual Nature of Radiation and Matter",
          description: "This Class 12 Physics chapter introduced the concept of Dual Nature of Radiation and Matter. The related concepts include Experimental Study of Photoelectric Effect and Einstein's Photoelectric Equation.",
          topics: ["Photoelectric Effect", "De Broglie Wavelength Formula", "Davisson and Germer Experiment", "Electron Emission", "Compton Wavelength", "Particle Nature of Light: The Photon", "Planck Equation", "Quantum Theory of Light"],
          topicLinks: [
            { name: "Photoelectric Effect", href: "/chapter/11" },
            { name: "De Broglie Wavelength Formula", href: "/chapter/11" },
            { name: "Davisson and Germer Experiment", href: "/chapter/11" },
            { name: "Electron Emission", href: "/chapter/11" },
            { name: "Compton Wavelength", href: "/chapter/11" },
            { name: "Particle Nature of Light: The Photon", href: "/chapter/11" },
            { name: "Planck Equation", href: "/chapter/11" },
            { name: "Quantum Theory of Light", href: "/chapter/11" }
          ],
          solutionLink: "/chapter/11"
        },
        {
          title: "Class 12 Physics Notes for Chapter 12: Atoms",
          description: "This Class 12 Physics chapter includes an in-depth knowledge of Atoms along with other related concepts like Alpha Particle Mass, Modern Physics, and Fermi Energy.",
          topics: ["Alpha-particle Scattering and Rutherford's Nuclear Model of Atom", "Atomic Spectra", "Spectral Series", "Bohr Model of the Hydrogen Atom", "Ionizing Radiation", "Bohr Radius", "Laser", "Avogadro's Number", "Quantum Mechanics"],
          topicLinks: [
            { name: "Alpha-particle Scattering and Rutherford's Nuclear Model", href: "/chapter/12" },
            { name: "Atomic Spectra", href: "/chapter/12" },
            { name: "Spectral Series", href: "/chapter/12" },
            { name: "Bohr Model of the Hydrogen Atom", href: "/chapter/12" },
            { name: "Ionizing Radiation", href: "/chapter/12" },
            { name: "Bohr Radius", href: "/chapter/12" },
            { name: "Laser", href: "/chapter/12" },
            { name: "Avogadro's Number", href: "/chapter/12" },
            { name: "Quantum Mechanics", href: "/chapter/12" }
          ],
          solutionLink: "/chapter/12"
        },
        {
          title: "Class 12 Physics Notes for Chapter 13: Nuclei",
          description: "The detailed study of the concept of nuclei is explained in this Class 12 Physics topic. It also includes other important topics like Beta Decay, Nuclear Physics, and Radioactive Decay.",
          topics: ["Mass-Energy and Nuclear Binding Energy", "Nuclear Force", "Unit of Radioactivity", "Radioactive Decay Formula", "Positron", "Nuclear Energy", "Nuclear Binding Energy", "Mass Energy Equivalence", "Neutron Mass", "Nuclear reactor based on nuclear fission"],
          topicLinks: [
            { name: "Mass-Energy and Nuclear Binding Energy", href: "/chapter/13" },
            { name: "Nuclear Force", href: "/chapter/13" },
            { name: "Unit of Radioactivity", href: "/chapter/13" },
            { name: "Radioactive Decay Formula", href: "/chapter/13" },
            { name: "Positron", href: "/chapter/13" },
            { name: "Nuclear Energy", href: "/chapter/13" },
            { name: "Nuclear Binding Energy", href: "/chapter/13" },
            { name: "Mass Energy Equivalence", href: "/chapter/13" },
            { name: "Neutron Mass", href: "/chapter/13" },
            { name: "Nuclear Reactor based on Nuclear Fission", href: "/chapter/13" }
          ],
          solutionLink: "/chapter/13"
        },
        {
          title: "Class 12 Physics Notes for Chapter 14: Semiconductor Electronics",
          description: "In this chapter, the basic concepts of Semiconductor Electronics are introduced along with other related concepts like Transistor, Fullwave Rectifier, and Half Wave Rectifier.",
          topics: ["Classification of Metals, Conductors, and Semiconductors", "Intrinsic Semiconductor", "Extrinsic Semiconductor", "p-n Junction", "Semiconductor Diode", "Light Emitting Diode", "Zener Diode", "Integrated Circuits", "Junction Transistor", "Schottky Diode", "Digital Electronics and Logic Gates", "Zener Diode as a Voltage Regulator", "Difference between npn and pnp transistor"],
          topicLinks: [
            { name: "Classification of Metals, Conductors, and Semiconductors", href: "/chapter/14" },
            { name: "Intrinsic Semiconductor", href: "/chapter/14" },
            { name: "Extrinsic Semiconductor", href: "/chapter/14" },
            { name: "p-n Junction", href: "/chapter/14" },
            { name: "Semiconductor Diode", href: "/chapter/14" },
            { name: "Light Emitting Diode", href: "/chapter/14" },
            { name: "Zener Diode", href: "/chapter/14" },
            { name: "Integrated Circuits", href: "/chapter/14" },
            { name: "Junction Transistor", href: "/chapter/14" },
            { name: "Schottky Diode", href: "/chapter/14" },
            { name: "Digital Electronics and Logic Gates", href: "/chapter/14" },
            { name: "Zener Diode as a Voltage Regulator", href: "/chapter/14" },
            { name: "Difference between npn and pnp transistor", href: "/chapter/14" }
          ],
          solutionLink: "/chapter/14"
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
