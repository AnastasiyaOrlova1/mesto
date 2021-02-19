export default class UserInfo {
    constructor({userNameSelector, userOccupationSelector}){
        this._profileInfo = document.querySelector('.profile__personal-info');
        this._userName = userNameSelector;
        this._userOccupation = userOccupationSelector;
        this._profileName = document.querySelector(this._userName);
        this._profileOccupation = document.querySelector(this._userOccupation);

    }
    getUserInfo(){
        const data = {};
        data.userName = this._profileName.textContent;
        data.aboutMe = this._profileOccupation.textContent;
        return {userName : data.userName, aboutMe: data.aboutMe};
    }
    setUserInfo = (newUserName, newUserOccupation) =>{
        this._profileName.textContent = newUserName;
        this._profileOccupation.textContent = newUserOccupation;
    }
}
