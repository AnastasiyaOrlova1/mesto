

export default class Card {
  constructor({ cardData, handleCardClick, handleDeleteClick }, templateSelector, api) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._src = cardData.src;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = cardData.likes.length;
    this._idOwner = cardData.owner._id;
    this._id = cardData._id;
    this._api = api;
    this.likeId = cardData.likes;
    this._userId = cardData.userId;
    console.log(cardData.likes.length)

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  renderCard() {
    this._card = this._getTemplate();
    this._image = this._card.querySelector(".element__photo");

    this._card.querySelector(
      ".element__text"
    ).textContent = this._cardData.name;
    this._trash = this._card.querySelector('.element__delete-button');
    this._likePic = this._card.querySelector(".element__like-button");
    this._image.src = this._cardData.link;
    this._image.alt = this._cardData.name;
    this._likeCounter = this._card.querySelector(".element__like-counter");
    this._likeCounter.textContent = this._likes;
    this._isNotMyCard();
    this.myCardLike(this.defineMyLike())
    this._setEventListeners();
    console.log(this._card);
    return this._card;

  }

  _setEventListeners() {
    /*this._card
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });*/

    /*this._card
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._removeItem();
      });*/

    this._image.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    })
    console.log(this._card);

    this._trash.addEventListener('click', () => {
      this._handleDeleteClick(this._cardData, this._card);
    });

    this._likePic.addEventListener('click', () => {
      if (this._likePic.classList.contains("element__like-button_active")) {
        this._handleDeleteLike();
        this._removeLike();
      } else {
        this._handleLikeClick();
        this._isLiked();
      }
    })

  }

  /*_handleLikeButton() {
    this._card
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_active");
  }*/

  _isLiked() {
    this._likePic.classList.add("element__like-button_active");
  }

  _removeLike() {
    this._likePic.classList.remove("element__like-button_active");
  }

  _removeItem() {
    this._card.closest(".element").remove();
    this._card = null;
  }

  _isNotMyCard() {
    if (this._idOwner !== this._userId) {
      this._trash.remove();
    }
  }

  myCardLike(like) {
    if (like) {
      this._isLiked();
    }
  }

  defineMyLike() {
    return Boolean(this.likeId.find((obj => obj._id == this._userId)));
  }

  _handleLikeClick() {
    this._api
      .addLike(this._id)
      .then((res) => {
        this._likes = res.likes.length;
        this._likeCounter.textContent = this._likes;
      })
  }

  _handleDeleteLike() {
    this._api
      .deleteLike(this._id)
      .then((res) => {
        this._likes = res.likes.length;
        this._likeCounter.textContent = this._likes;
      })
  }
}

