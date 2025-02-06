document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll("button");
  const themeButton = document.querySelector(".themeButton");
  const toggle = document.getElementById("toggle");
  let currentInput = "";
  let operator = "";
  let firstOperand = "";
  let secondOperand = "";
  let themeCounter = localStorage.getItem("theme") ? parseInt(localStorage.getItem("theme")) : 1;

    applyTheme(themeCounter);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (button === themeButton) {
        changeTheme();
        return;
      }

      if ((value >= "0" && value <= "9") || value === ".") {
        currentInput += value;
        display.textContent = currentInput;
      } else if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput;
      } else if (value === "RESET") {
        currentInput = "";
        operator = "";
        firstOperand = "";
        secondOperand = "";
        display.textContent = "";
      } else if (value === "=") {
        secondOperand = currentInput;
        display.textContent = calculate(firstOperand, secondOperand, operator);
        currentInput = display.textContent;
        firstOperand = "";
        secondOperand = "";
        operator = "";
      } else {
        if (firstOperand === "") {
          firstOperand = currentInput;
          operator = value;
          currentInput = "";
        } else {
          secondOperand = currentInput;
          display.textContent = calculate(firstOperand, secondOperand, operator);
          firstOperand = display.textContent;
          operator = value;
          currentInput = "";
        }
      }
    });
  });

  toggle.addEventListener("change", () => {
    themeCounter++;
    if (themeCounter > 3) themeCounter = 1;
    localStorage.setItem("theme", themeCounter);
    applyTheme(themeCounter);
  });

  function applyTheme(counter) {
    document.body.classList.remove("theme-first", "theme-second", "theme-third");

    if (counter === 1) {
      document.body.classList.add("theme-first");
    } else if (counter === 2) {
      document.body.classList.add("theme-second");
    } else {
      document.body.classList.add("theme-third");
    }
  }

  function calculate(first, second, operator) {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "x":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        return "";
    }
  }

  function changeTheme() {
    themeCounter++;
    if (themeCounter > 3) themeCounter = 1;
    localStorage.setItem("theme", themeCounter);
    applyTheme(themeCounter);
  }
});
