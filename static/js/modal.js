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
  e.preventDefault();
  const isOpen = searchPaneNode.classList.contains("search-pane--visible");

  if (isOpen) {
    searchPaneNode.classList.remove("search-pane--visible");
  } else {
    searchPaneNode.classList.add("search-pane--visible");
  }
};

headerAppNode.addEventListener("click", toggleModalPaneHandler);
modalCloseNode.addEventListener("click", toggleModalPaneHandler);

headerSearchNode.addEventListener("focus", toggleSearchPaneHandler);
headerSearchNode.addEventListener("blur", toggleSearchPaneHandler);
