import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", {
  state: () => {
    return {
      ingresoMov: false,
      paramAux: false,
      mantBancos: false,
      ubiDoc: false,
      inconCompr: false,
      libDiario: false,
      balanComp: false,
      cuentCobrar: false,
      regisCobran: false,
      tipCambio: false,
      libReten: false,
      daot: false,
      mantCliProv: false,
      comprasOblig: false,
      movimientos: false,
      consulSunat: false,
      formCompObliga: {
        titulo: "",
        mes: "",
        ano: "",
        grupAux: "",
      },
      formVentas: {
        titulo: "",
        mes: "",
        ano: "",
        grupAux: "",
      },
      formLogin: {
        email: "hector@gmail.com",
        password: "123",
      },
      token: false,
      regPlani: false,
      regPlani2: false,
      regCajBancos: false,
    };
  },
  getters: {},
  actions: {
    cambiarIngresoMov() {
      this.ingresoMov = true;
    },
    cambiarParamAux() {
      this.paramAux = true;
    },
    cambiarMantBancos() {
      this.mantBancos = true;
    },
    cambiarInconCompr() {
      this.inconCompr = true;
    },
    cambiarLibDiario() {
      this.libDiario = true;
    },
    cambiarBalanComp() {
      this.balanComp = true;
    },
    cambiarCuentCobrar() {
      this.cuentCobrar = true;
    },
    cambiarRegisCobran() {
      this.regisCobran = true;
    },
    cambiarTipCambio() {
      this.tipCambio = true;
    },
    cambiarLibReten() {
      this.libReten = true;
    },
    cambiarDaot() {
      this.daot = true;
    },
    cambiarMantCliProv() {
      this.mantCliProv = true;
    },
    cambiarComprasOblig() {
      this.comprasOblig = true;
    },
    cambiarMovimientos() {
      this.movimientos = true;
    },
    cambiarConsulSunat() {
      this.consulSunat = true;
    },
    cambiarRegPlani2() {
      this.regPlani2 = true
    }
  },
});
