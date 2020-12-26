function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
}

function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(form, input, config) {
    if (input.validity.valid) {
        hideError(form, input, config);
    } else {
        showError(form, input, config);
    }
}

function setButtonState(button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = 'disabled';
    }
}

function setEventListener(form, config) {
    const submitButton = form.querySelector(config.submitButtonSelector);
    const inputList = form.querySelectorAll(config.inputSelector);
    inputList.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, input, config)
            setButtonState(submitButton, form.checkValidity(), config)
        })
    });
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config)

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config);
    })
}

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_invalid',
    inputErrorClass: 'popup__form-field_state_invalid',
    errorClass: 'popup__form-field-error'
};

enableValidation(validationConfig);

