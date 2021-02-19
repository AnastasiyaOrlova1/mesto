import Validation from "../components/FormValidation.js";
import { validationConfig } from "../components/FormValidation.js";
import Card from "../components/Card.js";
import { initialCards } from "../components/initialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css'

const editButtonNode = document.querySelector(".profile__edit-button");
const addButtonNode = document.querySelector(".profile__add-button");
const popupEditCloseBtn = document.querySelector("#edit-close");
const popupAddCloseBtn = document.querySelector("#add-close");
const popupImageCloseBtn = document.querySelector("#image-close");
const profileNameNode = document.querySelector(".profile__personal-info-name");
const profileOccupationNode = document.querySelector(
  ".profile__personal-info-occupation"
);
const popupFormFieldNameNode = document.querySelector(
  ".popup__form-field_type_name"
);
const popupFormFieldOccupationNode = document.querySelector(
  ".popup__form-field_type_occupation"
);
const containerElements = document.querySelector(".elements");
const templateElement = document.querySelector("template");
const popupImageContainer = document.querySelector(".popup-image");
const popupPic = popupImageContainer.querySelector(".popup-image__pic");
const popupPicCaption = popupImageContainer.querySelector(
  ".popup-image__caption"
);
const popupCardNode = document.querySelector(".popup-cards");
const popupFormFieldPlaceNode = document.querySelector(
  ".popup__form-field_type_place"
);
const popupFormFieldLinkNode = document.querySelector(
  ".popup__form-field_type_link"
);
const popupProfile = document.querySelector(".popup-profile");
const popupFormPlace = document.querySelector(".popup__form_place");
const popupFormProfile = document.querySelector(".popup__form_profile");


/*const cardSection = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card ({
      item,
      handleCardClick:() => {
        popupImageContainer.open(item);
      }
   },
   'template');
   const cardElement = card.renderCard();
   cardSection.addItem(cardElement);
  }
},
/*containerElements*//*'.elements'
);*/




const userInfo = new UserInfo({
  userNameSelector: ".profile__personal-info-name",
  userOccupationSelector: ".profile__personal-info-occupation"
});
userInfo.setUserInfo(profileNameNode.textContent, profileOccupationNode.textContent);

console.log(profileNameNode)



function addNewCard(cardData) {
  /*e.preventDefault();*/
  const card = new Card({cardData, handleCardClick}, "template");
  const cardItem = card.renderCard();
  return cardItem;
}

function handleCardClick(data) {
  popupImg.open(data);
}

const popupImg = new PopupWithImage('.popup-image');
popupImg.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = addNewCard(data);
     insertNewCard(card);
  }
},
'.elements'
);

function insertNewCard(data) {
  cardList.addItem(data);
}

cardList.renderItems();




    /*{ name: popupFormFieldPlaceNode.value, link: popupFormFieldLinkNode.value,
     },
    "template"
  );*/

  /*const newItemCard = card.renderCard();
  containerElements.prepend(newItemCard);
  closePopup(popupCardNode);
}*/

/*const imagePopupVis = new PopupwithImage('.popup-image');*/

const newFormPopup = new PopupWithForm( {
  popupSelect: '.popup-cards',
  formSubmit: (data) => {
    const card = addNewCard(data);
    insertNewCard(card);
    /*cardSection.renderer(data);*/
  }
});
newFormPopup.setEventListeners();


const editFormPopup = new PopupWithForm( {
  popupSelect: '.popup-profile',
  formSubmit: (data) => {
    userInfo.setUserInfo(data.formname, data.formoccupation);
    /*cardSection.renderer(data);*/
  }
});

editFormPopup.setEventListeners();
/*const infoUser = new UserInfo({
  userNameSelector: '.profile__personal-info-name',
  userOccupationSelector: '.profile__personal-info-occupation'
});

const infoUserPopup = new PopupWithForm({
  popupSelect: '.popup-profile',
  formSubmit: (data) => {
    infoUser.setUserInfo(data);
  }
});
*/


const validationFormAdd = new Validation(validationConfig, ".popup__form_place");
validationFormAdd.enableValidation();
const validationFormEditProfile = new Validation(validationConfig, ".popup__form_profile");
validationFormEditProfile.enableValidation();

/*initialCards.forEach((item) => {
  const card = new Card(item, "template", handleCardClick).renderCard();
  containerElements.append(card);
});*/

/*function openPopup(modal) {
  modal.classList.add("popup_visible"); //сделать окно попап видимым, добавив ему класс, меняющий display:none на display:flex
  document.addEventListener("keydown", closePopupByEsc);
  document.addEventListener("click", closePopupByOverlay);
}

function closePopup(modal) {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", closePopupByEsc);
  document.removeEventListener("click", closePopupByOverlay);
}

function submitPopupProfileForm(event) {
  event.preventDefault();
  profileNameNode.textContent = popupFormFieldNameNode.value;
  profileOccupationNode.textContent = popupFormFieldOccupationNode.value;
  closePopup(popupProfile);
}

function closePopupByEsc(e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_visible"));
  }
}*/

/*function closePopupByOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    const popupInAction = document.querySelector(".popup_visible");
    closePopup(popupInAction);
  }
}*/



/*function openImagePopup(item) {
  popupPicCaption.textContent = item.name;
  popupPic.src = item.link;
  popupPic.alt = item.name;

  openPopup(popupImageContainer);
}*/

/*function removeItem(event) {
  event.target.closest(".element").remove();
}*/

/*function addNewCard(e) {
  e.preventDefault();
  const card = new Card(
    { name: popupFormFieldPlaceNode.value, link: popupFormFieldLinkNode.value },
    "template",
    openImagePopup
  );
  const newItemCard = card.renderCard();
  containerElements.prepend(newItemCard);
  closePopup(popupCardNode);
}

function handleCardClick()*/

popupCardNode.addEventListener("submit", addNewCard);

editButtonNode.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  popupFormFieldNameNode.value = getUserInfo.userName;
  popupFormFieldOccupationNode.value = getUserInfo.aboutMe;
  validationFormEditProfile.setButtonState(popupFormProfile.checkValidity());
  validationFormEditProfile.clearErrorInputs();
 editFormPopup.open();

});


/*addButtonNode.addEventListener('click', () => {
  validationFormAdd
})*/

/*cardSection.renderItems();*/
/*imagePopupVis.setEventListeners();
newFormPopup.setEventListeners();
infoUserPopup.setEventListeners();*/

addButtonNode.addEventListener('click', () => {newFormPopup.open(); 
validationFormAdd.setButtonState(popupFormPlace.checkValidity());
  validationFormAdd.clearErrorInputs();
}
  );
/*editButtonNode.addEventListener('click', () => {
const {userName, aboutMe} = infoUser.getUserInfo();
popupFormFieldNameNode.value = userName;
popupFormFieldOccupationNode.value = aboutMe;
infoUserPopup.open()
})*/

/*editButtonNode.addEventListener("click", function () {
  popupFormFieldNameNode.value = profileNameNode.textContent; //присвоение полям формы значения имени в профиле
  popupFormFieldOccupationNode.value = profileOccupationNode.textContent; //присвоение полям формы значения рода занятия в профиле
  validationFormEditProfile.setButtonState(popupFormProfile.checkValidity());
  validationFormEditProfile.clearErrorInputs();
  openPopup(popupProfile);
});*/

/*popupEditCloseBtn.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupAddCloseBtn.addEventListener("click", function () {
  closePopup(popupCardNode);
  popupFormPlace.reset();
});

popupImageCloseBtn.addEventListener("click", function () {
  closePopup(popupImageContainer);
});*/

/*popupFormProfile.addEventListener("submit", submitPopupProfileForm);

addButtonNode.addEventListener("click", function () {
  validationFormAdd.setButtonState(popupFormPlace.checkValidity());
  validationFormAdd.clearErrorInputs();
  openPopup(popupCardNode);
});
*/