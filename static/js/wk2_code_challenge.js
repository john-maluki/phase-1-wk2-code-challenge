const MAIN_URL = "http://localhost:3000/characters";

const animalListNode = document.querySelector("#animal-list");
const animalVotesNode = document.querySelector("#animal__vote");
const animalDetailNode = document.querySelector("#animal__detail");

const getDomainUrl = () => {
  return MAIN_URL;
};

/**
 * Fethes all character animals from the server using get
 * request. It returns an array of objects
 */
const fetchAllAnimals = () => {
  fetch(getDomainUrl())
    .then((result) => result.json())
    .then((data) => createAnimals(data));
};

/**
 * Fetches the animal by id provided
 * @param {*} id
 */
const fetchAnimalById = (id) => {
  fetch(`${getDomainUrl()}/${id}`)
    .then((result) => result.json())
    .then((data) => createAnimalProfile(data));
};

/**
 * Receives data in array of objects
 * @param {*} data
 */
const createAnimals = (data) => {
  data.forEach((character) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const span = document.createElement("span");

    img.src = character.image;
    img.alt = character.name;
    span.textContent = character.name;

    div.classList.add("card__animal-profile");
    img.classList.add("card__animal_img");
    span.classList.add("card__animal-name");

    div.id = character.id;

    div.appendChild(img);
    div.appendChild(span);

    div.addEventListener("click", buildAnimalProfileHandler);
    animalListNode.appendChild(div);
  });

  displayFirstAnimalByDefault(data[0]); // pass first object
};
/**
 * Initialize animal Profile when page first loads
 * @param {*} data
 */
const displayFirstAnimalByDefault = (data) => {
  createAnimalProfile(data);
};

const createAnimalProfile = (data) => {
  const voteNode = animalVotesNode.querySelector("h1");
  const voteButtonNode = animalVotesNode.querySelector("#vote");
  const resetButtonNode = animalVotesNode.querySelector("#reset");

  voteNode.textContent = data.votes;
  voteButtonNode.addEventListener("click", incrementVotesHandler);
  resetButtonNode.addEventListener("click", resetVotesHandler);

  const nameNode = animalDetailNode.querySelector("h1");
  const imageNode = animalDetailNode.querySelector("img");

  nameNode.textContent = data.name;
  imageNode.src = data.image;
  imageNode.atl = data.name;
};

const incrementVotesHandler = (e) => {
  const parentNode = e.target.parentNode;
  const votesNode = parentNode.querySelector("h1");
  const votes = Number.parseInt(votesNode.textContent);
  votesNode.textContent = incrementNumberByOne(votes);
};

const resetVotesHandler = (e) => {
  const parentNode = e.target.parentNode;
  const votesNode = parentNode.querySelector("h1");
  votesNode.textContent = 0;
};

const incrementNumberByOne = (num) => {
  return (num += 1);
};

/**
 * builds animal profile
 */
const buildAnimalProfileHandler = (e) => {
  const animalId = e.target.parentNode.id;
  fetchAnimalById(animalId);
};

/**
 * Initializes app when the app is loaded
 */
const init = () => {
  fetchAllAnimals();
};

window.onload = init;
