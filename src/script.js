let flag = false;
let currentPlayer = "";
let currentValue = "O";


if (!player1 || !player2) {
  player1 = "Player 1";
  player2 = "Player 2";
}
// hi my name is new changes
document.getElementById("startGame").addEventListener("click", () => {
  player1 = document.getElementById("player1").value || "Player 1";
  player2 = document.getElementById("player2").value || "Player 2";
  document.getElementById(
    "myp"
  ).innerHTML = `O is ${player1} <br> X is ${player2}`;
  const elements = document.querySelectorAll(".content");
  function resetGame() {
    elements.forEach((elem) => {
      elem.classList.remove("active", "fixed", "winner");
      elem.innerHTML = "";
    });
    currentPlayer = player1;
    flag = false;
  }
  function checkWinner() {
    const lines = [
      // Possible winning combinations
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        elements[a].innerHTML !== "" &&
        elements[a].innerHTML === elements[b].innerHTML &&
        elements[a].innerHTML === elements[c].innerHTML
      ) {
        elements[a].classList.add("winner");
        elements[b].classList.add("winner");
        elements[c].classList.add("winner");
        return true;
      }
    }
    return false;
  }

  elements.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      if (!item.classList.contains("fixed")) {
        elements.forEach((elem) => {
          elem.classList.remove("active");
        });
        item.classList.add("active");
      }
    });

    item.addEventListener("click", () => {
      if (!item.classList.contains("fixed")) {
        item.classList.add("fixed");
        item.innerHTML = currentValue;

        if (checkWinner()) {
          document.getElementById(
            "winp"
          ).innerHTML = `Winner is ${currentPlayer} `;
          setTimeout(() => {
            alert(`${currentPlayer} wins!`);
            resetGame();
          }, 100);
          return;
        }

        // Check for a tie
        const allCellsFilled = [...elements].every(
          (cell) => cell.innerHTML !== ""
        );
        if (allCellsFilled) {
          document.getElementById("winp").innerHTML = `Game TIE`;
          setTimeout(() => {
            alert("It's a tie!");
            resetGame();
          }, 100);
          return;
        }

        // Switch players
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        currentValue = currentValue === "O" ? "X" : "O";
      }
    });
  });
});
