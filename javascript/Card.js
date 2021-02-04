export default class Card {
    constructor(cardData, templateSelector, openImagePopup) {
        this._cardData = cardData;
        this._link = cardData.link
        this._name = cardData.name;
        this._src = cardData.src;
        this._templateSelector = templateSelector;
        this._openImagePopup = openImagePopup;
        /*this._card = null;*/
    }



    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;

    }

    renderCard() {
        this._card = this._getTemplate();
        this._image = this._card.querySelector('.element__photo');

        this._card.querySelector('.element__text').textContent = this._cardData.name;
        this._image.src = this._cardData.link;
        this._image.alt = this._cardData.name;

        this._setEventListeners();
        return this._card;
    }


    _setEventListeners() {

        this._card.querySelector('.element__like-button').addEventListener('click', () => {
            this._handleLikeButton();
        });

        this._card.querySelector('.element__delete-button').addEventListener('click', () => {
            this._removeItem();
        });

        this._card.querySelector('.element__photo').addEventListener('click', () => {
            this._openImagePopup({ name: this._name, link: this._link });
        });

    }

    _removeEventListeners() {

        this.this._card.querySelector('.element__like-button').removeEventListener('click', () => {
            this._handleLikeButton();
        });

        this._card.querySelector('.element__delete-button').removeEventListener('click', () => {
            this._removeItem();
        });

        this.__card.querySelector('.element__photo').addEventListener('click', () => {
            this._openImagePopup({ name: this._name, link: this._link });
        });
    }

    _handleLikeButton() {
        this._card.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _removeItem() {
        this._card.closest('.element').remove();
    }
}
