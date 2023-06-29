 import {defineStore} from 'pinia'

export const useIndexStore = defineStore('index', {
    state: () => {
        return {
            ingresoMov: false,
            paramAux: false,
            mantBancos: false,
            ubiDoc: false,
            inconCompr: false,
            libDiario: false,
            balanComp: false,
        }
    },
    getters: {
        times2: (state) => state.numero * 2
    },
    actions: {
        cambiarIngresoMov() {
            this.ingresoMov = true
        },
        cambiarParamAux() {
            this.paramAux = true
        },
        cambiarMantBancos() {
            this.mantBancos = true
        },
        cambiarInconCompr() {
            this.inconCompr = true
        },
        cambiarLibDiario() {
            this.libDiario = true
        },
        cambiarBalanComp() {
            this.balanComp = true
        },
    }
}) 
