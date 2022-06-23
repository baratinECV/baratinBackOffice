import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state () {
    return {
      shop: {}
    }
  },
  getters: {
    getShop (state) {
      return state.shop
    }
  },
  mutations: {
    setShop (state, shop) {
      state.shop = shop
    }
  },
  actions: {
    async setShop (context) {
      await axios
        .get('shops/' + process.env.VUE_APP_SHOP)
        .then((response) => {
          context.commit('setShop', response.data)
        })
    }
  },
  modules: {
  }
})
