const PASSAGES = [
  "when the h i am testing that the passage is actually existing"
];

class TypingTest {
  #target;
  #startTime;
  #finished;
  #correct;

  constructor() {
    this.passage = document.getElementById("passage");
    this.input = document.getElementById("input");
    this.restart = document.getElementById("restart");

    this.input.addEventListener("input", () => this.onInput());
    this.restart.addEventListener("click", () => this.loadPassage());

    this.loadPassage();
  }

  loadPassage() {
    this.#target = PASSAGES[0];
    this.#startTime = 0;
    this.#finished = false;
    this.#correct = 0;

    this.passage.innerHTML = "";
    this.input.value = "";
    this.input.maxLength = this.#target.length;
    this.input.disabled = false;

    for (let char of this.#target) {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char;
      this.passage.appendChild(span);
    }

    this.passage.firstElementChild.classList.add("current");
  }

  onInput() {
    if (this.#finished) return;

    let typed = this.input.value;

    if (!this.#startTime && typed.length > 0) {
      this.#startTime = performance.now();
    }

    this.#correct = 0;
    const spans = this.passage.children;

    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.remove("correct", "wrong", "current");

      if (i < typed.length) {
        if (typed[i] === this.#target[i]) {
          spans[i].classList.add("correct");
          this.#correct++;
        } else {
          spans[i].classList.add("wrong");
        }
      } else if (i === typed.length) {
        spans[i].classList.add("current");
      }
    }

    if (typed.length === this.#target.length) this.finish();
  }

  finish() {
    this.#finished = true;
    this.input.disabled = true;
  }
}

const typingTest = new TypingTest();

