const flashCard = document.querySelector(".flashcard-container");
const front_flash_card = document.querySelector(".front");
const back_flash_card = document.querySelector(".back");

const previous_button = document.querySelector(".previous_flashcard");
const next_button = document.querySelector(".next_flashcard");

const question = document.querySelector(".question");
const question_content = document.querySelector(".question-content");
const question_no = document.querySelector("#q-no");
const answer_no = document.querySelector("#a-no");
const answer_content = document.querySelector(".answer-content");
const solution_content = document.querySelector(".solution-content");

console.log(back_flash_card.style.transform);

const flipCard = () => {
  flashCard.classList.toggle("to-back");
  const flashCardStat = window.getComputedStyle(front_flash_card).display;

  if (flashCardStat === "flex") {
    front_flash_card.style.display = "none";
    back_flash_card.style.display = "flex";
  } else {
    front_flash_card.style.display = "flex";
    back_flash_card.style.display = "none";
  }
};

const clickedButton = (button) => {
  button.classList.add("clicked");
  setTimeout(() => {
    button.classList.remove("clicked");
  }, 300);
};

// Define MathJax configuration globally
window.MathJax = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

// Dynamically load the MathJax library
const script = document.createElement("script");
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.min.js";
script.async = true; // Ensure non-blocking
document.head.appendChild(script);

// flashCard.addEventListener("click", flipCard)

const questions_bank = [
  {
    id: 1,
    question: "If \\(x + 3 = 10\\), what is the value of \\(x\\)?",
    answer: "\\(x = 7\\)",
    solution:
      "Solve for \\(x\\): \\(x + 3 = 10\\).<br>Subtract 3 from both sides: \\(x = 10 - 3 = 7\\).",
  },
  {
    id: 2,
    question:
      "If the perimeter of a rectangle is 30 meters, and the length is 8 meters, what is the width?",
    answer: "The width is 7 meters.",
    solution:
      "The perimeter \\(P\\) of a rectangle is \\(P = 2L + 2W\\),<br>where \\(P\\) is the perimeter, \\(L\\) is the length, and \\(W\\) is the width.<br>Substituting \\(P = 30\\) and \\(L = 8\\): \\(30 = 2(8) + 2W\\).<br>Simplify: \\(30 = 16 + 2W\\).<br>Subtract 16: \\(14 = 2W\\).<br>Divide by 2: \\(W = 7\\).",
  },
  {
    id: 3,
    question: "What is the value of \\(3^2 + 4^2\\)?",
    answer: "\\(3^2 + 4^2 = 25\\)",
    solution:
      "The formula for squaring a number is \\(x^2 = x \\times x\\),<br>where \\(x\\) is the base number.<br>Calculate \\(3^2 = 9\\) and \\(4^2 = 16\\).<br>Add: \\(9 + 16 = 25\\).",
  },
  {
    id: 4,
    question:
      "The average of five numbers is 12. If four of the numbers are 8, 15, 10, and 5, what is the fifth number?",
    answer: "The fifth number is 22.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply average by 5: \\(12 \\times 5 = 60\\).<br>Sum of four numbers: \\(8 + 15 + 10 + 5 = 38\\).<br>Subtract: \\(60 - 38 = 22\\).",
  },
  {
    id: 5,
    question:
      "If a car travels 120 miles in 3 hours, what is its average speed?",
    answer: "The average speed is 40 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\),<br>where \\(\\text{Speed}\\) is the average speed, \\(\\text{Distance}\\) is the total distance traveled, and \\(\\text{Time}\\) is the total time taken.<br>Substituting \\(\\text{Distance} = 120\\) and \\(\\text{Time} = 3\\): \\(\\frac{120}{3} = 40\\) miles per hour.",
  },
  {
    id: 6,
    question: "What is the solution to \\(5x - 3 = 2x + 9\\)?",
    answer: "\\(x = 4\\)",
    solution:
      "To solve a linear equation, isolate \\(x\\) by performing inverse operations:<br>Subtract \\(2x\\) from both sides: \\(5x - 2x - 3 = 9\\).<br>Simplify: \\(3x - 3 = 9\\).<br>Add 3 to both sides: \\(3x = 12\\).<br>Divide by 3: \\(x = 4\\).",
  },
  {
    id: 7,
    question:
      "What is the area of a triangle with a base of 10 units and a height of 6 units?",
    answer: "The area of the triangle is 30 square units.",
    solution:
      "The formula for the area of a triangle is \\(A = \\frac{1}{2} \\times \\text{Base} \\times \\text{Height}\\),<br>where \\(A\\) is the area, \\(\\text{Base}\\) is the length of the base, and \\(\\text{Height}\\) is the perpendicular height.<br>Substituting \\(\\text{Base} = 10\\) and \\(\\text{Height} = 6\\): \\(\\frac{1}{2} \\times 10 \\times 6 = 30\\).",
  },
  {
    id: 8,
    question: "Simplify the expression: \\(6x + 3 - 4x + 8\\).",
    answer: "The simplified expression is \\(2x + 11\\).",
    solution:
      "Combine like terms:<br>Group \\(6x\\) and \\(-4x\\): \\(6x - 4x = 2x\\).<br>Group \\(3\\) and \\(8\\): \\(3 + 8 = 11\\).<br>Final expression: \\(2x + 11\\).",
  },
  {
    id: 9,
    question: "What is the value of \\(\\frac{3}{4} \\div \\frac{2}{5}\\)?",
    answer: "\\(\\frac{15}{8}\\)",
    solution:
      "To divide fractions, multiply the first fraction by the reciprocal of the second:<br>\\(\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}\\),<br>where \\(a, b, c, d\\) are integers and \\(b, d \\neq 0\\).<br>Substitute \\(\\frac{3}{4} \\times \\frac{5}{2} = \\frac{3 \\times 5}{4 \\times 2} = \\frac{15}{8}\\).",
  },
  {
    id: 10,
    question: "If a circle has a radius of 7 cm, what is its area?",
    answer:
      "The area of the circle is approximately 153.86 square centimeters.",
    solution:
      "The formula for the area of a circle is \\(A = \\pi r^2\\),<br>where \\(A\\) is the area and \\(r\\) is the radius.<br>Substitute \\(r = 7\\): \\(A = \\pi \\times 7^2 = \\pi \\times 49 \\approx 3.14 \\times 49 = 153.86\\).",
  },
  {
    id: 11,
    question: "If \\(7y + 2 = 30\\), what is the value of \\(y\\)?",
    answer: "\\(y = 4\\)",
    solution:
      "Solve for \\(y\\): \\(7y + 2 = 30\\).<br>Subtract 2 from both sides: \\(7y = 28\\).<br>Divide by 7: \\(y = 4\\).",
  },
  {
    id: 12,
    question: "If a square has a side length of 5 units, what is its area?",
    answer: "The area is 25 square units.",
    solution:
      "The formula for the area of a square is \\(A = s^2\\),<br>where \\(s\\) is the side length.<br>Substitute \\(s = 5\\): \\(A = 5^2 = 25\\).",
  },
  {
    id: 13,
    question: "What is the value of \\(12 - (3 + 4)\\)?",
    answer: "The value is 5.",
    solution:
      "First, calculate inside the parentheses: \\(3 + 4 = 7\\).<br>Then subtract: \\(12 - 7 = 5\\).",
  },
  {
    id: 14,
    question:
      "If a rectangle has a length of 9 cm and a width of 4 cm, what is its perimeter?",
    answer: "The perimeter is 26 cm.",
    solution:
      "The formula for the perimeter of a rectangle is \\(P = 2L + 2W\\),<br>where \\(L\\) is the length and \\(W\\) is the width.<br>Substitute \\(L = 9\\) and \\(W = 4\\): \\(P = 2(9) + 2(4) = 18 + 8 = 26\\).",
  },
  {
    id: 15,
    question: "What is \\(15\\%\\) of 60?",
    answer: "\\(15\\%\\) of 60 is 9.",
    solution:
      "To find \\(15\\%\\) of 60, multiply \\(60\\) by \\(0.15\\):<br>\\(60 \\times 0.15 = 9\\).",
  },
  {
    id: 16,
    question: "If \\(5x + 10 = 0\\), what is the value of \\(x\\)?",
    answer: "\\(x = -2\\)",
    solution:
      "Solve for \\(x\\): \\(5x + 10 = 0\\).<br>Subtract 10 from both sides: \\(5x = -10\\).<br>Divide by 5: \\(x = -2\\).",
  },
  {
    id: 17,
    question: "If a circle has a diameter of 14 cm, what is its circumference?",
    answer: "The circumference is approximately 43.96 cm.",
    solution:
      "The formula for the circumference of a circle is \\(C = \\pi d\\),<br>where \\(d\\) is the diameter.<br>Substitute \\(d = 14\\): \\(C = \\pi \\times 14 \\approx 3.14 \\times 14 = 43.96\\).",
  },
  {
    id: 18,
    question: "Simplify \\(4(x - 3) + 2x\\).",
    answer: "The simplified expression is \\(6x - 12\\).",
    solution:
      "Distribute \\(4\\) to \\(x - 3\\): \\(4x - 12\\).<br>Add \\(2x\\): \\(4x + 2x - 12 = 6x - 12\\).",
  },
  {
    id: 19,
    question: "What is the value of \\(\\frac{1}{2} \\times 8 \\div 4\\)?",
    answer: "The value is 1.",
    solution:
      "First, multiply: \\(\\frac{1}{2} \\times 8 = 4\\).<br>Then divide: \\(4 \\div 4 = 1\\).",
  },
  {
    id: 20,
    question:
      "If a triangle has sides of lengths 5 cm, 12 cm, and 13 cm, is it a right triangle?",
    answer: "Yes, it is a right triangle.",
    solution:
      "Use the Pythagorean Theorem: \\(a^2 + b^2 = c^2\\),<br>where \\(a\\) and \\(b\\) are the shorter sides and \\(c\\) is the hypotenuse.<br>Substitute \\(5^2 + 12^2 = 13^2\\): \\(25 + 144 = 169\\).<br>Since \\(169 = 169\\), the triangle is a right triangle.",
  },
  {
    id: 21,
    question: "If \\(x - 7 = 12\\), what is the value of \\(x\\)?",
    answer: "\\(x = 19\\)",
    solution:
      "Solve for \\(x\\): \\(x - 7 = 12\\).<br>Add 7 to both sides: \\(x = 12 + 7 = 19\\).",
  },
  {
    id: 22,
    question:
      "If a triangle has a base of 14 cm and a height of 10 cm, what is its area?",
    answer: "The area is 70 square centimeters.",
    solution:
      "The formula for the area of a triangle is \\(A = \\frac{1}{2} \\times \\text{Base} \\times \\text{Height}\\).<br>Substitute \\(\\text{Base} = 14\\) and \\(\\text{Height} = 10\\): \\(\\frac{1}{2} \\times 14 \\times 10 = 70\\).",
  },
  {
    id: 23,
    question: "Simplify \\(2(3x + 4) + 5x - 6\\).",
    answer: "The simplified expression is \\(11x + 2\\).",
    solution:
      "Distribute \\(2\\): \\(6x + 8\\).<br>Add \\(5x\\): \\(6x + 5x + 8 - 6 = 11x + 2\\).",
  },
  {
    id: 24,
    question: "What is the value of \\(\\frac{7}{8} - \\frac{3}{8}\\)?",
    answer: "\\(\\frac{4}{8}\\) or \\(\\frac{1}{2}\\)",
    solution:
      "Subtract fractions with the same denominator: \\(\\frac{7 - 3}{8} = \\frac{4}{8}\\).<br>Simplify: \\(\\frac{4}{8} = \\frac{1}{2}\\).",
  },
  {
    id: 25,
    question: "If \\(2x + 6 = 18\\), what is the value of \\(x\\)?",
    answer: "\\(x = 6\\)",
    solution:
      "Solve for \\(x\\): \\(2x + 6 = 18\\).<br>Subtract 6 from both sides: \\(2x = 12\\).<br>Divide by 2: \\(x = 6\\).",
  },
  {
    id: 26,
    question:
      "If the sum of three angles in a triangle is 180° and two angles are 45° and 90°, what is the third angle?",
    answer: "The third angle is 45°.",
    solution:
      "The sum of the angles in a triangle is always 180°.<br>Subtract the sum of the known angles: \\(180 - (45 + 90) = 180 - 135 = 45\\).",
  },
  {
    id: 27,
    question:
      "If a rectangle has an area of 32 square meters and a length of 8 meters, what is its width?",
    answer: "The width is 4 meters.",
    solution:
      "The formula for the area of a rectangle is \\(A = L \\times W\\),<br>where \\(A\\) is the area, \\(L\\) is the length, and \\(W\\) is the width.<br>Substitute \\(A = 32\\) and \\(L = 8\\): \\(32 = 8 \\times W\\).<br>Divide by 8: \\(W = 4\\).",
  },
  {
    id: 28,
    question: "What is \\(10\\%\\) of 250?",
    answer: "\\(10\\%\\) of 250 is 25.",
    solution:
      "To find \\(10\\%\\) of 250, multiply \\(250\\) by \\(0.1\\):<br>\\(250 \\times 0.1 = 25\\).",
  },
  {
    id: 29,
    question: "Simplify \\(\\frac{3}{5} + \\frac{2}{5}\\).",
    answer: "\\(\\frac{5}{5}\\) or 1",
    solution:
      "Add fractions with the same denominator: \\(\\frac{3 + 2}{5} = \\frac{5}{5}\\).<br>Simplify: \\(\\frac{5}{5} = 1\\).",
  },
  {
    id: 30,
    question: "If a cube has an edge length of 3 cm, what is its volume?",
    answer: "The volume is 27 cubic centimeters.",
    solution:
      "The formula for the volume of a cube is \\(V = s^3\\),<br>where \\(s\\) is the edge length.<br>Substitute \\(s = 3\\): \\(V = 3^3 = 3 \\times 3 \\times 3 = 27\\).",
  },
  {
    id: 31,
    question: "If \\(4x = 20\\), what is the value of \\(x\\)?",
    answer: "\\(x = 5\\)",
    solution:
      "Solve for \\(x\\): \\(4x = 20\\).<br>Divide both sides by 4: \\(x = 20 \\div 4 = 5\\).",
  },
  {
    id: 32,
    question: "If a circle has a radius of 6 cm, what is its circumference?",
    answer: "The circumference is approximately 37.68 cm.",
    solution:
      "The formula for the circumference of a circle is \\(C = 2\\pi r\\),<br>where \\(r\\) is the radius.<br>Substitute \\(r = 6\\): \\(C = 2 \\times \\pi \\times 6 = 12 \\pi \\approx 12 \\times 3.14 = 37.68\\).",
  },
  {
    id: 33,
    question: "Simplify \\(7x - 3x + 5\\).",
    answer: "The simplified expression is \\(4x + 5\\).",
    solution:
      "Combine like terms:<br>\\(7x - 3x = 4x\\).<br>Final expression: \\(4x + 5\\).",
  },
  {
    id: 34,
    question: "What is the value of \\(\\frac{5}{6} \\times \\frac{2}{3}\\)?",
    answer: "\\(\\frac{10}{18}\\) or \\(\\frac{5}{9}\\)",
    solution:
      "Multiply fractions by multiplying the numerators and the denominators:<br>\\(\\frac{5}{6} \\times \\frac{2}{3} = \\frac{5 \\times 2}{6 \\times 3} = \\frac{10}{18}\\).<br>Simplify: \\(\\frac{10}{18} = \\frac{5}{9}\\).",
  },
  {
    id: 35,
    question:
      "If a triangle has sides of lengths 6 cm, 8 cm, and 10 cm, is it a right triangle?",
    answer: "Yes, it is a right triangle.",
    solution:
      "Use the Pythagorean Theorem: \\(a^2 + b^2 = c^2\\),<br>where \\(a\\) and \\(b\\) are the shorter sides and \\(c\\) is the hypotenuse.<br>Substitute \\(6^2 + 8^2 = 10^2\\): \\(36 + 64 = 100\\).<br>Since \\(100 = 100\\), the triangle is a right triangle.",
  },
  {
    id: 36,
    question: "What is the value of \\(\\frac{3}{4} + \\frac{2}{5}\\)?",
    answer: "\\(\\frac{23}{20}\\)",
    solution:
      "Find a common denominator for \\(\\frac{3}{4}\\) and \\(\\frac{2}{5}\\), which is 20:<br>\\(\\frac{3}{4} = \\frac{15}{20}\\) and \\(\\frac{2}{5} = \\frac{8}{20}\\).<br>Add: \\(\\frac{15}{20} + \\frac{8}{20} = \\frac{23}{20}\\).",
  },
  {
    id: 37,
    question:
      "If the perimeter of a square is 36 cm, what is the length of one side?",
    answer: "The length of one side is 9 cm.",
    solution:
      "The formula for the perimeter of a square is \\(P = 4s\\),<br>where \\(s\\) is the side length.<br>Substitute \\(P = 36\\): \\(36 = 4s\\).<br>Divide by 4: \\(s = 9\\).",
  },
  {
    id: 38,
    question: "If \\(3x + 7 = 19\\), what is the value of \\(x\\)?",
    answer: "\\(x = 4\\)",
    solution:
      "Solve for \\(x\\): \\(3x + 7 = 19\\).<br>Subtract 7 from both sides: \\(3x = 12\\).<br>Divide by 3: \\(x = 4\\).",
  },
  {
    id: 39,
    question: "What is \\(20\\%\\) of 150?",
    answer: "\\(20\\%\\) of 150 is 30.",
    solution:
      "To find \\(20\\%\\) of 150, multiply \\(150\\) by \\(0.2\\):<br>\\(150 \\times 0.2 = 30\\).",
  },
  {
    id: 40,
    question:
      "If a rectangle has a length of 12 cm and a width of 5 cm, what is its area?",
    answer: "The area is 60 square centimeters.",
    solution:
      "The formula for the area of a rectangle is \\(A = L \\times W\\),<br>where \\(L\\) is the length and \\(W\\) is the width.<br>Substitute \\(L = 12\\) and \\(W = 5\\): \\(A = 12 \\times 5 = 60\\).",
  },
  {
    id: 31,
    question: "If \\(4x = 20\\), what is the value of \\(x\\)?",
    answer: "\\(x = 5\\)",
    solution:
      "Solve for \\(x\\): \\(4x = 20\\).<br>Divide both sides by 4: \\(x = 20 \\div 4 = 5\\).",
  },
  {
    id: 32,
    question: "If a circle has a radius of 6 cm, what is its circumference?",
    answer: "The circumference is approximately 37.68 cm.",
    solution:
      "The formula for the circumference of a circle is \\(C = 2\\pi r\\),<br>where \\(r\\) is the radius.<br>Substitute \\(r = 6\\): \\(C = 2 \\times \\pi \\times 6 = 12 \\pi \\approx 12 \\times 3.14 = 37.68\\).",
  },
  {
    id: 33,
    question: "Simplify \\(7x - 3x + 5\\).",
    answer: "The simplified expression is \\(4x + 5\\).",
    solution:
      "Combine like terms:<br>\\(7x - 3x = 4x\\).<br>Final expression: \\(4x + 5\\).",
  },
  {
    id: 34,
    question: "What is the value of \\(\\frac{5}{6} \\times \\frac{2}{3}\\)?",
    answer: "\\(\\frac{10}{18}\\) or \\(\\frac{5}{9}\\)",
    solution:
      "Multiply fractions by multiplying the numerators and the denominators:<br>\\(\\frac{5}{6} \\times \\frac{2}{3} = \\frac{5 \\times 2}{6 \\times 3} = \\frac{10}{18}\\).<br>Simplify: \\(\\frac{10}{18} = \\frac{5}{9}\\).",
  },
  {
    id: 35,
    question:
      "If a triangle has sides of lengths 6 cm, 8 cm, and 10 cm, is it a right triangle?",
    answer: "Yes, it is a right triangle.",
    solution:
      "Use the Pythagorean Theorem: \\(a^2 + b^2 = c^2\\),<br>where \\(a\\) and \\(b\\) are the shorter sides and \\(c\\) is the hypotenuse.<br>Substitute \\(6^2 + 8^2 = 10^2\\): \\(36 + 64 = 100\\).<br>Since \\(100 = 100\\), the triangle is a right triangle.",
  },
  {
    id: 36,
    question: "What is the value of \\(\\frac{3}{4} + \\frac{2}{5}\\)?",
    answer: "\\(\\frac{23}{20}\\)",
    solution:
      "Find a common denominator for \\(\\frac{3}{4}\\) and \\(\\frac{2}{5}\\), which is 20:<br>\\(\\frac{3}{4} = \\frac{15}{20}\\) and \\(\\frac{2}{5} = \\frac{8}{20}\\).<br>Add: \\(\\frac{15}{20} + \\frac{8}{20} = \\frac{23}{20}\\).",
  },
  {
    id: 37,
    question:
      "If the perimeter of a square is 36 cm, what is the length of one side?",
    answer: "The length of one side is 9 cm.",
    solution:
      "The formula for the perimeter of a square is \\(P = 4s\\),<br>where \\(s\\) is the side length.<br>Substitute \\(P = 36\\): \\(36 = 4s\\).<br>Divide by 4: \\(s = 9\\).",
  },
  {
    id: 38,
    question: "If \\(3x + 7 = 19\\), what is the value of \\(x\\)?",
    answer: "\\(x = 4\\)",
    solution:
      "Solve for \\(x\\): \\(3x + 7 = 19\\).<br>Subtract 7 from both sides: \\(3x = 12\\).<br>Divide by 3: \\(x = 4\\).",
  },
  {
    id: 39,
    question: "What is \\(20\\%\\) of 150?",
    answer: "\\(20\\%\\) of 150 is 30.",
    solution:
      "To find \\(20\\%\\) of 150, multiply \\(150\\) by \\(0.2\\):<br>\\(150 \\times 0.2 = 30\\).",
  },
  {
    id: 40,
    question:
      "If a rectangle has a length of 12 cm and a width of 5 cm, what is its area?",
    answer: "The area is 60 square centimeters.",
    solution:
      "The formula for the area of a rectangle is \\(A = L \\times W\\),<br>where \\(L\\) is the length and \\(W\\) is the width.<br>Substitute \\(L = 12\\) and \\(W = 5\\): \\(A = 12 \\times 5 = 60\\).",
  },
  {
    id: 41,
    question: "If \\(5x + 4 = 19\\), what is the value of \\(x\\)?",
    answer: "\\(x = 3\\)",
    solution:
      "Solve for \\(x\\): \\(5x + 4 = 19\\).<br>Subtract 4 from both sides: \\(5x = 15\\).<br>Divide by 5: \\(x = 3\\).",
  },
  {
    id: 42,
    question: "Simplify \\(8y - 3y + 6\\).",
    answer: "The simplified expression is \\(5y + 6\\).",
    solution:
      "Combine like terms:<br>\\(8y - 3y = 5y\\).<br>Final expression: \\(5y + 6\\).",
  },
  {
    id: 43,
    question: "What is the value of \\(\\frac{7}{9} - \\frac{2}{9}\\)?",
    answer: "\\(\\frac{5}{9}\\)",
    solution:
      "Subtract fractions with the same denominator: \\(\\frac{7 - 2}{9} = \\frac{5}{9}\\).",
  },
  {
    id: 44,
    question:
      "If the perimeter of a rectangle is 50 meters and its width is 10 meters, what is its length?",
    answer: "The length is 15 meters.",
    solution:
      "The formula for the perimeter of a rectangle is \\(P = 2L + 2W\\).<br>Substitute \\(P = 50\\) and \\(W = 10\\): \\(50 = 2L + 2(10)\\).<br>Simplify: \\(50 = 2L + 20\\).<br>Subtract 20: \\(30 = 2L\\).<br>Divide by 2: \\(L = 15\\).",
  },
  {
    id: 45,
    question: "What is \\(15\\%\\) of 200?",
    answer: "\\(15\\%\\) of 200 is 30.",
    solution:
      "To find \\(15\\%\\) of 200, multiply \\(200\\) by \\(0.15\\):<br>\\(200 \\times 0.15 = 30\\).",
  },
  {
    id: 46,
    question:
      "If a triangle has angles measuring 60°, 60°, and 60°, what type of triangle is it?",
    answer: "It is an equilateral triangle.",
    solution:
      "An equilateral triangle has all angles equal to 60° and all sides of the same length.",
  },
  {
    id: 47,
    question: "What is the value of \\(4^3\\)?",
    answer: "\\(4^3 = 64\\)",
    solution:
      "The formula for exponents is \\(x^n = x \\times x \\times ...\\) (\\(n\\) times).<br>Calculate \\(4^3 = 4 \\times 4 \\times 4 = 64\\).",
  },
  {
    id: 48,
    question:
      "If the sum of two numbers is 18 and one number is 7, what is the other number?",
    answer: "The other number is 11.",
    solution:
      "Let the other number be \\(x\\).<br>\\(x + 7 = 18\\).<br>Subtract 7 from both sides: \\(x = 18 - 7 = 11\\).",
  },
  {
    id: 49,
    question: "Simplify \\(\\frac{6}{8}\\).",
    answer: "\\(\\frac{6}{8} = \\frac{3}{4}\\)",
    solution:
      "Simplify \\(\\frac{6}{8}\\) by dividing the numerator and denominator by their greatest common divisor (2):<br>\\(\\frac{6 \\div 2}{8 \\div 2} = \\frac{3}{4}\\).",
  },
  {
    id: 50,
    question:
      "If a cube has a volume of 64 cubic centimeters, what is the length of one side?",
    answer: "The side length is 4 cm.",
    solution:
      "The formula for the volume of a cube is \\(V = s^3\\),<br>where \\(s\\) is the side length.<br>Substitute \\(V = 64\\): \\(64 = s^3\\).<br>Find the cube root of \\(64\\): \\(s = 4\\).",
  },
  {
    id: 51,
    question: "If \\(2x + 7 = 15\\), what is the value of \\(x\\)?",
    answer: "\\(x = 4\\)",
    solution:
      "Solve for \\(x\\): \\(2x + 7 = 15\\).<br>Subtract 7 from both sides: \\(2x = 8\\).<br>Divide by 2: \\(x = 4\\).",
  },
  {
    id: 52,
    question: "Simplify \\(9a + 4 - 3a - 2\\).",
    answer: "The simplified expression is \\(6a + 2\\).",
    solution:
      "Combine like terms:<br>\\(9a - 3a = 6a\\).<br>\\(4 - 2 = 2\\).<br>Final expression: \\(6a + 2\\).",
  },
  {
    id: 53,
    question: "What is the value of \\(\\frac{2}{3} \\times \\frac{5}{7}\\)?",
    answer: "\\(\\frac{10}{21}\\)",
    solution:
      "Multiply fractions by multiplying the numerators and denominators:<br>\\(\\frac{2}{3} \\times \\frac{5}{7} = \\frac{2 \\times 5}{3 \\times 7} = \\frac{10}{21}\\).",
  },
  {
    id: 54,
    question:
      "If a triangle has a base of 9 units and a height of 4 units, what is its area?",
    answer: "The area is 18 square units.",
    solution:
      "The formula for the area of a triangle is \\(A = \\frac{1}{2} \\times \\text{Base} \\times \\text{Height}\\).<br>Substitute \\(\\text{Base} = 9\\) and \\(\\text{Height} = 4\\): \\(A = \\frac{1}{2} \\times 9 \\times 4 = 18\\).",
  },
  {
    id: 55,
    question: "What is the least common multiple (LCM) of 6 and 8?",
    answer: "The LCM is 24.",
    solution:
      "The multiples of 6 are \\(6, 12, 18, 24, ...\\).<br>The multiples of 8 are \\(8, 16, 24, ...\\).<br>The smallest common multiple is 24.",
  },
  {
    id: 56,
    question:
      "If a car travels 240 miles in 6 hours, what is its average speed?",
    answer: "The average speed is 40 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 240\\) and \\(\\text{Time} = 6\\): \\(\\frac{240}{6} = 40\\) miles per hour.",
  },
  {
    id: 57,
    question:
      "If the sum of three numbers is 42 and two of the numbers are 15 and 18, what is the third number?",
    answer: "The third number is 9.",
    solution:
      "Let the third number be \\(x\\).<br>\\(15 + 18 + x = 42\\).<br>Add \\(15\\) and \\(18\\): \\(33 + x = 42\\).<br>Subtract 33 from both sides: \\(x = 9\\).",
  },
  {
    id: 58,
    question: "What is the value of \\(7^2\\)?",
    answer: "\\(7^2 = 49\\)",
    solution:
      "The formula for squaring a number is \\(x^2 = x \\times x\\).<br>Calculate \\(7^2 = 7 \\times 7 = 49\\).",
  },
  {
    id: 59,
    question: "Simplify \\(\\frac{12}{16}\\).",
    answer: "\\(\\frac{3}{4}\\)",
    solution:
      "Simplify \\(\\frac{12}{16}\\) by dividing the numerator and denominator by their greatest common divisor (4):<br>\\(\\frac{12 \\div 4}{16 \\div 4} = \\frac{3}{4}\\).",
  },
  {
    id: 60,
    question:
      "If a rectangle has an area of 48 square meters and a length of 8 meters, what is its width?",
    answer: "The width is 6 meters.",
    solution:
      "The formula for the area of a rectangle is \\(A = L \\times W\\).<br>Substitute \\(A = 48\\) and \\(L = 8\\): \\(48 = 8 \\times W\\).<br>Divide by 8: \\(W = 6\\).",
  },
  {
    id: 61,
    question: "If \\(3x - 5 = 16\\), what is the value of \\(x\\)?",
    answer: "\\(x = 7\\)",
    solution:
      "Solve for \\(x\\): \\(3x - 5 = 16\\).<br>Add 5 to both sides: \\(3x = 21\\).<br>Divide by 3: \\(x = 7\\).",
  },
  {
    id: 62,
    question: "Simplify \\(10m + 6 - 4m - 2\\).",
    answer: "The simplified expression is \\(6m + 4\\).",
    solution:
      "Combine like terms:<br>\\(10m - 4m = 6m\\).<br>\\(6 - 2 = 4\\).<br>Final expression: \\(6m + 4\\).",
  },
  {
    id: 63,
    question: "What is the value of \\(\\frac{5}{6} + \\frac{2}{6}\\)?",
    answer: "\\(\\frac{7}{6}\\) or \\(1 \\frac{1}{6}\\)",
    solution:
      "Add fractions with the same denominator:<br>\\(\\frac{5}{6} + \\frac{2}{6} = \\frac{5 + 2}{6} = \\frac{7}{6}\\).<br>Convert \\(\\frac{7}{6}\\) to a mixed number: \\(1 \\frac{1}{6}\\).",
  },
  {
    id: 64,
    question:
      "If a triangle has sides of length 3 cm, 4 cm, and 5 cm, what type of triangle is it?",
    answer: "It is a right triangle.",
    solution:
      "Check the Pythagorean theorem: \\(a^2 + b^2 = c^2\\),<br>where \\(c\\) is the longest side.<br>\\(3^2 + 4^2 = 9 + 16 = 25 = 5^2\\).<br>The triangle is a right triangle.",
  },
  {
    id: 65,
    question: "What is the greatest common divisor (GCD) of 24 and 36?",
    answer: "The GCD is 12.",
    solution:
      "The factors of 24 are \\(1, 2, 3, 4, 6, 8, 12, 24\\).<br>The factors of 36 are \\(1, 2, 3, 4, 6, 9, 12, 18, 36\\).<br>The greatest common factor is \\(12\\).",
  },
  {
    id: 66,
    question:
      "If a car travels 90 kilometers in 2 hours, what is its average speed?",
    answer: "The average speed is 45 kilometers per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 90\\) and \\(\\text{Time} = 2\\): \\(\\frac{90}{2} = 45\\) kilometers per hour.",
  },
  {
    id: 67,
    question:
      "If the average of four numbers is 20 and three of the numbers are 18, 22, and 16, what is the fourth number?",
    answer: "The fourth number is 24.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 4: \\(20 \\times 4 = 80\\).<br>Sum of three numbers: \\(18 + 22 + 16 = 56\\).<br>Subtract: \\(80 - 56 = 24\\).",
  },
  {
    id: 68,
    question: "What is the value of \\(2^4\\)?",
    answer: "\\(2^4 = 16\\)",
    solution:
      "The formula for exponents is \\(x^n = x \\times x \\times ...\\) (\\(n\\) times).<br>Calculate \\(2^4 = 2 \\times 2 \\times 2 \\times 2 = 16\\).",
  },
  {
    id: 69,
    question: "Simplify \\(\\frac{18}{24}\\).",
    answer: "\\(\\frac{3}{4}\\)",
    solution:
      "Simplify \\(\\frac{18}{24}\\) by dividing the numerator and denominator by their greatest common divisor (6):<br>\\(\\frac{18 \\div 6}{24 \\div 6} = \\frac{3}{4}\\).",
  },
  {
    id: 70,
    question:
      "If a rectangle has an area of 72 square meters and a width of 9 meters, what is its length?",
    answer: "The length is 8 meters.",
    solution:
      "The formula for the area of a rectangle is \\(A = L \\times W\\).<br>Substitute \\(A = 72\\) and \\(W = 9\\): \\(72 = L \\times 9\\).<br>Divide by 9: \\(L = 8\\).",
  },
  {
    id: 71,
    question: "If \\(4x + 6 = 26\\), what is the value of \\(x\\)?",
    answer: "\\(x = 5\\)",
    solution:
      "Solve for \\(x\\): \\(4x + 6 = 26\\).<br>Subtract 6 from both sides: \\(4x = 20\\).<br>Divide by 4: \\(x = 5\\).",
  },
  {
    id: 72,
    question: "Simplify \\(7p - 3 + 5p + 9\\).",
    answer: "The simplified expression is \\(12p + 6\\).",
    solution:
      "Combine like terms:<br>\\(7p + 5p = 12p\\).<br>\\(-3 + 9 = 6\\).<br>Final expression: \\(12p + 6\\).",
  },
  {
    id: 73,
    question: "What is the value of \\(\\frac{5}{8} - \\frac{3}{8}\\)?",
    answer: "\\(\\frac{2}{8}\\) or \\(\\frac{1}{4}\\)",
    solution:
      "Subtract fractions with the same denominator:<br>\\(\\frac{5}{8} - \\frac{3}{8} = \\frac{5 - 3}{8} = \\frac{2}{8}\\).<br>Simplify \\(\\frac{2}{8}\\) by dividing by 2: \\(\\frac{1}{4}\\).",
  },
  {
    id: 74,
    question:
      "What is the perimeter of a rectangle with a length of 10 cm and a width of 6 cm?",
    answer: "The perimeter is 32 cm.",
    solution:
      "The formula for the perimeter of a rectangle is \\(P = 2L + 2W\\).<br>Substitute \\(L = 10\\) and \\(W = 6\\): \\(P = 2(10) + 2(6) = 20 + 12 = 32\\).",
  },
  {
    id: 75,
    question: "What is the least common multiple (LCM) of 9 and 12?",
    answer: "The LCM is 36.",
    solution:
      "The multiples of 9 are \\(9, 18, 27, 36, ...\\).<br>The multiples of 12 are \\(12, 24, 36, ...\\).<br>The smallest common multiple is 36.",
  },
  {
    id: 76,
    question:
      "If a train travels 300 miles in 5 hours, what is its average speed?",
    answer: "The average speed is 60 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 300\\) and \\(\\text{Time} = 5\\): \\(\\frac{300}{5} = 60\\) miles per hour.",
  },
  {
    id: 77,
    question:
      "If the average of three numbers is 15 and two of the numbers are 10 and 20, what is the third number?",
    answer: "The third number is 15.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 3: \\(15 \\times 3 = 45\\).<br>Sum of two numbers: \\(10 + 20 = 30\\).<br>Subtract: \\(45 - 30 = 15\\).",
  },
  {
    id: 78,
    question: "What is the value of \\(3^3\\)?",
    answer: "\\(3^3 = 27\\)",
    solution:
      "The formula for exponents is \\(x^n = x \\times x \\times ...\\) (\\(n\\) times).<br>Calculate \\(3^3 = 3 \\times 3 \\times 3 = 27\\).",
  },
  {
    id: 79,
    question: "Simplify \\(\\frac{20}{25}\\).",
    answer: "\\(\\frac{4}{5}\\)",
    solution:
      "Simplify \\(\\frac{20}{25}\\) by dividing the numerator and denominator by their greatest common divisor (5):<br>\\(\\frac{20 \\div 5}{25 \\div 5} = \\frac{4}{5}\\).",
  },
  {
    id: 80,
    question: "If a circle has a diameter of 14 cm, what is its circumference?",
    answer: "The circumference is approximately 43.96 cm.",
    solution:
      "The formula for the circumference of a circle is \\(C = \\pi d\\), where \\(d\\) is the diameter.<br>Substitute \\(d = 14\\): \\(C = \\pi \\times 14 \\approx 3.14 \\times 14 = 43.96\\).",
  },
  {
    id: 81,
    question: "If \\(2x + 7 = 21\\), what is the value of \\(x\\)?",
    answer: "\\(x = 7\\)",
    solution:
      "Solve for \\(x\\): \\(2x + 7 = 21\\).<br>Subtract 7 from both sides: \\(2x = 14\\).<br>Divide by 2: \\(x = 7\\).",
  },
  {
    id: 82,
    question: "Simplify \\(5y + 3 - 2y - 8\\).",
    answer: "The simplified expression is \\(3y - 5\\).",
    solution:
      "Combine like terms:<br>\\(5y - 2y = 3y\\).<br>\\(3 - 8 = -5\\).<br>Final expression: \\(3y - 5\\).",
  },
  {
    id: 83,
    question: "What is the value of \\(\\frac{7}{12} + \\frac{5}{12}\\)?",
    answer: "\\(\\frac{12}{12}\\) or \\(1\\)",
    solution:
      "Add fractions with the same denominator:<br>\\(\\frac{7}{12} + \\frac{5}{12} = \\frac{7 + 5}{12} = \\frac{12}{12}\\).<br>Simplify: \\(\\frac{12}{12} = 1\\).",
  },
  {
    id: 84,
    question:
      "What is the area of a rectangle with a length of 8 meters and a width of 5 meters?",
    answer: "The area is 40 square meters.",
    solution:
      "The formula for the area of a rectangle is \\(A = L \\times W\\).<br>Substitute \\(L = 8\\) and \\(W = 5\\): \\(A = 8 \\times 5 = 40\\).",
  },
  {
    id: 85,
    question: "What is the greatest common divisor (GCD) of 18 and 27?",
    answer: "The GCD is 9.",
    solution:
      "The factors of 18 are \\(1, 2, 3, 6, 9, 18\\).<br>The factors of 27 are \\(1, 3, 9, 27\\).<br>The greatest common factor is \\(9\\).",
  },
  {
    id: 86,
    question:
      "If a bus travels 240 miles in 6 hours, what is its average speed?",
    answer: "The average speed is 40 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 240\\) and \\(\\text{Time} = 6\\): \\(\\frac{240}{6} = 40\\) miles per hour.",
  },
  {
    id: 87,
    question:
      "If the average of five numbers is 25 and four of the numbers are 20, 30, 25, and 35, what is the fifth number?",
    answer: "The fifth number is 15.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 5: \\(25 \\times 5 = 125\\).<br>Sum of four numbers: \\(20 + 30 + 25 + 35 = 110\\).<br>Subtract: \\(125 - 110 = 15\\).",
  },
  {
    id: 88,
    question: "What is the value of \\(4^3\\)?",
    answer: "\\(4^3 = 64\\)",
    solution:
      "The formula for exponents is \\(x^n = x \\times x \\times ...\\) (\\(n\\) times).<br>Calculate \\(4^3 = 4 \\times 4 \\times 4 = 64\\).",
  },
  {
    id: 89,
    question: "Simplify \\(\\frac{16}{20}\\).",
    answer: "\\(\\frac{4}{5}\\)",
    solution:
      "Simplify \\(\\frac{16}{20}\\) by dividing the numerator and denominator by their greatest common divisor (4):<br>\\(\\frac{16 \\div 4}{20 \\div 4} = \\frac{4}{5}\\).",
  },
  {
    id: 90,
    question: "If a circle has a radius of 5 cm, what is its circumference?",
    answer: "The circumference is approximately 31.4 cm.",
    solution:
      "The formula for the circumference of a circle is \\(C = 2\\pi r\\), where \\(r\\) is the radius.<br>Substitute \\(r = 5\\): \\(C = 2 \\times \\pi \\times 5 \\approx 2 \\times 3.14 \\times 5 = 31.4\\).",
  },
  {
    id: 91,
    question: "If \\(3x - 4 = 14\\), what is the value of \\(x\\)?",
    answer: "\\(x = 6\\)",
    solution:
      "Solve for \\(x\\): \\(3x - 4 = 14\\).<br>Add 4 to both sides: \\(3x = 18\\).<br>Divide by 3: \\(x = 6\\).",
  },
  {
    id: 92,
    question: "Simplify \\(8a + 3 - 6a - 7\\).",
    answer: "The simplified expression is \\(2a - 4\\).",
    solution:
      "Combine like terms:<br>\\(8a - 6a = 2a\\).<br>\\(3 - 7 = -4\\).<br>Final expression: \\(2a - 4\\).",
  },
  {
    id: 93,
    question: "What is the value of \\(\\frac{9}{10} + \\frac{3}{10}\\)?",
    answer: "\\(\\frac{12}{10}\\) or \\(\\frac{6}{5}\\)",
    solution:
      "Add fractions with the same denominator:<br>\\(\\frac{9}{10} + \\frac{3}{10} = \\frac{9 + 3}{10} = \\frac{12}{10}\\).<br>Simplify \\(\\frac{12}{10}\\) by dividing by 2: \\(\\frac{6}{5}\\).",
  },
  {
    id: 94,
    question: "What is the perimeter of a square with a side length of 9 cm?",
    answer: "The perimeter is 36 cm.",
    solution:
      "The formula for the perimeter of a square is \\(P = 4s\\), where \\(s\\) is the side length.<br>Substitute \\(s = 9\\): \\(P = 4 \\times 9 = 36\\).",
  },
  {
    id: 95,
    question: "What is the least common multiple (LCM) of 8 and 14?",
    answer: "The LCM is 56.",
    solution:
      "The multiples of 8 are \\(8, 16, 24, 32, 40, 48, 56, ...\\).<br>The multiples of 14 are \\(14, 28, 42, 56, ...\\).<br>The smallest common multiple is 56.",
  },
  {
    id: 96,
    question:
      "If a car travels 480 miles in 8 hours, what is its average speed?",
    answer: "The average speed is 60 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 480\\) and \\(\\text{Time} = 8\\): \\(\\frac{480}{8} = 60\\) miles per hour.",
  },
  {
    id: 97,
    question:
      "If the average of four numbers is 40 and three of the numbers are 35, 45, and 50, what is the fourth number?",
    answer: "The fourth number is 30.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 4: \\(40 \\times 4 = 160\\).<br>Sum of three numbers: \\(35 + 45 + 50 = 130\\).<br>Subtract: \\(160 - 130 = 30\\).",
  },
  {
    id: 98,
    question: "What is the value of \\(2^5\\)?",
    answer: "\\(2^5 = 32\\)",
    solution:
      "The formula for exponents is \\(x^n = x \\times x \\times ...\\) (\\(n\\) times).<br>Calculate \\(2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32\\).",
  },
  {
    id: 99,
    question: "Simplify \\(\\frac{24}{36}\\).",
    answer: "\\(\\frac{2}{3}\\)",
    solution:
      "Simplify \\(\\frac{24}{36}\\) by dividing the numerator and denominator by their greatest common divisor (12):<br>\\(\\frac{24 \\div 12}{36 \\div 12} = \\frac{2}{3}\\).",
  },
  {
    id: 100,
    question: "If a circle has a radius of 10 cm, what is its area?",
    answer: "The area is approximately 314 square centimeters.",
    solution:
      "The formula for the area of a circle is \\(A = \\pi r^2\\), where \\(r\\) is the radius.<br>Substitute \\(r = 10\\): \\(A = \\pi \\times 10^2 = \\pi \\times 100 \\approx 3.14 \\times 100 = 314\\).",
  },
  {
    id: 101,
    question: "If \\(4x + 5 = 21\\), what is the value of \\(x\\)?",
    answer: "\\(x = 4\\)",
    solution:
      "Solve for \\(x\\): \\(4x + 5 = 21\\).<br>Subtract 5 from both sides: \\(4x = 16\\).<br>Divide by 4: \\(x = 4\\).",
  },
  {
    id: 102,
    question: "Simplify \\(10m - 4 + 3m + 6\\).",
    answer: "The simplified expression is \\(13m + 2\\).",
    solution:
      "Combine like terms:<br>\\(10m + 3m = 13m\\).<br>\\(-4 + 6 = 2\\).<br>Final expression: \\(13m + 2\\).",
  },
  {
    id: 103,
    question: "What is the value of \\(\\frac{5}{8} - \\frac{3}{8}\\)?",
    answer: "\\(\\frac{2}{8}\\) or \\(\\frac{1}{4}\\)",
    solution:
      "Subtract fractions with the same denominator:<br>\\(\\frac{5}{8} - \\frac{3}{8} = \\frac{5 - 3}{8} = \\frac{2}{8}\\).<br>Simplify \\(\\frac{2}{8}\\) by dividing by 2: \\(\\frac{1}{4}\\).",
  },
  {
    id: 104,
    question:
      "What is the area of a triangle with a base of 12 cm and a height of 10 cm?",
    answer: "The area is 60 square centimeters.",
    solution:
      "The formula for the area of a triangle is \\(A = \\frac{1}{2} \\times \\text{Base} \\times \\text{Height}\\).<br>Substitute \\(\\text{Base} = 12\\) and \\(\\text{Height} = 10\\): \\(\\frac{1}{2} \\times 12 \\times 10 = 60\\).",
  },
  {
    id: 105,
    question: "What is the greatest common divisor (GCD) of 24 and 36?",
    answer: "The GCD is 12.",
    solution:
      "The factors of 24 are \\(1, 2, 3, 4, 6, 8, 12, 24\\).<br>The factors of 36 are \\(1, 2, 3, 4, 6, 9, 12, 18, 36\\).<br>The greatest common factor is \\(12\\).",
  },
  {
    id: 106,
    question:
      "If a train travels 300 miles in 5 hours, what is its average speed?",
    answer: "The average speed is 60 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 300\\) and \\(\\text{Time} = 5\\): \\(\\frac{300}{5} = 60\\) miles per hour.",
  },
  {
    id: 107,
    question:
      "If the average of six numbers is 50 and five of the numbers are 45, 55, 50, 60, and 40, what is the sixth number?",
    answer: "The sixth number is 50.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 6: \\(50 \\times 6 = 300\\).<br>Sum of five numbers: \\(45 + 55 + 50 + 60 + 40 = 250\\).<br>Subtract: \\(300 - 250 = 50\\).",
  },
  {
    id: 108,
    question: "What is the value of \\(3^4\\)?",
    answer: "\\(3^4 = 81\\)",
    solution:
      "The formula for exponents is \\(x^n = x \\times x \\times ...\\) (\\(n\\) times).<br>Calculate \\(3^4 = 3 \\times 3 \\times 3 \\times 3 = 81\\).",
  },
  {
    id: 109,
    question: "Simplify \\(\\frac{45}{60}\\).",
    answer: "\\(\\frac{3}{4}\\)",
    solution:
      "Simplify \\(\\frac{45}{60}\\) by dividing the numerator and denominator by their greatest common divisor (15):<br>\\(\\frac{45 \\div 15}{60 \\div 15} = \\frac{3}{4}\\).",
  },
  {
    id: 110,
    question: "If a circle has a diameter of 14 cm, what is its circumference?",
    answer: "The circumference is approximately 43.96 cm.",
    solution:
      "The formula for the circumference of a circle is \\(C = \\pi d\\), where \\(d\\) is the diameter.<br>Substitute \\(d = 14\\): \\(C = \\pi \\times 14 \\approx 3.14 \\times 14 = 43.96\\).",
  },
  {
    id: 111,
    question: "If \\(7x - 5 = 23\\), what is the value of \\(x\\)?",
    answer: "\\(x = 4\\)",
    solution:
      "Solve for \\(x\\): \\(7x - 5 = 23\\).<br>Add 5 to both sides: \\(7x = 28\\).<br>Divide by 7: \\(x = 4\\).",
  },
  {
    id: 112,
    question: "Simplify \\(5p + 7 - 3p - 2\\).",
    answer: "The simplified expression is \\(2p + 5\\).",
    solution:
      "Combine like terms:<br>\\(5p - 3p = 2p\\).<br>\\(7 - 2 = 5\\).<br>Final expression: \\(2p + 5\\).",
  },
  {
    id: 113,
    question: "What is the value of \\(\\frac{7}{12} + \\frac{5}{12}\\)?",
    answer: "\\(\\frac{12}{12}\\) or \\(1\\)",
    solution:
      "Add fractions with the same denominator:<br>\\(\\frac{7}{12} + \\frac{5}{12} = \\frac{7 + 5}{12} = \\frac{12}{12}\\).<br>Simplify \\(\\frac{12}{12}\\) to \\(1\\).",
  },
  {
    id: 114,
    question:
      "What is the area of a rectangle with a length of 15 cm and a width of 8 cm?",
    answer: "The area is 120 square centimeters.",
    solution:
      "The formula for the area of a rectangle is \\(A = \\text{Length} \\times \\text{Width}\\).<br>Substitute \\(\\text{Length} = 15\\) and \\(\\text{Width} = 8\\): \\(15 \\times 8 = 120\\).",
  },
  {
    id: 115,
    question: "What is the least common multiple (LCM) of 6 and 9?",
    answer: "The LCM is 18.",
    solution:
      "The multiples of 6 are \\(6, 12, 18, 24, ...\\).<br>The multiples of 9 are \\(9, 18, 27, ...\\).<br>The smallest common multiple is \\(18\\).",
  },
  {
    id: 116,
    question:
      "If a plane flies 600 miles in 2.5 hours, what is its average speed?",
    answer: "The average speed is 240 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 600\\) and \\(\\text{Time} = 2.5\\): \\(\\frac{600}{2.5} = 240\\) miles per hour.",
  },
  {
    id: 117,
    question:
      "If the average of four numbers is 25 and three of the numbers are 20, 30, and 15, what is the fourth number?",
    answer: "The fourth number is 35.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 4: \\(25 \\times 4 = 100\\).<br>Sum of three numbers: \\(20 + 30 + 15 = 65\\).<br>Subtract: \\(100 - 65 = 35\\).",
  },
  {
    id: 118,
    question: "What is the value of \\(4^3\\)?",
    answer: "\\(4^3 = 64\\)",
    solution:
      "The formula for exponents is \\(x^n = x \\times x \\times ...\\) (\\(n\\) times).<br>Calculate \\(4^3 = 4 \\times 4 \\times 4 = 64\\).",
  },
  {
    id: 119,
    question: "Simplify \\(\\frac{18}{24}\\).",
    answer: "\\(\\frac{3}{4}\\)",
    solution:
      "Simplify \\(\\frac{18}{24}\\) by dividing the numerator and denominator by their greatest common divisor (6):<br>\\(\\frac{18 \\div 6}{24 \\div 6} = \\frac{3}{4}\\).",
  },
  {
    id: 120,
    question: "If a circle has a radius of 5 cm, what is its circumference?",
    answer: "The circumference is approximately 31.4 cm.",
    solution:
      "The formula for the circumference of a circle is \\(C = 2\\pi r\\), where \\(r\\) is the radius.<br>Substitute \\(r = 5\\): \\(C = 2 \\times \\pi \\times 5 \\approx 2 \\times 3.14 \\times 5 = 31.4\\).",
  },
  {
    id: 121,
    question: "If \\(2x + 7 = 19\\), what is the value of \\(x\\)?",
    answer: "\\(x = 6\\)",
    solution:
      "Solve for \\(x\\): \\(2x + 7 = 19\\).<br>Subtract 7 from both sides: \\(2x = 12\\).<br>Divide by 2: \\(x = 6\\).",
  },
  {
    id: 122,
    question: "Simplify \\(8k - 3 + 4k + 7\\).",
    answer: "The simplified expression is \\(12k + 4\\).",
    solution:
      "Combine like terms:<br>\\(8k + 4k = 12k\\).<br>\\(-3 + 7 = 4\\).<br>Final expression: \\(12k + 4\\).",
  },
  {
    id: 123,
    question: "What is the value of \\(\\frac{9}{10} - \\frac{3}{10}\\)?",
    answer: "\\(\\frac{6}{10}\\) or \\(\\frac{3}{5}\\)",
    solution:
      "Subtract fractions with the same denominator:<br>\\(\\frac{9}{10} - \\frac{3}{10} = \\frac{9 - 3}{10} = \\frac{6}{10}\\).<br>Simplify \\(\\frac{6}{10}\\) by dividing by 2: \\(\\frac{3}{5}\\).",
  },
  {
    id: 124,
    question:
      "What is the perimeter of a rectangle with a length of 18 cm and a width of 12 cm?",
    answer: "The perimeter is 60 cm.",
    solution:
      "The formula for the perimeter of a rectangle is \\(P = 2(\\text{Length} + \\text{Width})\\).<br>Substitute \\(\\text{Length} = 18\\) and \\(\\text{Width} = 12\\): \\(2(18 + 12) = 2(30) = 60\\).",
  },
  {
    id: 125,
    question: "What is the greatest common divisor (GCD) of 32 and 48?",
    answer: "The GCD is 16.",
    solution:
      "The factors of 32 are \\(1, 2, 4, 8, 16, 32\\).<br>The factors of 48 are \\(1, 2, 4, 8, 12, 16, 24, 48\\).<br>The greatest common factor is \\(16\\).",
  },
  {
    id: 126,
    question:
      "If a car travels 90 miles in 1.5 hours, what is its average speed?",
    answer: "The average speed is 60 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 90\\) and \\(\\text{Time} = 1.5\\): \\(\\frac{90}{1.5} = 60\\) miles per hour.",
  },
  {
    id: 127,
    question:
      "If the average of three numbers is 20 and two of the numbers are 15 and 25, what is the third number?",
    answer: "The third number is 20.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 3: \\(20 \\times 3 = 60\\).<br>Sum of two numbers: \\(15 + 25 = 40\\).<br>Subtract: \\(60 - 40 = 20\\).",
  },
  {
    id: 128,
    question: "What is the value of \\(5^2\\)?",
    answer: "\\(5^2 = 25\\)",
    solution:
      "The formula for exponents is \\(x^n = x \\times x \\times ...\\) (\\(n\\) times).<br>Calculate \\(5^2 = 5 \\times 5 = 25\\).",
  },
  {
    id: 129,
    question: "Simplify \\(\\frac{30}{45}\\).",
    answer: "\\(\\frac{2}{3}\\)",
    solution:
      "Simplify \\(\\frac{30}{45}\\) by dividing the numerator and denominator by their greatest common divisor (15):<br>\\(\\frac{30 \\div 15}{45 \\div 15} = \\frac{2}{3}\\).",
  },
  {
    id: 130,
    question: "If a circle has a radius of 9 cm, what is its area?",
    answer: "The area is approximately 254.34 square centimeters.",
    solution:
      "The formula for the area of a circle is \\(A = \\pi r^2\\), where \\(r\\) is the radius.<br>Substitute \\(r = 9\\): \\(A = \\pi \\times 9^2 = \\pi \\times 81 \\approx 3.14 \\times 81 = 254.34\\).",
  },
  {
    id: 131,
    question: "If \\(3x + 2 = 14\\), what is the value of \\(x\\)?",
    answer: "\\(x = 4\\)",
    solution:
      "Solve for \\(x\\): \\(3x + 2 = 14\\).<br>Subtract 2 from both sides: \\(3x = 12\\).<br>Divide by 3: \\(x = 4\\).",
  },
  {
    id: 132,
    question: "Simplify \\(10a - 4 + 6a + 8\\).",
    answer: "The simplified expression is \\(16a + 4\\).",
    solution:
      "Combine like terms:<br>\\(10a + 6a = 16a\\).<br>\\(-4 + 8 = 4\\).<br>Final expression: \\(16a + 4\\).",
  },
  {
    id: 133,
    question: "What is the value of \\(\\frac{5}{6} + \\frac{7}{6}\\)?",
    answer: "\\(\\frac{12}{6}\\) or \\(2\\)",
    solution:
      "Add fractions with the same denominator:<br>\\(\\frac{5}{6} + \\frac{7}{6} = \\frac{5 + 7}{6} = \\frac{12}{6}\\).<br>Simplify \\(\\frac{12}{6}\\) to \\(2\\).",
  },
  {
    id: 134,
    question:
      "What is the perimeter of a square with each side measuring 11 cm?",
    answer: "The perimeter is 44 cm.",
    solution:
      "The formula for the perimeter of a square is \\(P = 4 \\times \\text{Side}\\).<br>Substitute \\(\\text{Side} = 11\\): \\(4 \\times 11 = 44\\).",
  },
  {
    id: 135,
    question: "What is the least common multiple (LCM) of 8 and 12?",
    answer: "The LCM is 24.",
    solution:
      "The multiples of 8 are \\(8, 16, 24, 32, ...\\).<br>The multiples of 12 are \\(12, 24, 36, ...\\).<br>The smallest common multiple is \\(24\\).",
  },
  {
    id: 136,
    question:
      "If a bike travels 45 miles in 3 hours, what is its average speed?",
    answer: "The average speed is 15 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 45\\) and \\(\\text{Time} = 3\\): \\(\\frac{45}{3} = 15\\) miles per hour.",
  },
  {
    id: 137,
    question:
      "If the average of five numbers is 18 and four of the numbers are 14, 22, 16, and 19, what is the fifth number?",
    answer: "The fifth number is 19.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 5: \\(18 \\times 5 = 90\\).<br>Sum of four numbers: \\(14 + 22 + 16 + 19 = 71\\).<br>Subtract: \\(90 - 71 = 19\\).",
  },
  {
    id: 138,
    question: "What is the value of \\(6^2\\)?",
    answer: "\\(6^2 = 36\\)",
    solution:
      "The formula for exponents is \\(x^n = x \\times x \\times ...\\) (\\(n\\) times).<br>Calculate \\(6^2 = 6 \\times 6 = 36\\).",
  },
  {
    id: 139,
    question: "Simplify \\(\\frac{28}{35}\\).",
    answer: "\\(\\frac{4}{5}\\)",
    solution:
      "Simplify \\(\\frac{28}{35}\\) by dividing the numerator and denominator by their greatest common divisor (7):<br>\\(\\frac{28 \\div 7}{",
  },
  {
    id: 141,
    question: "If \\(7x - 4 = 24\\), what is the value of \\(x\\)?",
    answer: "\\(x = 4\\)",
    solution:
      "Solve for \\(x\\): \\(7x - 4 = 24\\).<br>Add 4 to both sides: \\(7x = 28\\).<br>Divide by 7: \\(x = 4\\).",
  },
  {
    id: 142,
    question: "Simplify \\(15b - 5 + 3b + 10\\).",
    answer: "The simplified expression is \\(18b + 5\\).",
    solution:
      "Combine like terms:<br>\\(15b + 3b = 18b\\).<br>\\(-5 + 10 = 5\\).<br>Final expression: \\(18b + 5\\).",
  },
  {
    id: 143,
    question: "What is the value of \\(\\frac{7}{8} + \\frac{3}{8}\\)?",
    answer: "\\(\\frac{10}{8}\\) or \\(1\\frac{2}{8}\\) or \\(1\frac{1}{4}\\)",
    solution:
      "Add fractions with the same denominator:<br>\\(\\frac{7}{8} + \\frac{3}{8} = \\frac{7 + 3}{8} = \\frac{10}{8}\\).<br>Simplify \\(\\frac{10}{8}\\) to \\(1\frac{2}{8}\\), which simplifies further to \\(1\frac{1}{4}\\).",
  },
  {
    id: 144,
    question:
      "What is the perimeter of a rectangle with a length of 14 cm and a width of 9 cm?",
    answer: "The perimeter is 46 cm.",
    solution:
      "The formula for the perimeter of a rectangle is \\(P = 2(\\text{Length} + \\text{Width})\\).<br>Substitute \\(\\text{Length} = 14\\) and \\(\\text{Width} = 9\\): \\(2(14 + 9) = 2(23) = 46\\).",
  },
  {
    id: 145,
    question: "What is the least common multiple (LCM) of 5 and 7?",
    answer: "The LCM is 35.",
    solution:
      "The multiples of 5 are \\(5, 10, 15, 20, 25, 30, 35, ...\\).<br>The multiples of 7 are \\(7, 14, 21, 28, 35, 42, ...\\).<br>The smallest common multiple is \\(35\\).",
  },
  {
    id: 146,
    question:
      "If a bus travels 120 miles in 2 hours, what is its average speed?",
    answer: "The average speed is 60 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 120\\) and \\(\\text{Time} = 2\\): \\(\\frac{120}{2} = 60\\) miles per hour.",
  },
  {
    id: 147,
    question:
      "If the average of four numbers is 10 and three of the numbers are 8, 12, and 14, what is the fourth number?",
    answer: "The fourth number is 6.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 4: \\(10 \times 4 = 40\\).<br>Sum of three numbers: \\(8 + 12 + 14 = 34\\).<br>Subtract: \\(40 - 34 = 6\\).",
  },
  {
    id: 148,
    question: "What is the value of \\(9^2\\)?",
    answer: "\\(9^2 = 81\\)",
    solution:
      "The formula for exponents is \\(x^n = x \\times x \\times ...\\) (\\(n\\) times).<br>Calculate \\(9^2 = 9 \\times 9 = 81\\).",
  },
  {
    id: 149,
    question: "Simplify \\(\\frac{48}{60}\\).",
    answer: "\\(\\frac{4}{5}\\)",
    solution:
      "Simplify \\(\\frac{48}{60}\\) by dividing the numerator and denominator by their greatest common divisor (12):<br>\\(\\frac{48 \\div 12}{60 \\div 12} = \\frac{4}{5}\\).",
  },
  {
    id: 150,
    question: "If a circle has a radius of 5 cm, what is its area?",
    answer: "The area is approximately 78.54 square centimeters.",
    solution:
      "The formula for the area of a circle is \\(A = \\pi r^2\\), where \\(r\\) is the radius.<br>Substitute \\(r = 5\\): \\(A = \\pi \\times 5^2 = \\pi \\times 25 \\approx 3.14 \times 25 = 78.54\\).",
  },
  {
    id: 151,
    question: "If \\(5x + 3 = 18\\), what is the value of \\(x\\)?",
    answer: "\\(x = 3\\)",
    solution:
      "Solve for \\(x\\): \\(5x + 3 = 18\\).<br>Subtract 3 from both sides: \\(5x = 15\\).<br>Divide by 5: \\(x = 3\\).",
  },
  {
    id: 152,
    question: "Simplify \\(7a - 4 + 2a + 6\\).",
    answer: "The simplified expression is \\(9a + 2\\).",
    solution:
      "Combine like terms:<br>\\(7a + 2a = 9a\\).<br>\\(-4 + 6 = 2\\).<br>Final expression: \\(9a + 2\\).",
  },
  {
    id: 153,
    question: "What is the value of \\(\\frac{5}{6} - \\frac{1}{6}\\)?",
    answer: "\\(\\frac{4}{6}\\) or \\(\\frac{2}{3}\\)",
    solution:
      "Subtract fractions with the same denominator:<br>\\(\\frac{5}{6} - \\frac{1}{6} = \\frac{5 - 1}{6} = \\frac{4}{6}\\).<br>Simplify \\(\\frac{4}{6}\\) to \\(\\frac{2}{3}\\).",
  },
  {
    id: 154,
    question:
      "What is the area of a triangle with a base of 8 cm and a height of 5 cm?",
    answer: "The area is 20 square centimeters.",
    solution:
      "The formula for the area of a triangle is \\(A = \\frac{1}{2} \\times \text{Base} \times \text{Height}\\).<br>Substitute \\(\\text{Base} = 8\\) and \\(\\text{Height} = 5\\): \\(A = \\frac{1}{2} \times 8 \times 5 = 20\\).",
  },
  {
    id: 155,
    question: "What is the least common multiple (LCM) of 9 and 15?",
    answer: "The LCM is 45.",
    solution:
      "The multiples of 9 are \\(9, 18, 27, 36, 45, ...\\).<br>The multiples of 15 are \\(15, 30, 45, 60, ...\\).<br>The smallest common multiple is \\(45\\).",
  },
  {
    id: 156,
    question:
      "If a car travels 150 miles in 5 hours, what is its average speed?",
    answer: "The average speed is 30 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 150\\) and \\(\\text{Time} = 5\\): \\(\\frac{150}{5} = 30\\) miles per hour.",
  },
  {
    id: 157,
    question:
      "If the average of six numbers is 14 and five of the numbers are 10, 16, 18, 12, and 20, what is the sixth number?",
    answer: "The sixth number is 14.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 6: \\(14 \times 6 = 84\\).<br>Sum of five numbers: \\(10 + 16 + 18 + 12 + 20 = 76\\).<br>Subtract: \\(84 - 76 = 14\\).",
  },
  {
    id: 158,
    question: "What is the value of \\(8^2\\)?",
    answer: "\\(8^2 = 64\\)",
    solution:
      "The formula for exponents is \\(x^n = x \times x \times ...\\) (\\(n\\) times).<br>Calculate \\(8^2 = 8 \times 8 = 64\\).",
  },
  {
    id: 159,
    question: "Simplify \\(\\frac{36}{48}\\).",
    answer: "\\(\\frac{3}{4}\\)",
    solution:
      "Simplify \\(\\frac{36}{48}\\) by dividing the numerator and denominator by their greatest common divisor (12):<br>\\(\\frac{36 div 12}{48 div 12} = \\frac{3}{4}\\).",
  },
  {
    id: 160,
    question: "If a circle has a radius of 10 cm, what is its area?",
    answer: "The area is approximately 314.16 square centimeters.",
    solution:
      "The formula for the area of a circle is \\(A = pi r^2\\), where \\(r\\) is the radius.<br>Substitute \\(r = 10\\): \\(A = pi \times 10^2 = pi \times 100 \\approx 3.14 \times 100 = 314.16\\).",
  },
  {
    id: 161,
    question: "If \\(3x + 5 = 20\\), what is the value of \\(x\\)?",
    answer: "\\(x = 5\\)",
    solution:
      "Solve for \\(x\\): \\(3x + 5 = 20\\).<br>Subtract 5 from both sides: \\(3x = 15\\).<br>Divide by 3: \\(x = 5\\).",
  },
  {
    id: 162,
    question: "Simplify \\(10c - 7 + 4c + 3\\).",
    answer: "The simplified expression is \\(14c - 4\\).",
    solution:
      "Combine like terms:<br>\\(10c + 4c = 14c\\).<br>\\(-7 + 3 = -4\\).<br>Final expression: \\(14c - 4\\).",
  },
  {
    id: 163,
    question: "What is the value of \\(\\frac{7}{9} + \\frac{2}{9}\\)?",
    answer: "\\(\\frac{9}{9} = 1\\)",
    solution:
      "Add fractions with the same denominator:<br>\\(\\frac{7}{9} + \\frac{2}{9} = \\frac{7 + 2}{9} = \\frac{9}{9}\\), which simplifies to 1.",
  },
  {
    id: 164,
    question:
      "What is the area of a rectangle with a length of 12 cm and a width of 5 cm?",
    answer: "The area is 60 square centimeters.",
    solution:
      "The formula for the area of a rectangle is \\(A = \text{Length} \times \text{Width}\\).<br>Substitute \\(\\text{Length} = 12\\) and \\(\\text{Width} = 5\\): \\(A = 12 \times 5 = 60\\).",
  },
  {
    id: 165,
    question: "What is the least common multiple (LCM) of 8 and 12?",
    answer: "The LCM is 24.",
    solution:
      "The multiples of 8 are \\(8, 16, 24, 32, 40, ...\\).<br>The multiples of 12 are \\(12, 24, 36, 48, ...\\).<br>The smallest common multiple is \\(24\\).",
  },
  {
    id: 166,
    question:
      "If a car travels 200 miles in 4 hours, what is its average speed?",
    answer: "The average speed is 50 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 200\\) and \\(\\text{Time} = 4\\): \\(\\frac{200}{4} = 50\\) miles per hour.",
  },
  {
    id: 167,
    question:
      "If the average of seven numbers is 16 and six of the numbers are 12, 18, 20, 14, 15, and 11, what is the seventh number?",
    answer: "The seventh number is 24.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 7: \\(16 \times 7 = 112\\).<br>Sum of six numbers: \\(12 + 18 + 20 + 14 + 15 + 11 = 90\\).<br>Subtract: \\(112 - 90 = 24\\).",
  },
  {
    id: 168,
    question: "What is the value of \\(6^2\\)?",
    answer: "\\(6^2 = 36\\)",
    solution:
      "The formula for exponents is \\(x^n = x \times x \times ...\\) (\\(n\\) times).<br>Calculate \\(6^2 = 6 \times 6 = 36\\).",
  },
  {
    id: 169,
    question: "Simplify \\(\\frac{48}{64}\\).",
    answer: "\\(\\frac{3}{4}\\)",
    solution:
      "Simplify \\(\\frac{48}{64}\\) by dividing the numerator and denominator by their greatest common divisor (16):<br>\\(\\frac{48 div 16}{64 div 16} = \\frac{3}{4}\\).",
  },
  {
    id: 170,
    question: "If a circle has a radius of 3 cm, what is its area?",
    answer: "The area is approximately 28.27 square centimeters.",
    solution:
      "The formula for the area of a circle is \\(A = pi r^2\\), where \\(r\\) is the radius.<br>Substitute \\(r = 3\\): \\(A = pi \times 3^2 = pi \times 9 \\approx 3.14 \times 9 = 28.27\\).",
  },
  {
    id: 171,
    question: "If \\(2x + 7 = 19\\), what is the value of \\(x\\)?",
    answer: "\\(x = 6\\)",
    solution:
      "Solve for \\(x\\): \\(2x + 7 = 19\\).<br>Subtract 7 from both sides: \\(2x = 12\\).<br>Divide by 2: \\(x = 6\\).",
  },
  {
    id: 172,
    question: "Simplify \\(9b - 3 + 5b + 4\\).",
    answer: "The simplified expression is \\(14b + 1\\).",
    solution:
      "Combine like terms:<br>\\(9b + 5b = 14b\\).<br>\\(-3 + 4 = 1\\).<br>Final expression: \\(14b + 1\\).",
  },
  {
    id: 173,
    question: "What is the value of \\(\\frac{5}{8} - \\frac{3}{8}\\)?",
    answer: "\\(\\frac{2}{8} = \\frac{1}{4}\\)",
    solution:
      "Subtract fractions with the same denominator:<br>\\(\\frac{5}{8} - \\frac{3}{8} = \\frac{5 - 3}{8} = \\frac{2}{8}\\).<br>Simplify \\(\\frac{2}{8}\\) to \\(\\frac{1}{4}\\).",
  },
  {
    id: 174,
    question:
      "What is the area of a rectangle with a length of 15 cm and a width of 7 cm?",
    answer: "The area is 105 square centimeters.",
    solution:
      "The formula for the area of a rectangle is \\(A = \text{Length} \times \text{Width}\\).<br>Substitute \\(\\text{Length} = 15\\) and \\(\\text{Width} = 7\\): \\(A = 15 \times 7 = 105\\).",
  },
  {
    id: 175,
    question: "What is the least common multiple (LCM) of 6 and 9?",
    answer: "The LCM is 18.",
    solution:
      "The multiples of 6 are \\(6, 12, 18, 24, ...\\).<br>The multiples of 9 are \\(9, 18, 27, 36, ...\\).<br>The smallest common multiple is \\(18\\).",
  },
  {
    id: 176,
    question:
      "If a car travels 180 miles in 6 hours, what is its average speed?",
    answer: "The average speed is 30 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 180\\) and \\(\\text{Time} = 6\\): \\(\\frac{180}{6} = 30\\) miles per hour.",
  },
  {
    id: 177,
    question:
      "If the average of eight numbers is 20 and seven of the numbers are 18, 25, 30, 22, 17, 16, and 26, what is the eighth number?",
    answer: "The eighth number is 16.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 8: \\(20 \times 8 = 160\\).<br>Sum of seven numbers: \\(18 + 25 + 30 + 22 + 17 + 16 + 26 = 154\\).<br>Subtract: \\(160 - 154 = 16\\).",
  },
  {
    id: 178,
    question: "What is the value of \\(7^2\\)?",
    answer: "\\(7^2 = 49\\)",
    solution:
      "The formula for exponents is \\(x^n = x \times x \times ...\\) (\\(n\\) times).<br>Calculate \\(7^2 = 7 \times 7 = 49\\).",
  },
  {
    id: 179,
    question: "Simplify \\(\\frac{72}{96}\\).",
    answer: "\\(\\frac{3}{4}\\)",
    solution:
      "Simplify \\(\\frac{72}{96}\\) by dividing the numerator and denominator by their greatest common divisor (24):<br>\\(\\frac{72 div 24}{96 div 24} = \\frac{3}{4}\\).",
  },
  {
    id: 180,
    question: "If a circle has a radius of 8 cm, what is its area?",
    answer: "The area is approximately 201.06 square centimeters.",
    solution:
      "The formula for the area of a circle is \\(A = pi r^2\\), where \\(r\\) is the radius.<br>Substitute \\(r = 8\\): \\(A = pi \times 8^2 = pi \times 64 \\approx 3.14 \times 64 = 201.06\\).",
  },
  {
    id: 181,
    question: "If \\(5x - 2 = 18\\), what is the value of \\(x\\)?",
    answer: "\\(x = 4\\)",
    solution:
      "Solve for \\(x\\): \\(5x - 2 = 18\\).<br>Add 2 to both sides: \\(5x = 20\\).<br>Divide by 5: \\(x = 4\\).",
  },
  {
    id: 182,
    question: "Simplify \\(8p + 12 - 5p + 6\\).",
    answer: "The simplified expression is \\(3p + 18\\).",
    solution:
      "Combine like terms:<br>\\(8p - 5p = 3p\\).<br>\\(12 + 6 = 18\\).<br>Final expression: \\(3p + 18\\).",
  },
  {
    id: 183,
    question: "What is the value of \\(\\frac{2}{5} + \\frac{3}{5}\\)?",
    answer: "\\(\\frac{5}{5} = 1\\)",
    solution:
      "Add fractions with the same denominator:<br>\\(\\frac{2}{5} + \\frac{3}{5} = \\frac{2 + 3}{5} = \\frac{5}{5}\\), which simplifies to 1.",
  },
  {
    id: 184,
    question:
      "What is the area of a rectangle with a length of 9 cm and a width of 4 cm?",
    answer: "The area is 36 square centimeters.",
    solution:
      "The formula for the area of a rectangle is \\(A = \text{Length} \times \text{Width}\\).<br>Substitute \\(\\text{Length} = 9\\) and \\(\\text{Width} = 4\\): \\(A = 9 \times 4 = 36\\).",
  },
  {
    id: 185,
    question: "What is the least common multiple (LCM) of 4 and 6?",
    answer: "The LCM is 12.",
    solution:
      "The multiples of 4 are \\(4, 8, 12, 16, 20, ...\\).<br>The multiples of 6 are \\(6, 12, 18, 24, ...\\).<br>The smallest common multiple is \\(12\\).",
  },
  {
    id: 186,
    question:
      "If a car travels 150 miles in 5 hours, what is its average speed?",
    answer: "The average speed is 30 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 150\\) and \\(\\text{Time} = 5\\): \\(\\frac{150}{5} = 30\\) miles per hour.",
  },
  {
    id: 187,
    question:
      "If the average of six numbers is 10 and five of the numbers are 8, 12, 7, 14, and 9, what is the sixth number?",
    answer: "The sixth number is 10.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 6: \\(10 \times 6 = 60\\).<br>Sum of five numbers: \\(8 + 12 + 7 + 14 + 9 = 50\\).<br>Subtract: \\(60 - 50 = 10\\).",
  },
  {
    id: 188,
    question: "What is the value of \\(4^3\\)?",
    answer: "\\(4^3 = 64\\)",
    solution:
      "The formula for exponents is \\(x^n = x \times x \times ...\\) (\\(n\\) times).<br>Calculate \\(4^3 = 4 \times 4 \times 4 = 64\\).",
  },
  {
    id: 189,
    question: "Simplify \\(\\frac{45}{60}\\).",
    answer: "\\(\\frac{3}{4}\\)",
    solution:
      "Simplify \\(\\frac{45}{60}\\) by dividing the numerator and denominator by their greatest common divisor (15):<br>\\(\\frac{45 div 15}{60 div 15} = \\frac{3}{4}\\).",
  },
  {
    id: 190,
    question: "If a circle has a radius of 5 cm, what is its area?",
    answer: "The area is approximately 78.54 square centimeters.",
    solution:
      "The formula for the area of a circle is \\(A = pi r^2\\), where \\(r\\) is the radius.<br>Substitute \\(r = 5\\): \\(A = pi \times 5^2 = pi \times 25 \\approx 3.14 \times 25 = 78.54\\).",
  },
  {
    id: 191,
    question: "If \\(7x + 3 = 24\\), what is the value of \\(x\\)?",
    answer: "\\(x = 3\\)",
    solution:
      "Solve for \\(x\\): \\(7x + 3 = 24\\).<br>Subtract 3 from both sides: \\(7x = 21\\).<br>Divide by 7: \\(x = 3\\).",
  },
  {
    id: 192,
    question: "Simplify \\(3x - 5 + 2x + 9\\).",
    answer: "The simplified expression is \\(5x + 4\\).",
    solution:
      "Combine like terms:<br>\\(3x + 2x = 5x\\).<br>\\(-5 + 9 = 4\\).<br>Final expression: \\(5x + 4\\).",
  },
  {
    id: 193,
    question: "What is the value of \\(\\frac{7}{8} - \\frac{3}{8}\\)?",
    answer: "\\(\\frac{4}{8} = \\frac{1}{2}\\)",
    solution:
      "Subtract fractions with the same denominator:<br>\\(\\frac{7}{8} - \\frac{3}{8} = \\frac{7 - 3}{8} = \\frac{4}{8}\\).<br>Simplify \\(\\frac{4}{8}\\) to \\(\\frac{1}{2}\\).",
  },
  {
    id: 194,
    question:
      "What is the area of a rectangle with a length of 10 cm and a width of 6 cm?",
    answer: "The area is 60 square centimeters.",
    solution:
      "The formula for the area of a rectangle is \\(A = \text{Length} \times \text{Width}\\).<br>Substitute \\(\\text{Length} = 10\\) and \\(\\text{Width} = 6\\): \\(A = 10 \times 6 = 60\\).",
  },
  {
    id: 195,
    question: "What is the least common multiple (LCM) of 5 and 12?",
    answer: "The LCM is 60.",
    solution:
      "The multiples of 5 are \\(5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, ...\\).<br>The multiples of 12 are \\(12, 24, 36, 48, 60, ...\\).<br>The smallest common multiple is \\(60\\).",
  },
  {
    id: 196,
    question:
      "If a car travels 200 miles in 4 hours, what is its average speed?",
    answer: "The average speed is 50 miles per hour.",
    solution:
      "The formula for speed is \\(\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}\\).<br>Substitute \\(\\text{Distance} = 200\\) and \\(\\text{Time} = 4\\): \\(\\frac{200}{4} = 50\\) miles per hour.",
  },
  {
    id: 197,
    question:
      "If the average of seven numbers is 15 and six of the numbers are 12, 18, 20, 10, 14, and 16, what is the seventh number?",
    answer: "The seventh number is 15.",
    solution:
      "The formula for the average is \\(\\text{Average} = \\frac{\\text{Sum of all numbers}}{\\text{Number of numbers}}\\).<br>Multiply the average by 7: \\(15 \times 7 = 105\\).<br>Sum of six numbers: \\(12 + 18 + 20 + 10 + 14 + 16 = 90\\).<br>Subtract: \\(105 - 90 = 15\\).",
  },
  {
    id: 198,
    question: "What is the value of \\(2^4\\)?",
    answer: "\\(2^4 = 16\\)",
    solution:
      "The formula for exponents is \\(x^n = x \times x \times ...\\) (\\(n\\) times).<br>Calculate \\(2^4 = 2 \times 2 \times 2 \times 2 = 16\\).",
  },
  {
    id: 199,
    question: "Simplify \\(\\frac{80}{100}\\).",
    answer: "\\(\\frac{4}{5}\\)",
    solution:
      "Simplify \\(\\frac{80}{100}\\) by dividing the numerator and denominator by their greatest common divisor (20):<br>\\(\\frac{80 div 20}{100 div 20} = \\frac{4}{5}\\).",
  },
  {
    id: 200,
    question: "If a circle has a radius of 10 cm, what is its area?",
    answer: "The area is approximately 314.16 square centimeters.",
    solution:
      "The formula for the area of a circle is \\(A = pi r^2\\), where \\(r\\) is the radius.<br>Substitute \\(r = 10\\): \\(A = pi \times 10^2 = pi \times 100 \\approx 3.14 \times 100 = 314.16\\).",
  },
];

let flashCard_no = 0;

next_button.addEventListener("click", function () {
  clickedButton(this);

  // this code hamdle the reflection effect
  flashCard.classList.add("flashcard-reflect");
  setTimeout(() => {
    flashCard.classList.remove("flashcard-reflect");
  }, 1000);

  if (flashCard_no < questions_bank.length - 1) {
    flashCard_no = flashCard_no + 1;
    question_no.innerHTML = questions_bank[flashCard_no].id;
    question_content.innerHTML = questions_bank[flashCard_no].question;
    answer_no.innerHTML = questions_bank[flashCard_no].id;
    answer_content.innerHTML = questions_bank[flashCard_no].answer;
    solution_content.innerHTML = questions_bank[flashCard_no].solution;

    MathJax.typeset();

    if (flashCard.classList.contains("to-back")) {
      // front_flash_card.style.display = "none";
      flipCard();
    }
  }
});

previous_button.addEventListener("click", function () {
  clickedButton(this);

  // this code hamdle the reflection effect
  flashCard.classList.add("flashcard-reflect");
  setTimeout(() => {
    flashCard.classList.remove("flashcard-reflect");
  }, 1000);

  if (flashCard_no >= 1) {
    console.log(flashCard_no);
    flashCard_no = flashCard_no - 1;
    // alert(questions_bank[flashCard_no].answer)
    question_no.innerHTML = questions_bank[flashCard_no].id;
    question_content.innerHTML = questions_bank[flashCard_no].question;
    answer_no.innerHTML = questions_bank[flashCard_no].id;
    answer_content.innerHTML = questions_bank[flashCard_no].answer;
    front_flash_card.style.display = "flex";
    solution_content.innerHTML = questions_bank[flashCard_no].solution;

    MathJax.typeset();
  }

  if (flashCard.classList.contains("to-back")) {
    front_flash_card.style.display = "none";
    flipCard();
  }
});

console.log(question_no.innerHTML);
console.log(question_content.innerHTML);

question_no.innerHTML = questions_bank[0].id;
question_content.innerHTML = questions_bank[0].question;
answer_no.innerHTML = questions_bank[0].id;
answer_content.innerHTML = questions_bank[0].answer;
solution_content.innerHTML = questions_bank[0].solution;

if (typeof MathJax !== "undefined") {
  console.log("MathJax is loaded successfully!");
} else {
  console.error("MathJax failed to load.");
}
