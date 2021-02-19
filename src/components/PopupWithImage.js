import Popup from './Popup.js';

export default class PopupwithImage extends Popup {
    constructor(popupSelect) {
        super(popupSelect);
        this._image = this._popup.querySelector('.popup-image__pic');
        this._cardName = this._popup.querySelector('.popup-image__caption');
    }

    open(data) {
    super.open()
    this._image.alt = data.name;
    this._image.src = data.link;
    this._cardName.textContent = data.name;
    }
}