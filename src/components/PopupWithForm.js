import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelect, formSubmit }) {
        super(popupSelect);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector(".popup__form");
    }
    _getInputValues() {
        this._inputsList = this._form.querySelectorAll(".popup__form-field");
        this._formValue = {};
        this._inputsList.forEach((input) => {
            this._formValue[input.name] = input.value;
        });
        return this._formValue;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
            this.close();
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
}
