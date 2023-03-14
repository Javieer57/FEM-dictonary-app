import data from "./API.json";

const resultsContainer = document.getElementById("results");
const headerTemplate = document
  .getElementById("results-header")
  .content.cloneNode(true);
const meaningsTemplate = document.getElementById("results-meanings").content;

export const showResults = (data) => {
  const header = getHeader(data);
  const meanings = getMeanings(data);

  resultsContainer.appendChild(header);
  meanings.forEach((meaning) => {
    resultsContainer.appendChild(meaning);
  });
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

showResults(data);
