export default class UserInfo {
    constructor({ userNameSelector, userOccupationSelector, userAvatarSelector }) {
        this._profileName = document.querySelector(`${userNameSelector}`);
        this._profileOccupation = document.querySelector(`${userOccupationSelector}`);
        this._avatarElement = document.querySelector(`${userAvatarSelector}`);

    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileOccupation.textContent
        }
    }

    updateUserInfo() {
        this._profileName.textContent = this._name;
        this._profileOccupation.textContent = this._about;
        this._avatarElement.src = this._avatar;
    }

    setUserInfo(name, about, avatar, _id) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._id = _id;

    }
}