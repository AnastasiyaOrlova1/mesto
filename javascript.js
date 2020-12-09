const editButtonNode = document.querySelector('.profile__edit-button');
const popupNode = document.querySelector('.popup');
const closeButtonNode = document.querySelector('.popup__close-button');

const profileNameNode = document.querySelector('.profile__personal-info-name');
const profileOccupationNode = document.querySelector('.profile__personal-info-occupation');

const popupFormNode = document.querySelector('.popup__form');
const popupNameFieldNode = document.querySelector('.popup__name-field');
const popupJobFieldNode = document.querySelector('.popup__job-field');
const popupSubmitButton = document.querySelector('.popup__submit-button');

editButtonNode.addEventListener('click', handleEditButtonNode);

function handleEditButtonNode() {
    popupNode.classList.add ('popup__visible');
}


closeButtonNode.addEventListener('click', handleCloseButtonNode);

function handleCloseButtonNode() {
    popupNode.classList.remove('popup__visible');
}

popupFormNode.addEventListener('submit', handlePopupFormSubmitNode);

function handlePopupFormSubmitNode(event) {
    event.preventDefault();
    profileNameNode.textContent = popupNameFieldNode.value;
    profileOccupationNode.textContent = popupJobFieldNode.value; 
    handleCloseButtonNode();
}