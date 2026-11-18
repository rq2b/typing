const PASSAGES = [
  "when the h i am testing that the passage is actually existing"
];

class TypingTest {
  #target;
  #startTime;
  #finished;
  #correct;
  #running;
  #timer;

  constructor() {
    this.passage = document.getElementById("passage");
    this.input = document.getElementById("input");
    this.restart = document.getElementById("restart");
    this.wpm = document.getElementById("wpm");
    this.accuracy = document.getElementById("accuracy");

    this.input.addEventListener("input", () => this.onInput());
    this.restart.addEventListener("click", () => this.loadPassage());

    this.loadPassage();
  }

  loadPassage() {
    clearInterval(this.#timer);

    this.#target = PASSAGES[0];
    this.#startTime = 0;
    this.#finished = false;
    this.#correct = 0;
    this.#running = false;

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
    this.updateStats();
  }

  onInput() {
    if (this.#finished) return;

    let typed = this.input.value;

    if (!this.#running && typed.length > 0) {
      this.#running = true;
      this.#startTime = performance.now();
      this.#timer = setInterval(() => this.updateStats(), 100);
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

    this.updateStats();

    if (typed.length === this.#target.length) this.finish();
  }

  updateStats() {
    const typedCount = this.input.value.length;
    const minutes = this.#startTime > 0 ? (performance.now() - this.#startTime) / 60000 : 0;
    const wpm = minutes > 0 ? (this.#correct / 5) / minutes : 0;
    const accuracy = typedCount > 0 ? Math.round(this.#correct / typedCount * 100) : 100;

    this.wpm.textContent = wpm > 0 ? wpm.toFixed(2) : "0";
    this.accuracy.textContent = accuracy + "%";

    return { wpm, accuracy };
  }

  finish() {
    this.#running = false;
    this.#finished = true;
    clearInterval(this.#timer);
    this.updateStats();
    this.input.disabled = true;
  }
}

const typingTest = new TypingTest();

