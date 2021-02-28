export default class Api {
  constructor({ url, headers, groupId }) {
    this._url = url;
    this._headers = headers;
    this._groupId = groupId;
  }

  getAllInfo(){
    return Promise.all([this.getUserProfileInfo(), this.getCards()])
    } 
  
  getCards() {
    return fetch(`${this._url}${this._groupId}cards`, {
      headers: this._headers,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserProfileInfo() {
    return fetch(`${this._url}${this._groupId}users/me`, {
      headers: this._headers,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editUserProfile(data) {
    return fetch(`${this._url}${this._groupId}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addNewCard(cardElement) {
    return fetch(`${this._url}${this._groupId}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardElement.name,
        link: cardElement.link,
      }),
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(item) {
    return fetch(`${this._url}${this._groupId}cards/${item._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addLike(id) {
    return fetch(`${this._url}${this._groupId}cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}${this._groupId}cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateAvatar(link) {
    return fetch(`${this._url}${this._groupId}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.link,
      }),
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }


}

/*setUserProfileInfo({ name, about }data) {
    return fetch(`${this._url}/${this._groupId}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then (res => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка на сервере ${res.status}`)
    })
  }



}*/
