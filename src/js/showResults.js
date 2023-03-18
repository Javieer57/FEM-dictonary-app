const resultsContainer = document.getElementById("results");
const headerTemplate = document.getElementById("results-header").content;
const meaningsTemplate = document.getElementById("results-meanings").content;
const sourceTemplate = document.getElementById("results-source").content;
const notFoundTemplate = document.getElementById("results-not-found").content;
const loadingSpinner = document.getElementById("spinner-wrapper");

export const showSpinner = () => {
  clearResults();
  loadingSpinner.classList.remove("hidden");
};

export const hideSpinner = () => {
  loadingSpinner.classList.add("hidden");
};

export const clearResults = () => {
  resultsContainer.innerHTML = "";
};

export const showResults = (data) => {
  clearResults();
  const header = getHeader(data);
  const meanings = getMeanings(data);
  const source = getSource(data);

  resultsContainer.appendChild(header);

  meanings.forEach((meaning) => {
    resultsContainer.appendChild(meaning);
  });

  resultsContainer.appendChild(source);
};

const getSource = (data) => {
  const source = sourceTemplate.cloneNode(true);
  const sourceLink = source.querySelector("a");
  sourceLink.href = data[0].sourceUrls[0];
  sourceLink.textContent = sourceLink.href;
  return source;
};

const getHeader = (data) => {
  const { word, phonetics } = data[0];
  const phonetic = phonetics[phonetics.length - 1].text;
  const audio = phonetics[phonetics.length - 1].audio;

  const clone = headerTemplate.cloneNode(true);
  const title = clone.getElementById("title");
  const pronunciation = clone.getElementById("IPA");
  const audioBtn = clone.getElementById("button");

  title.textContent = word;
  pronunciation.textContent = phonetic;
  audioBtn.setAttribute("onclick", 'new Audio("' + audio + '").play();');

  return clone;
};

const getMeanings = (data) => {
  const meanings = data.map(({ meanings }) => meanings);

  const meaningListItem = meaningsTemplate
    .querySelector(".results__item")
    .cloneNode(true);

  const fragmentsArray = meanings.map((meaning) => {
    const clone = meaningsTemplate.cloneNode(true);
    const partOfSpeech = clone.querySelector(".results__part-of-speech-value");
    const meaningList = clone.querySelector(".results__list--meaning");

    partOfSpeech.textContent = meaning[0].partOfSpeech;
    meaningList.textContent = "";

    meaning[0].definitions.forEach(({ definition }) => {
      meaningListItem.textContent = definition;
      meaningList.appendChild(meaningListItem.cloneNode(true));
    });

    const resultsDetails = clone.querySelector(".results__details");
    const alternativesList = resultsDetails.querySelector(
      ".results__alternatives"
    );
    const alternativeTitle = alternativesList.querySelector("h3");
    const alternatives = alternativesList.querySelector("p");
    const synonyms = meaning[0].synonyms;
    const antonyms = meaning[0].antonyms;

    alternativesList.remove();

    if (synonyms.length > 0) {
      alternativeTitle.textContent = "Synonyms:";
      alternatives.textContent = synonyms.join(", ");
      resultsDetails.appendChild(alternativesList.cloneNode(true));
    }

    if (antonyms.length > 0) {
      alternativeTitle.textContent = "Antonyms:";
      alternatives.textContent = antonyms.join(", ");
      resultsDetails.appendChild(alternativesList.cloneNode(true));
    }

    return clone;
  });

  return fragmentsArray;
};

export const showNotFound = () => {
  clearResults();
  const clone = notFoundTemplate.cloneNode(true);
  resultsContainer.appendChild(clone);
};
