const editButtonNode = document.querySelector('.profile__edit-button');
const popupNode = document.querySelector('.popup');
const closeButtonNode = document.querySelector('.popup__close-button');
let profileNameNode = document.querySelector('.profile__personal-info-name');
let profileOccupationNode = document.querySelector('.profile__personal-info-occupation');
const popupFormNode = document.querySelector('.popup__form');
let popupFormFieldNameNode = document.querySelector('.popup__form-field_type_name');
let popupFormFieldOccupationNode = document.querySelector('.popup__form-field_type_occupation');

function handleEditButtonNode() {
    popupNode.classList.add ('popup_visible'); //сделать окно попап видимым, добавив ему класс, меняющий display:none на display:flex
    popupFormFieldNameNode.value = profileNameNode.textContent; //присвоение полям формы значения имени в профиле
    popupFormFieldOccupationNode.value = profileOccupationNode.textContent; //присвоение полям формы значения рода занятия в профиле
}

function handleCloseButtonNode() {
    popupNode.classList.remove('popup_visible'); //сделать попап невидимым при нажатии на кнопку закрытия окна попапа
}

function handlePopupFormSubmitNode(event) {
    event.preventDefault();
    profileNameNode.textContent = popupFormFieldNameNode.value;
    profileOccupationNode.textContent = popupFormFieldOccupationNode.value; 
    handleCloseButtonNode();
}

editButtonNode.addEventListener('click', handleEditButtonNode);
closeButtonNode.addEventListener('click', handleCloseButtonNode);
popupFormNode.addEventListener('submit', handlePopupFormSubmitNode);