import Vue from "vue"

let settings = {
  vue: Vue,
  useVuex: false,
  store: null,
}

export default {
  useVuex(store) {
    settings.useVuex = true
    settings.store = store
  },
  setVue(vue) {
    settings.vue = vue
  },
  getVue() {
    return settings.vue
  },
  register(componentsObjects) {
    const vue = this.getVue()
    for (const [name, component] of Object.entries(componentsObjects)) {
      vue.component(name, component)
    }
  },
  sourceParams() {
    let params = {}
    if(settings.useVuex) {
      params.store = settings.store
    }
    return params
  },
  renderComponent(element, componentName, params = {}) {
    const vue = this.getVue()
    const component = vue.component(componentName)
    new vue({
      el: element,
      render: h => h(component, params)
    }).$mount()
  },
  renderComponents(cssQuery = ".vue-component", parser = undefined) {
    document.querySelectorAll(cssQuery).forEach((element) => {
      const componentName = element.dataset.name

      let params
      switch(typeof parser) {
        case "object":
          params = parser
          break
        case "function":
          params = parser(element.dataset)
          break
        default:
          params = Object.assign({}, element.dataset)
      }
      this.renderComponent(element, componentName, Object.assign(params, this.sourceParams()))
    })
  },
  renderComponentsOnRails() {
    this.renderComponents(".vue-component", (data) => {
      return JSON.parse(data.railsData)
    })
  },
}
