import {defineStore} from 'pinia'

export const useIndexStore = defineStore('index', {
    state: () => {
        return {
            modal: false
        }
    },
    getters: {
        times2: (state) => state.numero * 2,
    },
    actions: {
        increment(val = 1) { this.numero += val },
        cambiar() {
            this.modal = true
        }
    }
})
