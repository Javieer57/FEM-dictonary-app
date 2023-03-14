import data from "./API.json";

const resultsContainer = document.getElementById("results");
const headerTemplate = document.getElementById("results-header").content;
const meaningsTemplate = document.getElementById("results-meanings").content;

const headerDOM = {
  title: headerTemplate.querySelector(".results__title"),
  pronunciation: headerTemplate.querySelector(".results__pronunciation-label"),
  audioBtn: headerTemplate.querySelector(".results__play-button"),
};

export const showResults = (data) => {
  const header = setHeader(data);
  resultsContainer.appendChild(header);
};

const setHeader = (data) => {
  const { word, phonetic, audio } = getFilteredData(data);
  const { title, pronunciation, audioBtn } = headerDOM;

  title.textContent = word;
  pronunciation.textContent = phonetic;
  audioBtn.setAttribute("onclick", `new Audio('${audio}').play();`);

  return headerTemplate.cloneNode(true);
};

// const showResults = (data) => {
//   const {
//     title,
//     results,
//     pronunciation,
//     audioBtn,
//     details,
//     partOfSpeech,
//     meaningList,
//     meaningListItem,
//   } = getTemplateSeccions();
//   const { word, phonetic, audio, meanings } = getFilteredData(data);

//   title.textContent = word;
//   pronunciation.textContent = phonetic;
//   audioBtn.setAttribute("onclick", `new Audio('${audio}').play();`);

//   meanings.forEach((meaning) => {
//     partOfSpeech.textContent = meaning[0].partOfSpeech;

//     meaningList.innerHTML = "";
//     meaning[0].definitions.forEach(({ definition }) => {
//       meaningListItem.textContent = definition;
//       meaningList.appendChild(meaningListItem.cloneNode(true));
//     });

//     const clone = details.cloneNode(true);
//     template.appendChild(clone);
//   });

//   const clone = template.cloneNode(true);
//   fragment.appendChild(clone);
//   dictionaryContainer.appendChild(fragment);
// };

// const getTemplateSeccions = () => {
//   const results = template.querySelector(".results");
//   const title = results.querySelector(".results__title");
//   const pronunciation = results.querySelector(".results__pronunciation-label");
//   const audioBtn = results.querySelector(".results__play-button");
//   const details = results.querySelector(".results__details");
//   const partOfSpeech = details.querySelector(".results__part-of-speech-value");
//   const meaningList = details.querySelector(".results__list--meaning");
//   const meaningListItem = meaningList.querySelector(".results__item");

//   return {
//     results,
//     title,
//     pronunciation,
//     audioBtn,
//     details,
//     partOfSpeech,
//     meaningList,
//     meaningListItem,
//   };
// };

const getFilteredData = (data) => {
  const word = data[0].word;
  const phonetic = data[0].phonetics[1].text;
  const audio = data[0].phonetics[data[0].phonetics.length - 1].audio;
  const meanings = data.map(({ meanings }) => meanings);

  return {
    word,
    phonetic,
    audio,
    meanings,
  };
};

showResults(data);
