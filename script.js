const PASSAGES = [
  "when the h i am testing that the passage is actually existing"
];

class TypingTest {
  #finished;

  constructor() {
    this.passage = document.getElementById("passage");
    this.input = document.getElementById("input");
    this.loadPassage();
    this.input.addEventListener("input", () => this.onInput());
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

  onInput() {
    if (this.#finished) return;
    let typed = this.input.value;
    console.log(this.input.value);
  }
}

const typingTest = new TypingTest();

