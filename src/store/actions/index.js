let actions = {
  save_activeLi (context, activeLi) {
    return new Promise((resolve) => {
      context.commit('update_activeLi', activeLi)
      resolve()
    })
  },
}

export default actions
