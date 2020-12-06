import Vue from "vue"

let settings = {
  vue: Vue,
}

export default {
  setVue(vue) {
    settings.vue = vue
  },
  getVue(fn = (vue) => { vue }) {
    fn(settings.vue)
    return settings.vue
  },
  register(componentsObjects) {
    const vue = this.getVue()
    for (const [name, component] of Object.entries(componentsObjects)) {
      vue.component(name, component)
    }
  },
  renderComponentsOnRails(params = {}) {
    const vue = this.getVue()

    document.querySelectorAll(".vue-component").forEach((element) => {
      let railsProps = { props: JSON.parse(element.dataset.railsData) }
      const componentName = element.dataset.name
      const component = vue.component(componentName)

      new vue({
        el: element,
        render: h => h(component, Object.assign(railsProps, params))
      }).$mount()
    })
  },
}
