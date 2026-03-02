export interface StudyGuideItem {
  topic: string;
  content: string;
}

export interface QuestionSolution {
  id: number;
  question: string;
  solution: string;
  figure?: string;        // path/URL to a diagram image shown with the question
  figureCaption?: string; // caption shown below the image
}

export interface Chapter {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  pdfUrl: string;
  formulaSheetUrl?: string;
  keyFormulas?: string[];
  studyGuide: StudyGuideItem[];
  solutions: QuestionSolution[];
}

export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Chapter 1: Electric Charges and Fields",
    shortTitle: "Electric Charges & Fields",
    description: "Introduces the fundamental concepts of electric charge, Coulomb's law, electric field lines, and Gauss's law with applications.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph101.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["F = kq₁q₂/r² (Coulomb's Law)", "E = F/q₀ (Electric Field)", "Φ = q_enc/ε₀ (Gauss's Law)", "p = q·d (Dipole Moment)"],
    studyGuide: [
      {
        topic: "Electric Charge",
        content: "Charge is a fundamental property of matter. There are two types: positive and negative. Like charges repel, unlike charges attract. Charge is quantized: q = ne, where n is an integer."
      },
      {
        topic: "Coulomb's Law",
        content: "The force between two point charges is F = kq₁q₂/r², where k = 9 × 10⁹ N m² C⁻². The force is along the line joining the charges."
      },
      {
        topic: "Electric Field",
        content: "E = F/q₀. Electric field lines originate from positive charges and terminate at negative charges. Field lines never cross each other."
      },
      {
        topic: "Gauss's Law",
        content: "The total electric flux through a closed surface is Φ = q_enc/ε₀. Useful for finding E when charge distribution has high symmetry."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "What is the force between two small charged spheres having charges of 2 × 10⁻⁷ C and 3 × 10⁻⁷ C placed 30 cm apart in air?",
        solution: `Given:
$q_1 = 2 \\times 10^{-7}$ C,  $q_2 = 3 \\times 10^{-7}$ C,  $r = 30$ cm $= 0.30$ m

Using Coulomb's Law:
$$F = k \\frac{q_1 q_2}{r^2}$$

$$F = \\frac{9 \\times 10^9 \\times 2 \\times 10^{-7} \\times 3 \\times 10^{-7}}{(0.30)^2}$$

$$F = \\frac{9 \\times 10^9 \\times 6 \\times 10^{-14}}{0.09} = \\frac{5.4 \\times 10^{-4}}{9 \\times 10^{-2}}$$

$$\\boxed{F = 6 \\times 10^{-3} \\text{ N}}$$

Since both charges are positive, the force is **repulsive** and directed along the line joining the two charges.`
      },
      {
        id: 2,
        question: "The electrostatic force on a small sphere of charge 0.4 μC due to another small sphere of charge –0.8 μC in air is 0.2 N. (a) What is the distance between the two spheres? (b) What is the force on the second sphere due to the first?",
        solution: `Given:
$q_1 = 0.4\\ \\mu$C $= 0.4 \\times 10^{-6}$ C,  $q_2 = -0.8\\ \\mu$C $= -0.8 \\times 10^{-6}$ C
$F = 0.2$ N

**(a) Finding the distance r:**

$$F = k \\frac{|q_1||q_2|}{r^2} \\implies r^2 = k \\frac{|q_1||q_2|}{F}$$

$$r^2 = \\frac{9 \\times 10^9 \\times 0.4 \\times 10^{-6} \\times 0.8 \\times 10^{-6}}{0.2}$$

$$r^2 = \\frac{9 \\times 10^9 \\times 3.2 \\times 10^{-13}}{0.2} = \\frac{2.88 \\times 10^{-3}}{0.2} = 0.0144 \\text{ m}^2$$

$$\\boxed{r = 0.12 \\text{ m} = 12 \\text{ cm}}$$

**(b) Force on second sphere due to first:**

By Newton's Third Law, the force on the second sphere due to the first is **equal in magnitude and opposite in direction**.

$$\\boxed{F_{21} = 0.2 \\text{ N (attractive, directed toward } q_1)}$$`
      },
      {
        id: 3,
        question: "Check that the ratio ke²/Gm_em_p is dimensionless. Look up a Table of Physical Constants and determine the value of this ratio. What does the ratio signify?",
        solution: `**Checking dimensions:**

$ke^2$ has units of $\\text{N}\\cdot\\text{m}^2$ (since $F = ke^2/r^2$ gives N, and $r^2$ is m²)
$Gm_e m_p$ has units of $\\text{N}\\cdot\\text{m}^2$ (since $F = Gm_em_p/r^2$)

Therefore $\\dfrac{ke^2}{Gm_e m_p}$ is **dimensionless** ✓

**Calculating the ratio:**

Using standard constants:
- $k = 9 \\times 10^9$ N m² C⁻²,  $e = 1.6 \\times 10^{-19}$ C
- $G = 6.67 \\times 10^{-11}$ N m² kg⁻²
- $m_e = 9.11 \\times 10^{-31}$ kg,  $m_p = 1.67 \\times 10^{-27}$ kg

$$\\frac{ke^2}{Gm_e m_p} = \\frac{9 \\times 10^9 \\times (1.6 \\times 10^{-19})^2}{6.67 \\times 10^{-11} \\times 9.11 \\times 10^{-31} \\times 1.67 \\times 10^{-27}}$$

$$\\boxed{\\approx 2.3 \\times 10^{39}}$$

**Significance:** This enormous ratio shows that the **electrostatic force between an electron and a proton is ~10³⁹ times stronger than the gravitational force** between them. Gravity is negligibly weak at atomic scales.`
      },
      {
        id: 4,
        question: "(a) Explain the meaning of the statement 'electric charge of a body is quantised'. (b) Why can one ignore quantisation of electric charge when dealing with macroscopic (large scale) charges?",
        solution: `**(a) Quantisation of Electric Charge:**

Electric charge is quantised means that any charge $q$ on a body is always an **integral multiple** of the elementary charge $e$:

$$q = ne, \\quad n = 0, \\pm1, \\pm2, \\pm3, \\ldots$$

where $e = 1.6 \\times 10^{-19}$ C is the charge of a proton (or magnitude of charge of an electron).

Charge cannot take fractional values like $0.5e$ or $1.3e$. It always occurs in discrete packets of $e$.

**(b) Why quantisation can be ignored macroscopically:**

At the macroscopic scale, charges involved are typically of the order of microcoulombs $($\\mu$C)$ or more.

Number of electrons in $1\\ \\mu$C:
$$n = \\frac{q}{e} = \\frac{10^{-6}}{1.6 \\times 10^{-19}} \\approx 6.25 \\times 10^{12}$$

This is such an **astronomically large number** that the discreteness (quantisation) becomes imperceptible. The charge appears to vary **continuously**, so quantisation can be safely ignored in macroscopic calculations.`
      },
      {
        id: 5,
        question: "When a glass rod is rubbed with a silk cloth, charges appear on both. A similar phenomenon is observed with many other pairs of bodies. Explain how this observation is consistent with the law of conservation of charge.",
        solution: `**Law of Conservation of Charge:** Charge can neither be created nor destroyed; it can only be transferred from one body to another.

**Explanation:**

Before rubbing, both the glass rod and the silk cloth are electrically neutral — the total charge of the system is **zero**.

When the glass rod is rubbed with silk:
- Electrons are transferred **from the glass rod to the silk cloth**
- The glass rod loses electrons → acquires **positive charge** $+q$
- The silk cloth gains electrons → acquires **negative charge** $-q$

Total charge of system after rubbing:
$$q_{\\text{glass}} + q_{\\text{silk}} = (+q) + (-q) = 0$$

The **net charge is still zero**, exactly as it was before. No new charge was created — charge was merely **redistributed**.

This is perfectly consistent with the **law of conservation of charge**: the total charge of an isolated system remains constant.`
      },
      {
        id: 6,
        question: "Four point charges qA = 2 μC, qB = –5 μC, qC = 2 μC, and qD = –5 μC are located at the corners of a square ABCD of side 10 cm. What is the force on a charge of 1 μC placed at the centre of the square?",
        solution: `Given: Square ABCD of side $a = 10$ cm, $q_A = q_C = 2\\ \\mu$C, $q_B = q_D = -5\\ \\mu$C

**Distance from centre O to each corner:**
$$r = \\frac{a\\sqrt{2}}{2} = \\frac{10\\sqrt{2}}{2} = 5\\sqrt{2} \\text{ cm} = 5\\sqrt{2} \\times 10^{-2} \\text{ m}$$

Test charge: $q_0 = 1\\ \\mu$C $= 10^{-6}$ C

**Key Symmetry Argument:**

$q_A = q_C = 2\\ \\mu$C are at diagonally opposite corners A and C.
→ Forces on $q_0$ due to $q_A$ and $q_C$ are **equal in magnitude, opposite in direction** → they **cancel**.

$q_B = q_D = -5\\ \\mu$C are at diagonally opposite corners B and D.
→ Forces on $q_0$ due to $q_B$ and $q_D$ are **equal in magnitude, opposite in direction** → they **cancel**.

**Therefore, the net force on the charge at the centre is:**
$$\\boxed{F_{\\text{net}} = 0}$$

The arrangement has perfect symmetry — opposite corners carry equal charges, so all force pairs cancel out.`
      },
      {
        id: 7,
        question: "(a) An electrostatic field line is a continuous curve. That is, a field line cannot have sudden breaks. Why not? (b) Explain why two field lines never cross each other at any point?",
        solution: `**(a) Why field lines are continuous curves without sudden breaks:**

An electric field line represents the path along which a positive test charge would move under the influence of the electric field. At every point in space where a field exists, there is a definite direction of the field, so the line must be **continuous**.

A sudden break would mean the electric field **does not exist** at that point, which is physically impossible in free space (the field is defined everywhere). Field lines can only start on positive charges and end on negative charges — they don't just stop midway.

**(b) Why two field lines never cross:**

If two field lines were to cross at a point P, then at that point there would be **two different directions** of the electric field simultaneously.

However, the electric field at any point is uniquely defined — it has a single definite direction (the resultant of all contributing fields). This means only **one tangent** (one field direction) can exist at any point.

Therefore, two field lines crossing each other would violate the uniqueness of the electric field at that point → **field lines can never cross**.`
      },
      {
        id: 8,
        question: "Two point charges qA = 3 μC and qB = –3 μC are located 20 cm apart in vacuum. (a) What is the electric field at the midpoint O of the line AB joining the two charges? (b) If a negative test charge of magnitude 1.5 × 10⁻⁹ C is placed at this point, what is the force experienced by the test charge?",
        solution: `Given: $q_A = 3\\ \\mu$C $= 3 \\times 10^{-6}$ C,  $q_B = -3\\ \\mu$C $= -3 \\times 10^{-6}$ C
Distance AB = 20 cm → $r = 10$ cm $= 0.10$ m (distance from each charge to midpoint O)

**(a) Electric field at midpoint O:**

Field due to $q_A$ (positive) at O — directed **away from A**, i.e., toward B:
$$E_A = k\\frac{q_A}{r^2} = \\frac{9 \\times 10^9 \\times 3 \\times 10^{-6}}{(0.1)^2} = \\frac{2.7 \\times 10^4}{0.01} = 2.7 \\times 10^6 \\text{ N/C (toward B)}$$

Field due to $q_B$ (negative) at O — directed **toward B** (toward negative charge):
$$E_B = k\\frac{|q_B|}{r^2} = 2.7 \\times 10^6 \\text{ N/C (toward B)}$$

Both fields point **in the same direction** (from A toward B):
$$\\boxed{E_{\\text{net}} = E_A + E_B = 5.4 \\times 10^6 \\text{ N/C, directed from A to B}}$$

**(b) Force on test charge $q_0 = -1.5 \\times 10^{-9}$ C:**

$$F = q_0 \\cdot E = 1.5 \\times 10^{-9} \\times 5.4 \\times 10^6 = 8.1 \\times 10^{-3} \\text{ N}$$

Since $q_0$ is **negative**, the force is opposite to the field direction — i.e., **from B toward A**.

$$\\boxed{F = 8.1 \\times 10^{-3} \\text{ N, directed from B to A}}$$`
      },
      {
        id: 9,
        question: "A system has two charges qA = 2.5 × 10⁻⁷ C and qB = –2.5 × 10⁻⁷ C located at points A: (0, 0, –15 cm) and B: (0, 0, +15 cm), respectively. What are the total charge and electric dipole moment of the system?",
        solution: `**Total charge of the system:**
$$q_{\\text{total}} = q_A + q_B = 2.5 \\times 10^{-7} + (-2.5 \\times 10^{-7})$$
$$\\boxed{q_{\\text{total}} = 0}$$

**Electric Dipole Moment:**

The dipole moment is defined as:
$$\\vec{p} = q \\cdot \\vec{d}$$

where $q$ is the magnitude of either charge and $\\vec{d}$ is the displacement vector **from the negative charge to the positive charge**.

Magnitude of charge: $q = 2.5 \\times 10^{-7}$ C

Distance between charges:
$$d = 15 \\text{ cm} - (-15 \\text{ cm}) = 30 \\text{ cm} = 0.30 \\text{ m}$$

Direction: from B $(0, 0, +15)$ [negative] to A $(0, 0, -15)$ [positive] → along **negative z-axis** $(-\\hat{k})$

$$p = q \\times d = 2.5 \\times 10^{-7} \\times 0.30$$

$$\\boxed{\\vec{p} = 7.5 \\times 10^{-8} \\text{ C·m, directed along the } -z \\text{ axis}}$$`
      },
      {
        id: 10,
        question: "An electric dipole with dipole moment 4 × 10⁻⁹ C m is aligned at 30° with the direction of a uniform electric field of magnitude 5 × 10⁴ N C⁻¹. Calculate the magnitude of the torque acting on the dipole.",
        solution: `Given:
Dipole moment: $p = 4 \\times 10^{-9}$ C·m
Electric field: $E = 5 \\times 10^4$ N C⁻¹
Angle between $\\vec{p}$ and $\\vec{E}$: $\\theta = 30°$

**Formula for torque on a dipole:**
$$\\vec{\\tau} = \\vec{p} \\times \\vec{E}$$

Magnitude:
$$\\tau = pE\\sin\\theta$$

$$\\tau = 4 \\times 10^{-9} \\times 5 \\times 10^4 \\times \\sin 30°$$

$$\\tau = 4 \\times 10^{-9} \\times 5 \\times 10^4 \\times 0.5$$

$$\\tau = 4 \\times 10^{-9} \\times 2.5 \\times 10^4$$

$$\\boxed{\\tau = 10^{-4} \\text{ N·m}}$$`
      },
      {
        id: 11,
        question: "A polythene piece rubbed with wool is found to have a negative charge of 3 × 10⁻⁷ C. (a) Estimate the number of electrons transferred (from which to which?) (b) Is there a transfer of mass from wool to polythene?",
        solution: `Given: Charge on polythene $q = -3 \\times 10^{-7}$ C

**(a) Number of electrons transferred:**

Each electron carries charge $e = 1.6 \\times 10^{-19}$ C

$$n = \\frac{|q|}{e} = \\frac{3 \\times 10^{-7}}{1.6 \\times 10^{-19}}$$

$$\\boxed{n \\approx 1.875 \\times 10^{12} \\text{ electrons}}$$

Direction: The polythene has gained **negative** charge, so electrons were transferred **from wool to polythene**.

**(b) Transfer of mass:**

Yes, since electrons have mass $m_e = 9.11 \\times 10^{-31}$ kg, the transfer of electrons involves a tiny transfer of mass.

Mass transferred from wool to polythene:
$$\\Delta m = n \\times m_e = 1.875 \\times 10^{12} \\times 9.11 \\times 10^{-31}$$

$$\\boxed{\\Delta m \\approx 1.71 \\times 10^{-18} \\text{ kg}}$$

This is an **extremely tiny** mass transfer, completely negligible in practice, but it does exist — confirming that electrons (which have mass) move from wool to polythene.`
      },
      {
        id: 12,
        question: "(a) Two insulated charged copper spheres A and B have their centres separated by a distance of 50 cm. What is the mutual force of electrostatic repulsion if the charge on each is 6.5 × 10⁻⁷ C? The radii of A and B are negligible compared to the distance of separation. (b) What is the force of repulsion if each sphere is charged double the above amount, and the distance between them is halved?",
        solution: `**(a) Original configuration:**

$q_A = q_B = q = 6.5 \\times 10^{-7}$ C,  $r = 50$ cm $= 0.50$ m

$$F = k \\frac{q^2}{r^2} = \\frac{9 \\times 10^9 \\times (6.5 \\times 10^{-7})^2}{(0.50)^2}$$

$$F = \\frac{9 \\times 10^9 \\times 4.225 \\times 10^{-13}}{0.25}$$

$$\\boxed{F = 1.52 \\times 10^{-2} \\text{ N} \\approx 0.015 \\text{ N}}$$

**(b) New configuration:** $q' = 2q$,  $r' = r/2$

$$F' = k \\frac{(2q)^2}{(r/2)^2} = k \\frac{4q^2}{r^2/4} = 16 \\cdot k\\frac{q^2}{r^2} = 16F$$

$$\\boxed{F' = 16 \\times 0.015 = 0.24 \\text{ N}}$$

The force increases **16 times** — 4× from doubling charge, 4× from halving distance.`
      },
      {
        id: 13,
        question: "Figure 1.30 shows tracks of three charged particles in a uniform electrostatic field. Give the signs of the three charges. Which particle has the highest charge to mass ratio?",
        figure: new URL('../assets/fig1_30.png', import.meta.url).href,
        figureCaption: "Figure 1.30 — Tracks of three charged particles in a uniform electric field",
        solution: `**Signs of the charges:**

In a uniform electric field, a positive charge accelerates in the direction of the field, and a negative charge accelerates opposite to the field.

- **Particle 1:** Curves upward (toward the positive plate region) → accelerates opposite to $\\vec{E}$ → **Negative charge**
- **Particle 2:** Goes straight (no deflection) → either uncharged or velocity perfectly perpendicular with no field component → **Neutral (or zero net charge)**
- **Particle 3:** Curves downward (toward the negative plate region, in the direction of $\\vec{E}$ for a positive charge) → **Positive charge**

*(Note: The exact sign assignment depends on the field direction shown in the figure. The above is for a field pointing downward.)*

**Highest charge-to-mass ratio:**

The deflection (curvature) of a charged particle in the field is given by:

$$y = \\frac{1}{2} \\frac{qE}{m} t^2$$

Greater curvature (sharper bend) → greater transverse acceleration → higher $q/m$ ratio.

**Particle 3** shows the greatest curvature/deflection in the diagram.

$\\boxed{\\text{Particle 3 has the highest charge-to-mass ratio } (q/m)}$`
      },
      {
        id: 14,
        question: "Consider a uniform electric field E = 3 × 10³ î N/C. (a) What is the flux of this field through a square of 10 cm on a side whose plane is parallel to the yz plane? (b) What is the flux through the same square if the normal to its plane makes a 60° angle with the x-axis?",
        solution: `Given: $\\vec{E} = 3 \\times 10^3 \\hat{i}$ N/C,  Side $a = 10$ cm $= 0.10$ m,  Area $A = 0.01$ m²

**(a) Plane parallel to yz plane → normal along x-axis ($\\theta = 0°$):**

$\\Phi = EA\\cos\\theta = 3 \\times 10^3 \\times 0.01 \\times \\cos 0°$

$\\boxed{\\Phi_a = 30 \\text{ N m}^2\\text{/C}}$

**(b) Normal makes 60° with x-axis:**

$\\Phi = EA\\cos 60° = 30 \\times 0.5$

$\\boxed{\\Phi_b = 15 \\text{ N m}^2\\text{/C}}$`
      },
      {
        id: 15,
        question: "What is the net flux of the uniform electric field E = 3 × 10³ î N/C through a cube of side 20 cm oriented so that its faces are parallel to the coordinate planes?",
        solution: `Given: $\\vec{E} = 3 \\times 10^3 \\hat{i}$ N/C (uniform, along x-axis), cube side = 0.20 m

The uniform field enters one face and exits the opposite face with equal magnitude.

Flux through **right face** (normal $+\\hat{i}$): $\\Phi_R = EA = 3\\times10^3 \\times (0.20)^2 = +120$ N m²/C
Flux through **left face** (normal $-\\hat{i}$): $\\Phi_L = -120$ N m²/C
Flux through other 4 faces: 0 (field perpendicular to normal)

$\\Phi_{\\text{net}} = +120 + (-120) = 0$

$\\boxed{\\Phi_{\\text{net}} = 0}$

A **uniform field encloses no net charge** — consistent with Gauss's Law ($q_{\\text{enc}} = 0$).`
      },
      {
        id: 16,
        question: "Careful measurement of the electric field at the surface of a black box indicates that the net outward flux through the surface of the box is 8.0 × 10³ Nm²/C. (a) What is the net charge inside the box? (b) If the net outward flux through the surface of the box were zero, could you conclude that there were no charges inside the box? Why or Why not?",
        solution: `Given: $\\Phi_{\\text{net}} = 8.0 \\times 10^3$ N m²/C

**(a) Net charge inside (Gauss's Law):**

$q_{\\text{enc}} = \\Phi \\cdot \\varepsilon_0 = 8.0 \\times 10^3 \\times 8.854 \\times 10^{-12}$

$\\boxed{q_{\\text{enc}} \\approx 7.08 \\times 10^{-8} \\text{ C} \\approx 70.8 \\text{ nC}}$

**(b) If $\\Phi = 0$, does it mean no charges?**

**No.** Zero net flux means $q_{\\text{enc}} = 0$ (net charge zero), but this could mean:
- No charges at all, OR
- Equal and opposite charges cancelling ($+q$ and $-q$ both present)

Gauss's law only gives the **algebraic sum** of enclosed charges.`
      },
      {
        id: 17,
        question: "A point charge +10 μC is at a distance 5 cm directly above the centre of a square of side 10 cm, as shown in Fig. 1.31. What is the magnitude of the electric flux through the square? (Hint: Think of the square as one face of a cube with edge 10 cm.)",
        figure: new URL('../assets/fig1_31.png', import.meta.url).href,
        figureCaption: "Figure 1.31 — Point charge +10 μC at 5 cm above centre of a 10 cm square",
        solution: `Given: $q = +10\ \\mu$C $= 10^{-5}$ C, height above square = 5 cm

**Cube Symmetry Method:**

Imagine the square as **one face of a cube** of edge 10 cm. The charge is 5 cm above the square = at the **centre of the cube**.

Total flux through the cube (Gauss's Law):
$\\Phi_{\\text{cube}} = \\frac{q}{\\varepsilon_0} = \\frac{10^{-5}}{8.854 \\times 10^{-12}} \\approx 1.13 \\times 10^6 \\text{ N m}^2\\text{/C}$

By symmetry, equal flux through each of the **6 faces**:
$\\Phi_{\\text{square}} = \\frac{\\Phi_{\\text{cube}}}{6} = \\frac{1.13 \\times 10^6}{6}$

$\\boxed{\\Phi_{\\text{square}} \\approx 1.88 \\times 10^5 \\text{ N m}^2\\text{/C}}`
      },
      {
        id: 18,
        question: "A point charge of 2 μC is at the centre of a cubic Gaussian surface 9.0 cm on edge. What is the net electric flux through the surface?",
        solution: `Given: $q = 2\ \\mu$C $= 2 \\times 10^{-6}$ C at centre of cube

By Gauss's Law, flux depends only on **enclosed charge**, not on shape or size of the surface:

$\\Phi_{\\text{net}} = \\frac{q_{\\text{enc}}}{\\varepsilon_0} = \\frac{2 \\times 10^{-6}}{8.854 \\times 10^{-12}}$

$\\boxed{\\Phi_{\\text{net}} = 2.26 \\times 10^5 \\text{ N m}^2\\text{/C}}$

Note: The edge length of 9.0 cm has **no effect** on the answer.`
      },
      {
        id: 19,
        question: "A point charge causes an electric flux of −1.0 × 10³ Nm²/C to pass through a spherical Gaussian surface of 10.0 cm radius centred on the charge. (a) If the radius of the Gaussian surface were doubled, how much flux would pass through the surface? (b) What is the magnitude and sign of the point charge?",
        solution: `Given: $\\Phi = -1.0 \\times 10^3$ N m²/C,  $r = 10$ cm

**(a) Flux when radius is doubled:**

By Gauss's Law $\\Phi = q/\\varepsilon_0$ depends only on the **enclosed charge**, not on radius.

$\\boxed{\\Phi_{\\text{new}} = -1.0 \\times 10^3 \\text{ N m}^2\\text{/C (unchanged)}}$

**(b) Sign and magnitude of point charge:**

Negative flux → field directed **inward** → **negative charge**.

$q = \\Phi \\cdot \\varepsilon_0 = (-1.0 \\times 10^3) \\times 8.854 \\times 10^{-12}$

$\\boxed{q \\approx -8.85 \\times 10^{-9} \\text{ C} = -8.85 \\text{ nC}}`
      },
      {
        id: 20,
        question: "A conducting sphere of radius 10 cm has an unknown charge. If the electric field 20 cm from the centre of the sphere is 1.5 × 10³ N/C and points radially inward, what is the net charge on the sphere?",
        solution: `Given: $R = 10$ cm, $r = 20$ cm $= 0.20$ m, $E = 1.5 \\times 10^3$ N/C (inward → negative charge)

For a conducting sphere, external field = field of a point charge at centre:
$E = k\\frac{|q|}{r^2} \\implies |q| = \\frac{E r^2}{k}$

$|q| = \\frac{1.5 \\times 10^3 \\times (0.20)^2}{9 \\times 10^9} = \\frac{1.5 \\times 10^3 \\times 0.04}{9 \\times 10^9} = \\frac{60}{9 \\times 10^9}$

$\\boxed{q = -6.67 \\times 10^{-9} \\text{ C} \\approx -6.67 \\text{ nC}}`
      },
      {
        id: 21,
        question: "A uniformly charged conducting sphere of 2.4 m diameter has a surface charge density of 80.0 μC/m². (a) Find the charge on the sphere. (b) What is the total electric flux leaving the surface of the sphere?",
        solution: `Given: $d = 2.4$ m → $R = 1.2$ m,  $\\sigma = 80.0 \\times 10^{-6}$ C/m²

**(a) Total charge on sphere:**

$A = 4\\pi R^2 = 4\\pi (1.2)^2 = 18.096 \\text{ m}^2$

$q = \\sigma A = 80.0 \\times 10^{-6} \\times 18.096$

$\\boxed{q \\approx 1.45 \\times 10^{-3} \\text{ C} = 1.45 \\text{ mC}}$

**(b) Total electric flux:**

$\\Phi = \\frac{q}{\\varepsilon_0} = \\frac{1.45 \\times 10^{-3}}{8.854 \\times 10^{-12}}$

$\\boxed{\\Phi \\approx 1.63 \\times 10^8 \\text{ N m}^2\\text{/C}}`
      },
      {
        id: 22,
        question: "An infinite line charge produces a field of 9 × 10⁴ N/C at a distance of 2 cm. Calculate the linear charge density.",
        solution: `Given: $E = 9 \\times 10^4$ N/C,  $r = 2$ cm $= 0.02$ m

Electric field of an infinite line charge (Gauss's Law):
$E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}$

Solving for $\\lambda$:
$\\lambda = E \\cdot 2\\pi\\varepsilon_0 r = 9 \\times 10^4 \\times 2\\pi \\times 8.854 \\times 10^{-12} \\times 0.02$

$\\lambda = 9 \\times 10^4 \\times 5.563 \\times 10^{-11} \\times 0.02$

$\\lambda = 9 \\times 10^4 \\times 1.113 \\times 10^{-12}$

$\\boxed{\\lambda = 10^{-7} \\text{ C/m} = 0.1\ \\mu\\text{C/m}}`
      },
      {
        id: 23,
        question: "Two large, thin metal plates are parallel and close to each other. On their inner faces, the plates have surface charge densities of opposite signs and of magnitude 17.0 × 10⁻²² C/m². What is E: (a) in the outer region of the first plate, (b) in the outer region of the second plate, and (c) between the plates?",
        solution: `Given: $\\sigma = 17.0 \\times 10^{-22}$ C/m² (Plate 1: $+\\sigma$, Plate 2: $-\\sigma$)

Field of a single large plate: $E_{\\text{sheet}} = \\dfrac{\\sigma}{2\\varepsilon_0}$

**(a) Outer region of Plate 1:** Fields from both plates are **equal and opposite** → cancel.
$\\boxed{E_a = 0}$

**(b) Outer region of Plate 2:** By symmetry:
$\\boxed{E_b = 0}$

**(c) Region between the plates:** Both fields point **same direction** (from + to −) and add:
$E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{17.0 \\times 10^{-22}}{8.854 \\times 10^{-12}}$

$\\boxed{E_c \\approx 1.92 \\times 10^{-10} \\text{ N/C}}`
      }
    ]
  },
  {
    id: 2,
    title: "Chapter 2: Electrostatic Potential and Capacitance",
    shortTitle: "Potential & Capacitance",
    description: "Explores electric potential, equipotential surfaces, potential energy of charge systems, dielectrics, and capacitors.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph102.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["V = kq/r (Potential due to point charge)", "C = Q/V (Capacitance)", "C_series: 1/C = 1/C₁ + 1/C₂", "U = ½CV² (Energy stored)"],
    studyGuide: [
      {
        topic: "Electric Potential",
        content: "V = W/q₀. Work done per unit positive charge in bringing a test charge from infinity to a point. V due to a point charge: V = kq/r."
      },
      {
        topic: "Equipotential Surfaces",
        content: "Surfaces on which potential is constant. No work is done in moving a charge along an equipotential surface. Electric field is always perpendicular to equipotential surfaces."
      },
      {
        topic: "Capacitance",
        content: "C = Q/V. For a parallel plate capacitor: C = ε₀A/d. With dielectric: C = Kε₀A/d. Energy stored: U = Q²/2C = CV²/2."
      },
      {
        topic: "Combination of Capacitors",
        content: "Series: 1/C = 1/C₁ + 1/C₂ + ... Parallel: C = C₁ + C₂ + ..."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "A 12 pF capacitor is connected to a 50 V battery. How much electrostatic energy is stored in the capacitor?",
        solution: "U = ½CV² = ½ × 12×10⁻¹² × 50² = 1.5×10⁻⁸ J."
      }
    ]
  },
  {
    id: 3,
    title: "Chapter 3: Current Electricity",
    shortTitle: "Current Electricity",
    description: "Covers electric current, Ohm's law, resistivity, EMF, Kirchhoff's rules, Wheatstone bridge, and potentiometer.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph103.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["V = IR (Ohm's Law)", "R = ρl/A (Resistance)", "P = VI = I²R (Power)", "EMF: ε = V + Ir (terminal voltage)"],
    studyGuide: [
      {
        topic: "Ohm's Law",
        content: "V = IR. Current through a conductor is proportional to voltage at constant temperature. Resistivity ρ = RA/L."
      },
      {
        topic: "Kirchhoff's Rules",
        content: "Junction Rule: ΣI = 0 (charge conservation). Loop Rule: ΣV = 0 (energy conservation)."
      },
      {
        topic: "EMF and Internal Resistance",
        content: "Terminal voltage V = E − Ir. Maximum power transfer when external R equals internal resistance r."
      },
      {
        topic: "Wheatstone Bridge",
        content: "Balanced condition: P/Q = R/S. Used to measure unknown resistance accurately."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "The storage battery of a car has an emf of 12 V and internal resistance 0.4 Ω. What is the maximum current?",
        solution: "I = E/r = 12/0.4 = 30 A."
      }
    ]
  },
  {
    id: 4,
    title: "Chapter 4: Moving Charges and Magnetism",
    shortTitle: "Moving Charges & Magnetism",
    description: "Studies the magnetic effect of electric current, Biot-Savart law, Ampere's circuital law, and motion of charges in magnetic fields.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph104.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["F = qv×B (Lorentz Force)", "B = μ₀I/2πr (Ampere's Law - wire)", "F = BIl (Force on conductor)", "τ = nIAB (Torque on loop)"],
    studyGuide: [
      {
        topic: "Magnetic Force on a Charge",
        content: "F = qv × B. Magnitude: F = qvB sinθ. The force is perpendicular to both v and B. No work is done by the magnetic force."
      },
      {
        topic: "Biot-Savart Law",
        content: "dB = (μ₀/4π) I dl × r̂ / r². Magnetic field due to a long straight wire: B = μ₀I/2πr."
      },
      {
        topic: "Ampere's Circuital Law",
        content: "∮ B·dl = μ₀I_enc. Useful for finding B when current distribution has high symmetry."
      },
      {
        topic: "Moving Coil Galvanometer",
        content: "Current sensitivity I = NAB/k. Converted to ammeter by shunt; voltmeter by series resistance."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "A circular coil of wire consisting of 100 turns, each of radius 8.0 cm carries a current of 0.40 A. What is the magnitude of the magnetic field B at the centre of the coil?",
        solution: "B = μ₀NI/2r = (4π×10⁻⁷ × 100 × 0.4)/(2 × 0.08) = 3.14×10⁻⁴ T."
      }
    ]
  },
  {
    id: 5,
    title: "Chapter 5: Magnetism and Matter",
    shortTitle: "Magnetism & Matter",
    description: "Covers bar magnets, Earth's magnetism, magnetic properties of materials — diamagnetic, paramagnetic, and ferromagnetic substances.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph105.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["B = μ₀M/4πr³ (Axial field of bar magnet)", "m = pole strength × l (Magnetic moment)", "χ = I/H (Susceptibility)", "μᵣ = 1 + χ (Relative permeability)"],
    studyGuide: [
      {
        topic: "Bar Magnet",
        content: "Magnetic dipole moment m = NIA. Field on axial line: B = μ₀2m/4πr³. Field on equatorial line: B = μ₀m/4πr³."
      },
      {
        topic: "Earth's Magnetism",
        content: "Magnetic declination, inclination (dip), and horizontal component (H). B_H = B cosδ, B_V = B sinδ. tan δ = B_V/B_H."
      },
      {
        topic: "Magnetic Properties",
        content: "Diamagnetic: χ < 0 (repelled). Paramagnetic: 0 < χ < 1 (weakly attracted). Ferromagnetic: χ >> 1 (strongly attracted, e.g. Fe, Ni, Co)."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "A short bar magnet has a magnetic moment of 0.48 J/T. Give the direction and magnitude of the magnetic field produced at a distance of 10 cm from the magnet on the axial line.",
        solution: "B = μ₀2m/4πr³ = 10⁻⁷ × 2 × 0.48/(0.1)³ = 0.96×10⁻⁴ T = 0.96 G, directed along the axis."
      }
    ]
  },
  {
    id: 6,
    title: "Chapter 6: Electromagnetic Induction",
    shortTitle: "Electromagnetic Induction",
    description: "Explores Faraday's laws, Lenz's law, motional EMF, eddy currents, self-inductance, mutual inductance, and AC generators.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph106.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["ε = -dΦ/dt (Faraday's Law)", "L = NΦ/I (Self-inductance)", "M = μ₀N₁N₂A/l (Mutual inductance)", "E_induced = Blv (Motional EMF)"],
    studyGuide: [
      {
        topic: "Faraday's Law",
        content: "Induced EMF ε = −dΦ_B/dt. The magnitude of induced EMF equals the rate of change of magnetic flux."
      },
      {
        topic: "Lenz's Law",
        content: "The induced current opposes the cause that produces it (energy conservation). This gives the negative sign in Faraday's law."
      },
      {
        topic: "Self and Mutual Inductance",
        content: "Self-inductance: ε = −L dI/dt. Mutual inductance: ε₂ = −M dI₁/dt. For solenoid: L = μ₀n²Al."
      },
      {
        topic: "Eddy Currents",
        content: "Induced currents in bulk conductors. Used in electromagnetic braking, induction heating. Reduced by lamination."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "A coil of resistance 10 Ω and inductance 0.5 H is connected to a 200 V, 50 Hz ac source. Calculate the current.",
        solution: "X_L = ωL = 2π×50×0.5 = 157 Ω. Z = √(R² + X_L²) = √(100+24649) ≈ 157.3 Ω. I = V/Z = 200/157.3 ≈ 1.27 A."
      }
    ]
  },
  {
    id: 7,
    title: "Chapter 7: Alternating Current",
    shortTitle: "Alternating Current",
    description: "Covers AC voltage, phase relations in R, L, C circuits, resonance, power factor, LC oscillations, and transformers.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph107.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["X_L = ωL (Inductive reactance)", "X_C = 1/ωC (Capacitive reactance)", "Z = √(R² + (X_L−X_C)²) (Impedance)", "f_r = 1/2π√LC (Resonant frequency)"],
    studyGuide: [
      {
        topic: "AC Circuit Basics",
        content: "V = V₀ sin ωt. RMS values: V_rms = V₀/√2, I_rms = I₀/√2. Reactive components cause phase difference between V and I."
      },
      {
        topic: "Impedance & Resonance",
        content: "Series LCR: Z = √(R² + (X_L−X_C)²). Resonance at ω₀ = 1/√(LC). At resonance Z = R (minimum), current is maximum."
      },
      {
        topic: "Power in AC Circuits",
        content: "P = V_rms I_rms cos φ. Power factor cos φ = R/Z. Pure L or C: P = 0 (no energy dissipation)."
      },
      {
        topic: "Transformer",
        content: "V_s/V_p = N_s/N_p = I_p/I_s. Step-up: N_s > N_p. Ideal transformer: P_input = P_output."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "A 100 Ω resistor is connected to a 220 V, 50 Hz AC supply. Find the RMS value of current and peak current.",
        solution: "I_rms = V_rms/R = 220/100 = 2.2 A. I₀ = I_rms × √2 = 2.2 × 1.414 ≈ 3.11 A."
      }
    ]
  },
  {
    id: 8,
    title: "Chapter 8: Electromagnetic Waves",
    shortTitle: "Electromagnetic Waves",
    description: "Studies Maxwell's equations, displacement current, properties of EM waves, and the electromagnetic spectrum from radio to gamma rays.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph108.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["c = 1/√μ₀ε₀ = 3×10⁸ m/s", "c = νλ (Speed = frequency × wavelength)", "I = ½ε₀cE₀² (Intensity)", "J_D = ε₀(dE/dt) (Displacement current)"],
    studyGuide: [
      {
        topic: "Displacement Current",
        content: "Maxwell's correction: J_d = ε₀ dE/dt. Ensures continuity of current in circuits with capacitors and completes Ampere's law."
      },
      {
        topic: "EM Wave Properties",
        content: "Transverse waves: E ⊥ B ⊥ propagation direction. Speed in vacuum: c = 1/√(μ₀ε₀) = 3×10⁸ m/s. E₀/B₀ = c."
      },
      {
        topic: "Electromagnetic Spectrum",
        content: "Radio > Microwave > Infrared > Visible > UV > X-rays > Gamma rays. All travel at c in vacuum but differ in frequency and wavelength."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "A parallel plate capacitor with circular plates of radius 1 m has a capacitance of 1 nF. At t = 0, it is connected to a 1 mA current source. Find the displacement current.",
        solution: "Displacement current equals conduction current: I_d = I_c = 1 mA = 10⁻³ A."
      }
    ]
  },
  {
    id: 9,
    title: "Chapter 9: Ray Optics and Optical Instruments",
    shortTitle: "Ray Optics",
    description: "Covers reflection, refraction, total internal reflection, lenses, mirrors, prisms, and optical instruments like microscopes and telescopes.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph109.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["1/f = 1/v − 1/u (Mirror formula)", "1/f = 1/v − 1/u (Lens formula)", "n₁sinθ₁ = n₂sinθ₂ (Snell's Law)", "P = 1/f (Dioptre; f in metres)"],
    studyGuide: [
      {
        topic: "Reflection & Mirrors",
        content: "Mirror formula: 1/v + 1/u = 1/f. Magnification m = −v/u. Concave mirror: converging; Convex mirror: diverging."
      },
      {
        topic: "Refraction & Snell's Law",
        content: "n₁ sin θ₁ = n₂ sin θ₂. Refractive index n = c/v. Lens formula: 1/v − 1/u = 1/f. Lensmaker's equation relates R₁, R₂, and n."
      },
      {
        topic: "Total Internal Reflection",
        content: "Occurs when light travels from denser to rarer medium at angle ≥ critical angle. sin θ_c = n₂/n₁. Used in optical fibres."
      },
      {
        topic: "Optical Instruments",
        content: "Microscope: m = L/f_e × D/f_o. Telescope: m = f_o/f_e. Angular magnification increases for near-point adjusted instruments."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "Find the position of the image for an object placed 10 cm in front of a concave mirror of focal length 15 cm.",
        solution: "1/v + 1/u = 1/f → 1/v = 1/f − 1/u = 1/(−15) − 1/(−10) = −1/15 + 1/10 = 1/30. So v = 30 cm (virtual, behind mirror)."
      }
    ]
  },
  {
    id: 10,
    title: "Chapter 10: Wave Optics",
    shortTitle: "Wave Optics",
    description: "Introduces Huygens' principle, interference of light, Young's double slit experiment, diffraction, and polarisation.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph110.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["β = λD/d (YDSE fringe width)", "path difference = d·sinθ", "For constructive: Δ = nλ", "For destructive: Δ = (n+½)λ"],
    studyGuide: [
      {
        topic: "Huygens' Principle",
        content: "Every point on a wavefront acts as a source of secondary wavelets. The new wavefront is the tangent to all secondary wavelets."
      },
      {
        topic: "Young's Double Slit Experiment",
        content: "Fringe width β = λD/d. Constructive interference: path diff = nλ. Destructive: path diff = (2n+1)λ/2."
      },
      {
        topic: "Diffraction",
        content: "Single slit: minima at a sinθ = nλ. Width of central maximum ∝ λ/a. Resolving power of optical instruments limited by diffraction."
      },
      {
        topic: "Polarisation",
        content: "Transverse nature of light. Malus's law: I = I₀ cos²θ. Brewster's angle: tan θ_B = n. Only transverse waves can be polarised."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "In Young's double-slit experiment, the slits are separated by 0.28 mm and the screen is 1.4 m away. Find fringe width for λ = 600 nm.",
        solution: "β = λD/d = (600×10⁻⁹ × 1.4) / (0.28×10⁻³) = 3×10⁻³ m = 3 mm."
      }
    ]
  },
  {
    id: 11,
    title: "Chapter 11: Dual Nature of Radiation and Matter",
    shortTitle: "Dual Nature",
    description: "Covers photoelectric effect, Einstein's equation, wave-particle duality, de Broglie hypothesis, and Davisson-Germer experiment.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph111.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["E = hν (Photon energy)", "KE_max = hν − φ (Photoelectric eq.)", "λ = h/mv (de Broglie wavelength)", "p = h/λ = hν/c (Photon momentum)"],
    studyGuide: [
      {
        topic: "Photoelectric Effect",
        content: "Emission of electrons when light of sufficient frequency hits a metal. Threshold frequency ν₀: hν₀ = φ (work function). Max KE = hν − φ."
      },
      {
        topic: "Einstein's Photoelectric Equation",
        content: "KE_max = hν − φ = eV_s. Stopping potential V_s is independent of intensity. Number of photoelectrons ∝ intensity."
      },
      {
        topic: "de Broglie Wavelength",
        content: "λ = h/p = h/mv. For electron accelerated through V: λ = h/√(2meV). Wave nature of particles confirmed by electron diffraction."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "The work function of caesium metal is 2.14 eV. Find the threshold frequency and wavelength.",
        solution: "ν₀ = φ/h = (2.14×1.6×10⁻¹⁹)/(6.63×10⁻³⁴) = 5.16×10¹⁴ Hz. λ₀ = c/ν₀ = 3×10⁸/5.16×10¹⁴ ≈ 581 nm."
      }
    ]
  },
  {
    id: 12,
    title: "Chapter 12: Atoms",
    shortTitle: "Atoms",
    description: "Covers Rutherford's nuclear model, Bohr's atomic model, energy levels, spectral series of hydrogen, and atomic spectra.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph112.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["r_n = n²a₀ (Bohr radius, a₀ = 0.529 Å)", "E_n = −13.6/n² eV (Energy levels)", "1/λ = R(1/n₁² − 1/n₂²) (Rydberg)", "L = nh/2π (Angular momentum)"],
    studyGuide: [
      {
        topic: "Rutherford's Model",
        content: "Alpha-particle scattering experiment revealed nuclear model. Most mass and all positive charge concentrated in a tiny nucleus. Electrons orbit at large distances."
      },
      {
        topic: "Bohr's Model",
        content: "Electrons orbit in stationary states. Angular momentum: mvr = nh/2π. Energy: E_n = −13.6/n² eV. Orbital radius: r_n = 0.529n² Å."
      },
      {
        topic: "Hydrogen Spectrum",
        content: "1/λ = R(1/n₁² − 1/n₂²). Series: Lyman (UV), Balmer (visible), Paschen (IR), Brackett, Pfund."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "Find the energy of an electron in the third orbit of a hydrogen atom.",
        solution: "E₃ = −13.6/n² = −13.6/9 ≈ −1.51 eV."
      }
    ]
  },
  {
    id: 13,
    title: "Chapter 13: Nuclei",
    shortTitle: "Nuclei",
    description: "Studies nuclear composition, size, mass defect, binding energy, radioactivity, nuclear fission and fusion, and nuclear energy.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph113.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["N = N₀e^(−λt) (Radioactive decay)", "T₁/₂ = 0.693/λ (Half-life)", "BE = [Zm_p + Nm_n − M]c² (Binding energy)", "Q = (M_i − M_f)c² (Q-value)"],
    studyGuide: [
      {
        topic: "Nuclear Size and Binding Energy",
        content: "Nuclear radius R = R₀A^(1/3), R₀ = 1.2 fm. Binding energy = [Zm_p + Nm_n − M_nucleus]c². Binding energy per nucleon peaks at Fe-56."
      },
      {
        topic: "Radioactive Decay",
        content: "N = N₀e^(−λt). Half-life T₁/₂ = 0.693/λ. Activity A = λN. Alpha, beta, and gamma decay with conservation laws."
      },
      {
        topic: "Nuclear Fission and Fusion",
        content: "Fission: heavy nucleus splits releasing ~200 MeV. Fusion: light nuclei combine releasing energy (sun's energy source). Both governed by mass-energy equivalence E = mc²."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "The half-life of ₃₈Sr⁹⁰ is 28 years. What is the disintegration rate of 15 mg of this isotope?",
        solution: "T₁/₂ = 28 y = 8.83×10⁸ s. λ = 0.693/T = 7.85×10⁻¹⁰ s⁻¹. N = (15×10⁻³/90)×6.02×10²³ = 1.0×10²⁰. A = λN = 7.87×10¹⁰ Bq."
      }
    ]
  },
  {
    id: 14,
    title: "Chapter 14: Semiconductor Electronics",
    shortTitle: "Semiconductor Electronics",
    description: "Covers energy bands, intrinsic and extrinsic semiconductors, p-n junction diode, rectifiers, transistors, and logic gates.",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph114.pdf",
    formulaSheetUrl: "https://www.collegedunia.com/school-education/cbse-class-12-physics-formulas",
    keyFormulas: ["I_E = I_B + I_C (KCL for transistor)", "β = I_C/I_B (Current gain)", "V_T = V_out/V_in (Voltage gain)", "Logic: NAND = NOT(A·B)"],
    studyGuide: [
      {
        topic: "Energy Bands",
        content: "Conductors: overlapping bands. Insulators: wide band gap (>3 eV). Semiconductors: small gap (~1 eV). Si band gap = 1.1 eV."
      },
      {
        topic: "p-n Junction Diode",
        content: "Depletion region forms at junction. Forward bias: reduces barrier, current flows. Reverse bias: increases barrier, only leakage current. V-I curve is non-linear."
      },
      {
        topic: "Rectifiers",
        content: "Half-wave: one diode, η ≈ 40.6%. Full-wave: two diodes + centre-tap or four diodes (bridge), η ≈ 81.2%."
      },
      {
        topic: "Transistors and Logic Gates",
        content: "Transistor as switch and amplifier. CE configuration gives high voltage gain A_v = −β × R_C/R_i. Logic gates: AND, OR, NOT, NAND, NOR."
      }
    ],
    solutions: [
      {
        id: 1,
        question: "In a p-n junction diode, the current in the forward bias is 10 mA with an applied voltage of 0.7 V. What is the static resistance?",
        solution: "R = V/I = 0.7/(10×10⁻³) = 70 Ω."
      }
    ]
  }
];
