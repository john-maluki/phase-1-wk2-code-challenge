const headerAppNode = document.querySelector("#header__app");
const animalFormModalPaneNode = document.querySelector("#animal-form-modal");
const modalCloseNode = document.querySelector("#modal__close");

const searchPaneNode = document.querySelector("#search-pane");
const headerSearchNode = document.querySelector("#header__search");

const toggleModalPaneHandler = (e) => {
  e.preventDefault();
  const isOpen = animalFormModalPaneNode.classList.contains("modal--visible");

  if (isOpen) {
    animalFormModalPaneNode.classList.remove("modal--visible");
  } else {
    animalFormModalPaneNode.classList.add("modal--visible");
  }
};

const toggleSearchPaneHandler = (e) => {
  const isOpen = searchPaneNode.classList.contains("search-pane--visible");

  if (isOpen) {
    searchPaneNode.classList.remove("search-pane--visible");
  } else {
    searchPaneNode.classList.add("search-pane--visible");
  }
};

const buildResultPane = (data) => {
  deleteAllChildrenFromNode(searchPaneNode.children);
  data.forEach((element) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement("p");

    div.classList.add("search-pane__result");
    img.classList.add("search-pane__img");
    p.classList.add("search-pane__name");

    img.src = element.image;
    img.alt = element.name;
    p.textContent = element.name;
    div.addEventListener("click", buildAnimalFromSearchedResultHandler);
    div.id = element.id;
    div.appendChild(img);
    div.appendChild(p);
    searchPaneNode.appendChild(div);
  });
};

const deleteAllChildrenFromNode = (nodes) => {
  for (const node of nodes) {
    node.remove();
  }
};

const buildAnimalFromSearchedResultHandler = (e) => {
  console.log(e.target);
};

const searchValueHandler = async (e) => {
  const searchableData = await getAllAnimals();
  const matchingData = searchableData.filter((data) =>
    data.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  buildResultPane(matchingData);
};

headerAppNode.addEventListener("click", toggleModalPaneHandler);
modalCloseNode.addEventListener("click", toggleModalPaneHandler);

headerSearchNode.addEventListener("focus", toggleSearchPaneHandler);
headerSearchNode.addEventListener("blur", toggleSearchPaneHandler);
headerSearchNode.addEventListener("input", searchValueHandler);
