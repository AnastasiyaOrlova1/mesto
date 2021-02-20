import Validation from "../components/FormValidation.js";
import Card from "../components/Card.js";
import { initialCards } from "../components/initialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

const editButtonNode = document.querySelector(".profile__edit-button");
const addButtonNode = document.querySelector(".profile__add-button");
const profileNameNode = document.querySelector(".profile__personal-info-name");
const popupFormFieldNameNode = document.querySelector(
  ".popup__form-field_type_name"
);
const popupFormFieldOccupationNode = document.querySelector(
  ".popup__form-field_type_occupation"
);
const popupCardNode = document.querySelector(".popup-cards");
const popupFormPlace = document.querySelector(".popup__form_place");
const popupFormProfile = document.querySelector(".popup__form_profile");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-field",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_invalid",
  inputErrorClass: "popup__form-field_state_invalid",
  errorClass: "popup__form-field-error",
};
const userInfo = new UserInfo({
  userNameSelector: ".profile__personal-info-name",
  userOccupationSelector: ".profile__personal-info-occupation",
});

console.log(profileNameNode);

function addNewCard(cardData) {
  /*e.preventDefault();*/
  const card = new Card({ cardData, handleCardClick }, "template");
  const cardItem = card.renderCard();
  return cardItem;
}

function handleCardClick(data) {
  popupImg.open(data);
}

const popupImg = new PopupWithImage(".popup-image");
popupImg.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = addNewCard(data);
      insertNewCard(card);
    },
  },
  ".elements"
);

function insertNewCard(data) {
  cardList.addItem(data);
}

cardList.renderItems();

const newFormPopup = new PopupWithForm({
  popupSelect: ".popup-cards",
  formSubmit: (data) => {
    const card = addNewCard(data);
    insertNewCard(card);
  },
});
newFormPopup.setEventListeners();

const editFormPopup = new PopupWithForm({
  popupSelect: ".popup-profile",
  formSubmit: (data) => {
    userInfo.setUserInfo(data.name, data.occupation);
  },
});

editFormPopup.setEventListeners();

const validationFormAdd = new Validation(
  validationConfig,
  ".popup__form_place"
);
validationFormAdd.enableValidation();
const validationFormEditProfile = new Validation(
  validationConfig,
  ".popup__form_profile"
);
validationFormEditProfile.enableValidation();

popupCardNode.addEventListener("submit", addNewCard);

editButtonNode.addEventListener("click", () => {
  const getUserInfo = userInfo.getUserInfo();
  popupFormFieldNameNode.value = getUserInfo.userName;
  popupFormFieldOccupationNode.value = getUserInfo.aboutMe;
  validationFormEditProfile.setButtonState(popupFormProfile.checkValidity());
  validationFormEditProfile.clearErrorInputs();
  editFormPopup.open();
});

addButtonNode.addEventListener("click", () => {
  newFormPopup.open();
  validationFormAdd.setButtonState(popupFormPlace.checkValidity());
  validationFormAdd.clearErrorInputs();
});
