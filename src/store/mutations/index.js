let mutations = {
  update_activeLi(state, activeLi) {
    state.activeLi = activeLi
  },
  update_companyInfo(state, companyInfo) {
    state.companyInfo = companyInfo
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo))
  }
}

export default mutations
