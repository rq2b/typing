const PASSAGES = [
  "when the h i am testing that the passage is actually existing"
];

class TypingTest {
  #finished;
  #target;
  #correct;

  constructor() {
    this.#finished = false;
    this.#correct = 0;
    this.passage = document.getElementById("passage");
    this.input = document.getElementById("input");
    this.loadPassage();
    this.input.addEventListener("input", () => this.onInput());
  }

  loadPassage() {
    this.#target = PASSAGES[0];
    this.input.maxLength = this.#target.length;

    for (let char of this.#target) {
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
    if (typed.length === this.#target.length) this.finish();
  }

  finish() {
    this.#finished = true;
    this.input.disabled = true;
  }
}

const typingTest = new TypingTest();

