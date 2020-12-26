const editButtonNode = document.querySelector('.profile__edit-button');
const addButtonNode = document.querySelector('.profile__add-button');
const popupNode = document.querySelector('.popup');
const popupEditCloseBtn = document.querySelector('#edit-close');
const popupAddCloseBtn = document.querySelector('#add-close');
const popupImageCloseBtn = document.querySelector('#image-close');
const profileNameNode = document.querySelector('.profile__personal-info-name');
const profileOccupationNode = document.querySelector('.profile__personal-info-occupation');
const popupFormNode = document.querySelector('.popup__form');
const popupFormFieldNameNode = document.querySelector('.popup__form-field_type_name');
const popupFormFieldOccupationNode = document.querySelector('.popup__form-field_type_occupation');
const containerElements = document.querySelector('.elements');
const templateElement = document.querySelector('template');
const popupImageContainer = document.querySelector('.popup-image');
const popupPic = popupImageContainer.querySelector('.popup-image__pic');
const popupPicCaption = popupImageContainer.querySelector('.popup-image__caption');
const popupCardNode = document.querySelector('.popup-cards');
const popupFormFieldPlaceNode = document.querySelector('.popup__form-field_type_place');
const popupFormFieldLinkNode = document.querySelector('.popup__form-field_type_link');
const popupProfile = document.querySelector('.popup-profile');



function openPopup(modal) {

    modal.classList.add('popup_visible'); //сделать окно попап видимым, добавив ему класс, меняющий display:none на display:flex
    document.addEventListener('keydown', closePopupByEsc);

}

function closePopup(modal) {
    modal.classList.remove('popup_visible');
   /*document.removeEventListener('keydown', closePopupByEsc);*/
}

function handlePopupFormSubmitNode(event) {
    event.preventDefault();
    profileNameNode.textContent = popupFormFieldNameNode.value;
    profileOccupationNode.textContent = popupFormFieldOccupationNode.value;
    closePopup(popupNode);
}

function closePopupByEsc() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closePopup(document.querySelector('.popup_visible'));
        }
    })
}

function closePopupByOverlay(evt) {

    const targetCloseBtn = evt.target;
    if (targetCloseBtn.classList.contains('popup')) {
        targetCloseBtn.closest('.popup').classList.remove('popup_visible');
    };
}

function renderContainerElements() {
    const elementContainerItems = initialCards.map(composeItem);
    containerElements.append(...elementContainerItems);
}

function composeItem({ name, link }) {
    const newCard = templateElement.content.cloneNode(true);
    const cardName = newCard.querySelector('.element__text');
    const cardImage = newCard.querySelector('.element__photo');
    const elementLikeButton = newCard.querySelector('.element__like-button');


    cardImage.src = link;
    cardName.textContent = name;
    cardImage.alt = name;

    const removeButton = newCard.querySelector('.element__delete-button');
    removeButton.addEventListener('click', removeItem);


    cardImage.addEventListener('click', function () {
        openImagePopup({ name, link });
    });

    function handleLikeButton() {
        elementLikeButton.classList.toggle('element__like-button_active');

    };
    elementLikeButton.addEventListener('click', handleLikeButton);
    return newCard;

};

renderContainerElements();

function handleLikeButton() {
    elementLikeButton.classList.toggle('element__like-button_active');
};

function openImagePopup(item) {
    popupPicCaption.textContent = item.name;
    popupPic.src = item.link;
    popupPic.alt = item.name;

    openPopup(popupImageContainer);

}

function removeItem(event) {
    event.target.closest('.element').remove();
};

function addNewCard(e) {
    e.preventDefault();
    const newItemCard = composeItem({ name: popupFormFieldPlaceNode.value, link: popupFormFieldLinkNode.value });
    containerElements.prepend(newItemCard);
    closePopup(popupCardNode);
    popupFormFieldPlaceNode.value = '';
    popupFormFieldLinkNode.value = '';
}

popupCardNode.addEventListener('submit', addNewCard);

editButtonNode.addEventListener('click', function () {

    popupFormFieldNameNode.value = profileNameNode.textContent; //присвоение полям формы значения имени в профиле
    popupFormFieldOccupationNode.value = profileOccupationNode.textContent; //присвоение полям формы значения рода занятия в профиле
    setButtonState(popupProfile.querySelector('.popup__submit-button'), popupProfile.querySelector('.popup__form').checkValidity(), validationConfig);
    openPopup(popupNode);
});

popupEditCloseBtn.addEventListener('click', function () {
    closePopup(popupNode)
});

popupAddCloseBtn.addEventListener('click', function () {
    closePopup(popupCardNode);
});

popupImageCloseBtn.addEventListener('click', function () {
    closePopup(popupImageContainer);
});

popupFormNode.addEventListener('submit', handlePopupFormSubmitNode);

addButtonNode.addEventListener('click', function () {
    const formAddPlace = document.querySelector('.popup__form_place');
    setButtonState(popupCardNode.querySelector('.popup__submit-button'), popupCardNode.querySelector('.popup__form').checkValidity(), validationConfig);
    openPopup(popupCardNode);
})

document.addEventListener('click', closePopupByOverlay);

