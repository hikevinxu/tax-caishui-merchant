let getters = {
  getActiveLi: state => {
    return state.activeLi
  },
  getCompanyInfo: state => {
    return JSON.parse(localStorage.getItem("companyInfo"))
  }
}

export default getters
