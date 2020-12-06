# render-vue-component
npm package for mounting Vue SFC as root component and pass arguments as props in Ruby on Ralis.
This package should work with gem [render_vue_component](https://github.com/kevinluo201/render_vue_component)
So please check that gem.

# Installation
`npm install render-vue-component`<br>
or<br>
`yarn add render-vue-component`

# Usage
## .setVue(vue)
`render-vue-component` import Vue inside the package, but setup Vue outside and then pass to the package is more flexible.

## .getVue()
get Vue currently setup in `render-vue-component`

## .register()
use register() to register components. 
```javascript
import RenderVueComponent from "render-vue-component"
import ComponentA from "../components/ComponentA.vue"
import ComponentB from "../components/ComponentB.vue"
import ComponentX from "../components/ComponentX.vue"

RenderVueComponent.register({
  ComponentA,
  ComponentB,
  ...
})
```

## .renderComponentsOnRails()
By calling this method, it will search all ".vue-component" nodes, and use their data-name, data-rails-data to decide the Vue component to mount, and the props data for it.
