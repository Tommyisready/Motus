document.addEventListener("DOMContentLoaded", function () {
  function tryWord(word, base) {
    word = word.toLowerCase();
    base = base.toLowerCase();

    if (word === base) {
      // Si le mot est identique, retourner toutes les lettres comme bien placées
      return {
        wellPlaced: base.split(""), // Tous les caractères bien placés
        missplaced: [],
        notInWord: [],
      };
    } else {
      let wellPlaced = [];
      let notInWord = [];
      let missplaced = [];

      let arrayBase = base.split("");
      let arrayWord = word.split("");

      for (let i = 0; i < arrayBase.length; i++) {
        if (arrayBase[i] === arrayWord[i]) {
          wellPlaced.push(arrayWord[i]);
        } else if (arrayBase.includes(arrayWord[i])) {
          missplaced.push(arrayWord[i]);
        } else {
          notInWord.push(arrayWord[i]);
        }
      }

      return { wellPlaced: wellPlaced, missplaced: missplaced, notInWord: notInWord };
    }
  }

  function guess() {
    let base = "dictionnaire";
    let word = document.getElementById("word").value;
    let result = tryWord(word, base);

    // S'assurer que result a bien les propriétés attendues
    if (result && result.wellPlaced && result.missplaced && result.notInWord) {
      document.getElementById("word").value = "";
      document.getElementById("try").innerText = word;
      document.getElementById("well").innerText = "Bien placé: " + result.wellPlaced.join(", ");
      document.getElementById("miss").innerText = "Mal placé: " + result.missplaced.join(", ");
      document.getElementById("not").innerText = "Pas dans le mot: " + result.notInWord.join(", ");

      if (result.wellPlaced.length === base.length) {
        document.getElementById("win").innerText = "Vous avez gagné";
      }
    } else {
      console.error("Le résultat n'est pas valide :", result);
    }
  }

  // Expose the guess function globally
  window.guess = guess;
});
