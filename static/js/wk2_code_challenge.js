const MAIN_URL = "http://localhost:3000/characters";

const animalListNode = document.querySelector("#animal-list");
const animalVotesNode = document.querySelector("#animal__vote");
const animalDetailNode = document.querySelector("#animal__detail");
const modalFormNode = document.querySelector("#modal__form");

const getDomainUrl = () => {
  return MAIN_URL;
};

/**
 * Fethes all character animals from the server using get
 * request. It returns an array of objects
 */
const fetchAllAnimals = async () => {
  return fetch(getDomainUrl())
    .then((result) => result.json())
    .then((data) => data);
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

const patchAnimalVotes = async (id, data) => {
  return await fetch(`${getDomainUrl()}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  });
};

const getAllAnimals = async () => {
  return await fetchAllAnimals();
};

const postAnimal = (animalDetails) => {
  fetch(getDomainUrl(), {
    method: "POST",
    body: JSON.stringify(animalDetails),
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    if (res.status === 201) {
      fetchAllAnimals();
    }
  });
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
  voteNode.id = data.id;
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

  const id = votesNode.id;
  votesNode.textContent = incrementNumberByOne(id, votes);
};

const resetVotesHandler = (e) => {
  const parentNode = e.target.parentNode;
  const votesNode = parentNode.querySelector("h1");
  const id = votesNode.id;
  const data = { votes: 0 };
  const isSaved = patchAnimalVotes(id, data);
  if (isSaved) {
    votesNode.textContent = 0;
  }
};

const incrementNumberByOne = (id, num) => {
  const incrementedValue = num + 1;
  const data = { votes: incrementedValue };
  const isSaved = patchAnimalVotes(id, data);
  if (isSaved) {
    return (num += 1);
  } else {
    return num;
  }
};

/**
 * builds animal profile
 */
const buildAnimalProfileHandler = (e) => {
  const animalId = e.target.parentNode.id;
  fetchAnimalById(animalId);
};

const modalFormHandler = (e) => {
  const inputName = e.target.querySelector("#modal__name");
  const inputUrl = e.target.querySelector("#modal__url");
  const animalData = {
    name: inputName.value,
    image: inputUrl.value,
    votes: 0,
  };
  postAnimal(animalData);
};

/**
 * Initializes app when loaded
 */
const init = async () => {
  const data = await getAllAnimals();
  createAnimals(data);
};

modalFormNode.addEventListener("submit", modalFormHandler);

window.onload = init;
