const resultsContainer = document.getElementById("results");

export const showSpinner = () => {
  resultsContainer.innerHTML = `
    <div class="spinner-wrapper">
      <p class="sr-only">Loading...</p>
      <div class="spinner"></div>
    </div>
  `;
};

export const clearResults = () => {
  resultsContainer.innerHTML = "";
};

export const showResults = (data) => {
  let results = ``;
  results += generateHeader(data);
  results += generateMeanings(data);
  results += generateSource(data);
  resultsContainer.innerHTML = results;
};

export const showNotFound = () => {
  resultsContainer.innerHTML = `
    <section class="results__not-found ta-center mt-130">
      <span class="d-inline-block fs-xxl mb-45">🤔</span>
      <h3 class="fs-lg mb-25">No Definitions Found</h3>
      <p class="fs-md secondary-text">Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
    </section>
  `;
};

const generateSource = (data) => {
  const link = data[0].sourceUrls[0];

  const source = `
    <section class="results__source">
      <span class="separator-line mb-20"></span>
      <p class="results__source-label fs-sm">
        <strong class="fw-400 secondary-text mr-20 underline">Source</strong>
        <a class="mr-10" href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>
        <i class="new-window-icon"></i>
      </p>
    </section>
  `;

  return source;
};

const generateHeader = (data) => {
  const { word, phonetics } = data[0];
  const phonetic = phonetics[phonetics.length - 1].text || "";
  const audio = phonetics[phonetics.length - 1].audio || "";

  const header = `
    <header class="mb-40 d-flex align-items-center justify-content-between">
      <div>
        <h2 class="fs-xxl mb-10">${word}</h2>
        <p class="fs-xl mb-0 contrast-text">
            <span class="sr-only">Pronunciation:</span>
            ${phonetic}
        </p>
      </div>
      <div>
        ${audio ? generateAudioButton(audio) : ""}
      </div>
    </header>
  `;

  return header;
};

const generateAudioButton = (audio) => {
  return `
    <button class="results__play-button" aria-label="Play pronunciation" onclick="new Audio('${audio}').play();">
      <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
        <g fill="#A445ED" fill-rule="evenodd">
          <circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/>
          <path d="M29 27v21l21-10.5z"/>
        </g>
      </svg>
    </button>
  `;
};

const generateDefinitions = (definitions) =>
  definitions.map(
    ({ definition }) =>
      `<li class="results__item p-left-20 mb-15 fs-md">${definition}</li>`
  );

const generateAlternatives = (type, alternatives) => {
  if (alternatives.length === 0) return "";

  return `
      <div class="results__alternatives mb-40 d-flex align-items-start gap-24">
        <h3 class="secondary-text fw-400 fs-lg mb-0">${type}:</h3>
        <p class="contrast-text fw-700 fs-lg mb-0">
          ${alternatives.join(", ")}
        </p>
      </div>
    `;
};

const generateMeanings = (data) => {
  const meanings = data[0].meanings;

  const generateMeaningPart = (meaning) => `
    <section class="results__details mb-40">
      <p class="d-flex align-items-center gap-24 font-xl italic fw-700 mb-40">
        <strong class="sr-only">Part of speech:</strong>
        <span class="results__part-of-speech-value fs-xl">
          ${meaning.partOfSpeech}
        </span>
        <span class="separator-line"></span>
      </p>
      <h3 class="secondary-text fw-400 fs-lg mb-40">Meaning:</h3>
      <ul class="results__list--meaning mb-40">
        ${generateDefinitions(meaning.definitions).join("")}
      </ul>
      ${generateAlternatives("Synonyms", meaning.synonyms)}
      ${generateAlternatives("Antonyms", meaning.antonyms)}
    </section>
  `;

  return meanings.map(generateMeaningPart).join("");
};
