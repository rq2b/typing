const PASSAGES = [
  "when the h i am testing that the passage is actually existing"
];

class TypingTest {
  constructor() {
    this.passage = document.getElementById("passage");
    this.loadPassage();
  }

  loadPassage() {
    for (let char of PASSAGES[0]) {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char;
      this.passage.appendChild(span);
    }
    this.passage.firstChild.classList.add("current");
  }
}

const typingTest = new TypingTest();

