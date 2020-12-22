const editButtonNode = document.querySelector('.profile__edit-button');
const addButtonNode = document.querySelector('.profile__add-button');


const popupNode = document.querySelector('.popup');
/*const closeButtonNode = document.querySelector('.popup__close-button');*/
const popupEditCloseBtn = document.querySelector('#edit-close');
const popupAddCloseBtn = document.querySelector('#add-close');
const popupImageCloseBtn = document.querySelector('#image-close');
let profileNameNode = document.querySelector('.profile__personal-info-name');
let profileOccupationNode = document.querySelector('.profile__personal-info-occupation');
const popupFormNode = document.querySelector('.popup__form');
let popupFormFieldNameNode = document.querySelector('.popup__form-field_type_name');
let popupFormFieldOccupationNode = document.querySelector('.popup__form-field_type_occupation');
const body = document.querySelector('.body');


const containerElements = document.querySelector('.elements');

const templateElement = document.querySelector('template');
const popupImageContainer = document.querySelector('.popup-image');
const popupPic = popupImageContainer.querySelector('.popup-image__pic');
const popupPicCaption = popupImageContainer.querySelector('.popup-image__caption');
const popupCardNode = document.querySelector('.popup-cards');
let popupFormFieldPlaceNode = document.querySelector('.popup__form-field_type_place');
let popupFormFieldLinkNode = document.querySelector('.popup__form-field_type_link');






const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

const submitButton = document.querySelector('popup__submit-button');
/*const elementLikeButton = newCard.querySelector('.element__like-button');*/

function /*handleEditButtonNode*/openPopup(modal) {
    /*const targetOpenBtn = evt.target;
    if (targetOpenBtn.classList.contains)*/
    modal.classList.add('popup_visible'); //сделать окно попап видимым, добавив ему класс, меняющий display:none на display:flex
    /*popupFormFieldNameNode.value = profileNameNode.textContent; //присвоение полям формы значения имени в профиле
    popupFormFieldOccupationNode.value = profileOccupationNode.textContent; *///присвоение полям формы значения рода занятия в профиле
}

/*function handleCloseButtonNodeclosePopup(evt) {
    const targetCloseBtn = evt.target;
    if (targetCloseBtn.classList.contains('popup__close-button')){
        targetCloseBtn.closest('.popup').classList.remove('popup_visible');
    };
    popupNode.classList.remove('popup_visible'); //сделать попап невидимым при нажатии на кнопку закрытия окна попапа
};*/

function closePopup(modal) {
    modal.classList.remove('popup_visible');
}

function handlePopupFormSubmitNode(event) {
    event.preventDefault();
    profileNameNode.textContent = popupFormFieldNameNode.value;
    profileOccupationNode.textContent = popupFormFieldOccupationNode.value; 
    closePopup(popupNode);
}

/*function handleAddButtonNode() {                        
    const popupCardNode = document.querySelector('.popup-card');
    
    popupCardNode.classList.add('popup_visible');
}*/

function renderContainerElements() {
    const elementContainerItems = initialCards.map(composeItem);
    containerElements.append(...elementContainerItems);
    
}

function composeItem({name, link}) {
    const newCard = templateElement.content.cloneNode(true);
    const cardName = newCard.querySelector('.element__text');
    const cardImage = newCard.querySelector('.element__photo');
    const elementLikeButton = newCard.querySelector('.element__like-button');
    console.log(elementLikeButton);
    
   /* name === caption*/
    cardImage.src = link;
    cardName.textContent = name;

    /*popupPicCaption.textContent = caption;*/
    
    const removeButton = newCard.querySelector('.element__delete-button');
    removeButton.addEventListener('click', removeItem);

    /*popupPic.src = link;
    popupPic.alt = name;*/
    cardImage.addEventListener('click', function() {
        openImagePopup({name,link});
    });

    /*function handleLikeButton() {
        elementLikeButton.classList.toggle('element__like-button_active');
    };*/
    
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
    /*const popupPicCaption = document.querySelector('popup-image__caption');*/
    popupPicCaption.textContent = item.name;
    popupPic.src = item.link;
    popupPic.alt = item.name;

    /*popupPicCaption.textContent = item.name;*/
    openPopup(popupImageContainer);
    
}

function removeItem(event) {
    const targetElement = event.target;
    const targetItem = targetElement.closest('.element');
    
    targetItem.remove();
};

function addNewCard(e) {
    e.preventDefault();
    const inputPlace = popupFormFieldPlaceNode.value;
    const inputLink = popupFormFieldLinkNode.value;
    const newItemCard = composeItem({name: inputPlace, link: inputLink});
    containerElements.prepend(newItemCard);
    closePopup(popupCardNode);
    inputPlace.value = '';
    inputLink.value = '';
    
}



popupCardNode.addEventListener('submit', addNewCard);
  

 

editButtonNode.addEventListener('click', /*handleEditButtonNode*/function() {
    popupFormFieldNameNode.value = profileNameNode.textContent; //присвоение полям формы значения имени в профиле
    popupFormFieldOccupationNode.value = profileOccupationNode.textContent; //присвоение полям формы значения рода занятия в профиле
    openPopup(popupNode);
});
/*closeButtonNode*/popupEditCloseBtn.addEventListener('click', /*handleCloseButtonNode*/function() 
{closePopup(popupNode)
});
popupAddCloseBtn.addEventListener('click', /*handleCloseButtonNode*/function() 
{closePopup(popupCardNode);
});
popupImageCloseBtn.addEventListener('click', /*handleCloseButtonNode*/function() 
{closePopup(popupImageContainer);
});
popupFormNode.addEventListener('submit', handlePopupFormSubmitNode);



addButtonNode.addEventListener('click', function() {
    openPopup(popupCardNode);
});

