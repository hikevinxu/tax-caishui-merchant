let actions = {
  save_activeLi (context, activeLi) {
    return new Promise((resolve) => {
      context.commit('update_activeLi', activeLi)
      resolve()
    })
  },
  save_companyInfo (context, companyInfo) {
    return new Promise((resolve) => {
      context.commit('update_companyInfo', companyInfo)
      resolve()
    })
  }
}

export default actions
