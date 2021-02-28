import Popup from './Popup';

export default class PopupDeleteRequest extends Popup {
    constructor(popupSelect,) {
        super(popupSelect);
        this._handleFormSubmit = null;
        this._form = this._popup.querySelector('.popup__container');

    }

    setActionSubmit(callback) {
        this._handleFormSubmit = callback;
    }


    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
            this.close();
        })
    }
    open(data) {
        super.open();
        this._data = data;
    }
}
