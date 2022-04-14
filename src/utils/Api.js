const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = `Bearer ${token}`;
  }

  getPostsList(page=1, limit=100) {
    return fetch(`${this._baseUrl}/posts/paginate?page=${page}&limit=${limit}`, {
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  changeAvatar(av) {   
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
     body: JSON.stringify(av),
    }).then(onResponce);
  }

  changeLikeStatus(postID, isLike) {
    return fetch(`${this._baseUrl}/posts/likes/${postID}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  deletePost(postID) {
    const approve = confirm("Are you sure?");
    if (approve) {
      return fetch(`${this._baseUrl}/posts/${postID}`, {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }).then(onResponce);
    }
  }

  getPostById(postID) {
    return fetch(`${this._baseUrl}/posts/${postID}`, {
      headers: {
        authorization: this._token,
      },
    }).then(onResponce);
  }

  addPost( values) {
    return fetch(`${this._baseUrl}/posts`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(onResponce);
  }

  editPostById(postID, values) {   
    return fetch(`${this._baseUrl}/posts/${postID}`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(onResponce);
  }

}
const config = {
  baseUrl: "https://api.react-learning.ru",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiYTUiLCJpYXQiOjE2NDcwMTM4ODUsImV4cCI6MTY3ODU0OTg4NX0.r_ULyI2G0frciXKpPVObTSAeAzIe7AAA-yUzT2LXqXM",
};
const api = new Api(config);
export default api;
