import Validation from "../components/FormValidation.js";
import Card from "../components/Card.js";
import { initialCards } from "../components/initialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDeleteRequest from "../components/PopupDeleteRequest.js";
import {
  editButtonNode,
  addButtonNode,
  profileNameNode,
  popupFormFieldNameNode,
  popupFormFieldOccupationNode,
  popupCardNode,
  popupFormPlace,
  popupFormProfile,
  deleteCardPopup,
  avatarButton,
  popupAvatarForm,
} from "../utils/constants.js";
import "./index.css";

let userId = null;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-field",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_invalid",
  inputErrorClass: "popup__form-field_state_invalid",
  errorClass: "popup__form-field-error",
};

const config = {
  url: "https://mesto.nomoreparties.co/v1/",
  headers: {
    authorization: "718b104b-a109-4f8a-85ef-b777bb683796",
    "Content-Type": "application/json",
  },
  groupId: "cohort-20/",
};

const api = new Api(config);

api
  .getCards()
  .then((res) => {
    cardList.renderItems(res);
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUserProfileInfo()
  .then((dataUser) => {
    console.log(dataUser);
    userId = dataUser._id;
    userInfo.setUserInfo(dataUser.name, dataUser.about, dataUser.avatar);
    userInfo.updateUserInfo();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editFormPopup.renderLoading(false);
  });

const userInfo = new UserInfo({
  userNameSelector: ".profile__personal-info-name",
  userOccupationSelector: ".profile__personal-info-occupation",
  userAvatarSelector: ".profile__avatar",
});

function addNewCard(item) {
  /*e.preventDefault();*/
  const card = new Card(
    {
      cardData: { ...item, userId },
      handleCardClick: handleCardClick,
      handleDeleteClick: (cardData, element) => {
        console.log(cardData);
        deletePopup.open();
        deletePopup.setActionSubmit(() => {
          api
            .deleteCard(cardData)
            .then(() => {
              element.remove();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
    },

    "template",
    api
  );

  const cardItem = card.renderCard();
  return cardItem;
}

function handleCardClick(item) {
  popupImg.open(item);
}

const popupImg = new PopupWithImage(".popup-image");
popupImg.setEventListeners();

const cardList = new Section(
  {
    renderer: (data) => {
      const card = addNewCard(data);
      cardList.addItem(card);
    },
  },
  ".elements"
);

const deletePopup = new PopupDeleteRequest(".popup-delete");

deletePopup.setEventListeners();

const newFormPopup = new PopupWithForm({
  popupSelect: ".popup-cards",
  formSubmit: (data) => {
    newFormPopup.renderLoading(false);
    api
      .addNewCard(data)
      .then((data) => {
        cardList.addItem(addNewCard(data), true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        newFormPopup.renderLoading(true);
      });
  },
});

newFormPopup.setEventListeners();

const editFormPopup = new PopupWithForm({
  popupSelect: ".popup-profile",
  formSubmit: (data) => {
    editFormPopup.renderLoading(false);
    api
      .editUserProfile(data)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
        userInfo.updateUserInfo();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editFormPopup.renderLoading(true);
      });
  },
});

editFormPopup.setEventListeners();

const avatarPopup = new PopupWithForm({
  popupSelect: ".popup-avatar",
  formSubmit: (data) => {
    avatarPopup.renderLoading(false);
    api
      .updateAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about, data.avatar);
        userInfo.updateUserInfo();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarPopup.renderLoading(true);
      });
  },
});
avatarPopup.setEventListeners();

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

const validationAvatarPopup = new Validation(
  validationConfig,
  ".popup__form_avatar"
);
validationAvatarPopup.enableValidation();

editButtonNode.addEventListener("click", () => {
  const infoAboutUser = userInfo.getUserInfo();
  popupFormFieldNameNode.value = infoAboutUser.name;
  popupFormFieldOccupationNode.value = infoAboutUser.about;
  validationFormEditProfile.setButtonState(popupFormProfile.checkValidity());
  validationFormEditProfile.clearErrorInputs();
  editFormPopup.open();
});

addButtonNode.addEventListener("click", () => {
  newFormPopup.open();
  validationFormAdd.setButtonState(popupFormPlace.checkValidity());
  validationFormAdd.clearErrorInputs();
});

avatarButton.addEventListener("click", () => {
  validationAvatarPopup.setButtonState(popupAvatarForm.checkValidity());
  validationFormEditProfile.clearErrorInputs();
  avatarPopup.open();
});
