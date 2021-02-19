export default class Popup {
    constructor(popupSelect) {
        this._popup = document.querySelector(popupSelect);
        this._closePopupButton = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this._popup.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (e) => {
            const visibledPopup = e.target;
            if (visibledPopup.classList.contains('popup_visible') || visibledPopup.classList.contains('popup__close-button')) {
                this.close();
            }
        })
    }
}