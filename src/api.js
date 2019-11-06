const URL = 'http://jservice.io/api/'
const api = {
  getCategory: (id) => {
    if (!id) {
      throw new Error('no id supplied to getCategory')
    }
    return fetch(`${URL}category${id ? `?id=${id}&count=10` : ''}`, { mode: 'cors' })
      .then(res => res.json())
      .then(data => data)
  },
  getCategories: () => {
    // default to 5
    return fetch(URL + `categories?count=5`, { mode: 'cors' })
      .then(res => res.json())
      .then(data => data)
  }
}
window.api = api
export default api