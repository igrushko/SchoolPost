const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = `Bearer ${token}`;
  }

  getPostsList() {
    return fetch(`${this._baseUrl}/posts`, {
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
}
const config = {
  baseUrl: "https://api.react-learning.ru",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiYTUiLCJpYXQiOjE2NDcwMTM4ODUsImV4cCI6MTY3ODU0OTg4NX0.r_ULyI2G0frciXKpPVObTSAeAzIe7AAA-yUzT2LXqXM",
};
const api = new Api(config);
export default api;
