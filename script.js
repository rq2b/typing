const PASSAGES = [
  "when the h i am testing that the passage is actually existing"
];

class TypingTest {
  #target;
  #startTime;
  #running;
  #finished;
  #timer;
  #correct;

  constructor() {
    this.test = document.getElementById("test-screen");
    this.result = document.getElementById("result-screen");
    this.passage = document.getElementById("passage");
    this.input = document.getElementById("input");
    this.wpm = document.getElementById("wpm");
    this.accuracy = document.getElementById("accuracy");
    this.resultWpm = document.getElementById("result-wpm");
    this.resultAccuracy = document.getElementById("result-accuracy");
    this.restart = document.getElementById("restart");
    this.again = document.getElementById("again");

    this.input.addEventListener("input", () => this.onInput());
    this.input.addEventListener("keydown", event => {
      if (event.key === "Enter") event.preventDefault();
    });
    this.input.addEventListener("paste", event => event.preventDefault());

    this.test.addEventListener("click", event => {
      if (event.target !== this.restart) this.input.focus();
    });

    this.restart.addEventListener("click", () => this.loadPassage());
    this.again.addEventListener("click", () => this.loadPassage());

    this.loadPassage();
  }

  loadPassage() {
    clearInterval(this.#timer);

    this.#target = PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
    this.#startTime = 0;
    this.#running = false;
    this.#finished = false;
    this.#correct = 0;

    this.test.hidden = false;
    this.result.hidden = true;

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
    this.input.focus();
  }

  onInput() {
    if (this.#finished) return;

    let typed = this.input.value;

    if (typed.length > this.#target.length) {
      typed = typed.slice(0, this.#target.length);
      this.input.value = typed;
    }

    if (!this.#running && typed.length > 0) {
      this.#running = true;
      this.#startTime = performance.now();
      this.#timer = setInterval(() => this.updateStats(), 100);
    }

    const spans = this.passage.children;
    this.#correct = 0;

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

    const stats = this.updateStats();

    this.resultWpm.textContent = stats.wpm.toFixed(2);
    this.resultAccuracy.textContent = stats.accuracy + "%";

    this.input.disabled = true;
    this.test.hidden = true;
    this.result.hidden = false;
  }
}

const typingTest = new TypingTest();

