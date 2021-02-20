export default class Validation {
  constructor(configValidation, formSelector) {
    this._config = configValidation;
    this._formElement = document.querySelector(formSelector);
    this._buttonSubmit = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showError(input) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  clearErrorInputs() {
    this._formElement
      .querySelectorAll(this._config.inputSelector)
      .forEach((elem) => {
        this._hideError(elem);
      });
  }

  setButtonState(isActive) {
    if (isActive) {
      this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
      this._buttonSubmit.disabled = false;
    } else {
      this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
      this._buttonSubmit.disabled = "disabled";
    }
  }

  _setEventListener() {
    this._formElement.addEventListener("input", (evt) => {
      const input = evt.target;
      this._checkInputValidity(input);
      this.setButtonState(this._formElement.checkValidity());
    });
  }

  enableValidation() {
    /*const forms = document.querySelectorAll(config.formSelector);
        forms.forEach(form => {*/
    this._setEventListener();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this.setButtonState(this._formElement.checkValidity());
    /* });*/
  }

  /*enableValidation(validationConfig);*/
}
