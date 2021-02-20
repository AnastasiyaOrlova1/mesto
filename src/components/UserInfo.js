export default class UserInfo {
    constructor({ userNameSelector, userOccupationSelector }) {
        this._userName = userNameSelector;
        this._userOccupation = userOccupationSelector;
        this._profileName = document.querySelector(this._userName);
        this._profileOccupation = document.querySelector(this._userOccupation);
    }
    getUserInfo() {
        return {
            userName: this._profileName.textContent,
            aboutMe: this._profileOccupation.textContent
        }
    }
    setUserInfo = (newUserName, newUserOccupation) => {
        this._profileName.textContent = newUserName;
        this._profileOccupation.textContent = newUserOccupation;
    };
}
