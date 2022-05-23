const result = document.querySelector(".result");
const imagePixels = document.querySelector(".image-pixels");
const buttonRecolor = document.querySelector(".button-recolor");
const buttonGuess = document.querySelector(".button-guess");
const guessedColorSample = document.querySelector(".guessed-color-sample");
const guessedColorText = document.querySelector(".guessed-color-text");

const pixelsArray = [];
const animalPixels = [
  "4",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "19",
  "21",
];

for (let i = 0; i < 24; i++) {
  pixelsArray.push(`<div class="pixel" data-id="${i}"></div>`);
}

imagePixels.innerHTML = pixelsArray.join("");

const recolor = () => {
  const randomValue1 = Math.floor(Math.random() * 215) + 20;
  const randomValue2 = Math.floor(Math.random() * 215) + 20;
  const randomValue3 = Math.floor(Math.random() * 215) + 20;

  const colors = animalPixels.map((pixel) => {
    const digit1 = randomValue1 - 20 + Math.floor(Math.random() * 40);
    const digit2 = randomValue2 - 20 + Math.floor(Math.random() * 40);
    const digit3 = randomValue3 - 20 + Math.floor(Math.random() * 40);

    return { id: pixel, color: `rgb(${digit1}, ${digit2}, ${digit3})` };
  });

  for (const pixel of colors) {
    document.querySelector(`[data-id="${pixel.id}"]`).style.background =
      pixel.color;
  }
};

const guessColor = () => {
  const colors = animalPixels.map((animal) => {
    const color = document
      .querySelector(`[data-id="${animal}"]`)
      .getAttribute("style")
      .slice(16, -2)
      .split(", ");

    const colorSplit = {
      digit1: parseInt(color[0]),
      digit2: parseInt(color[1]),
      digit3: parseInt(color[2]),
    };

    return colorSplit;
  });

  const averageColor = colors.reduce(
    (acc, color, index) => {
      acc.digit1 += color.digit1 / colors.length;
      acc.digit2 += color.digit2 / colors.length;
      acc.digit3 += color.digit3 / colors.length;

      if (index === colors.length - 1) {
        acc.digit1 = Math.floor(acc.digit1);
        acc.digit2 = Math.floor(acc.digit2);
        acc.digit3 = Math.floor(acc.digit3);
      }

      return acc;
    },
    { digit1: 0, digit2: 0, digit3: 0 }
  );

  guessedColorText.textContent = `rgb(${averageColor.digit1}, ${averageColor.digit2}, ${averageColor.digit3})`;
  guessedColorSample.style.background = `rgb(${averageColor.digit1}, ${averageColor.digit2}, ${averageColor.digit3})`;
};

recolor();

buttonRecolor.addEventListener("click", () => {
  recolor();
});

buttonGuess.addEventListener("click", () => {
  guessColor();
});
