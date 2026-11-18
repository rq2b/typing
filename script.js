const PASSAGES = [
  "echo \"$PATH\" | tr ':' '\\n' && grep -r \"TODO\" *.cpp",
  "find . -name '*.c' && chmod +x script.sh",
  "count=$((a + b * c)); percent=$((used * 100 / total))",
  "tar -czf backup.tar.gz ~/projects/* && echo \"done\"",
  "for f in *.cpp; do echo \"$f\"; done",
  "if [ \"$x\" -ge 10 ]; then echo \"#\"; fi",
  "ps aux | grep \"python\" | awk '{print $2}'",
  "cat /etc/passwd | cut -d':' -f1 | sort | uniq",
  "grep -rn \"TODO\" . --include=\"*.cpp\"",
  "sed -E 's/^[0-9]+\\s+//' input.txt > output.txt",
  "diff <(sort file1.txt) <(sort file2.txt)",
  "curl -s https://example.com | grep -o '<title>.*</title>'",
  "#define SQR(x) ((x) * (x)) && #define ADD(a,b) ((a) + (b))",
  "int *ptr = &value; count += step * 2;",
  "if (x >= y && y != 0) printf(\"%d%%\\n\", percent);",
  "mask &= ~FLAG_ENABLED; mask |= FLAG_ACTIVE;",
  "buffer[index++] = '#'; value = (x * y) + (z % 3);",
  "std::vector<int> nums = {1,2,3,4};",
  "for (auto& item : nums) sum += item * 2;",
  "template<typename T> T add(T a, T b) { return a + b; }",
  "int* data = new int[10]; delete[] data;",
  "std::cout << value % 5 << std::endl;",
  "data = {\"name\": \"alex\", \"score\": 95}",
  "numbers = [x * 2 for x in range(10)]",
  "if x >= 10 and y != 0: print(\"# valid\")",
  "ratio = (used * 100) / total; mask &= ~VISIBLE",
  "Func<int,int,int> add = (a,b) => a + b;",
  "string path = $\"C:\\\\Users\\\\{user}\";",
  "flags &= ~Enabled; flags |= Visible;",
  "^[A-Z][a-z]+\\s[A-Z][a-z]+$",
  "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
  "^\\d{1,3}(\\.\\d{1,3}){3}$",
  "^(foo|bar|baz):\\s*\\d+$",
  "(?:https?|ftp):\\/\\/[^\\s/$.?#][^\\s]*",
  "^-?[0-9]+(\\.[0-9]+)?([eE][+-]?[0-9]+)?$",
  "(\\w+)\\s+\\1",
  ":%s/foo/bar/g | :%s/[0-9]/#/g",
  "ggVG; d$; ci\"; ci(; ci[; ci{",
  ":split; :vsplit; ctrl+w h; ctrl+w l",
  "\"ayy; \"ap; gg=G; zf%; zo; zc",
  ":set paste; :noh; :bn; :bp; :bd; qa",
  "3464 3%!1#~ 4~@!! #2$21 26@14 ^2%$3$",
  "$! ^= `% #51* |^~ 7~%0@ 5_1_%0 ^4| 9%@23_",
  "-8 )+ =8(_ \\_+ 09_|0| \\99)* 9_9\\)+ &* +7)9)"
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

