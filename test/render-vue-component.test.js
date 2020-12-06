/**
 * @jest-environment jsdom
 */
import flushPromises from "flush-promises"
import Vue from "vue"

describe('RenderVueComponent', () => {
  let RenderVueComponent

  beforeEach(async () => {
    module = await import("../src/index")
    RenderVueComponent = module.default
    jest.resetModules()
  })

  describe('private settings Vue', () => {
    it('should set Vue to private settings.vue by setVue(vue)', () => {
      RenderVueComponent.setVue("test")
      expect(RenderVueComponent.getVue()).toBe("test")
    });

    it('should return settings.vue by getVue()', () => {
      expect(RenderVueComponent.getVue()).toEqual(Vue)
    });

    it('should accept function as parameter and can manipulate Vue inside the function', () => {
      RenderVueComponent.setVue({ a: 1 })
      RenderVueComponent.getVue((vue) => { vue.a = 2 })
      expect(RenderVueComponent.getVue().a).toBe(2)
    });
  });

  describe('register()', () => {
    it('should register the component by settings.Vue', () => {
      RenderVueComponent.setVue(Vue)
      RenderVueComponent.register({ 
        'BaseTag': 'BaseTagComponent',
        'BaseTag2': 'BaseTagComponent2',
      })
      expect(Vue.component).toHaveBeenCalledWith('BaseTag', 'BaseTagComponent')
      expect(Vue.component).toHaveBeenCalledWith('BaseTag2', 'BaseTagComponent2')

      Vue.component.mockReset()
    });
  });

  describe('renderComponentsOnRails()', () => {
    beforeEach(() => {
      Vue.component('BaseTag', {
        props: ['text'],
        template: '<div class="base-tag">{{ text }}</div>'
      })
      Vue.component('BaseButton', {
        props: ['text'],
        template: '<button class="base-button">{{ text }}</button>'
      })
      RenderVueComponent.setVue(Vue)

      document.body.innerHTML =
        '<div ' +
          'class="vue-component"' +
          'data-name="BaseTag" ' +
          'data-rails-data=\'{"text": "Test1"}\' ' +
        '></div>' +
        '<div ' +
          'class="vue-component" ' +
          'data-name="BaseButton" ' +
          'data-rails-data=\'{"text": "Test2"}\' ' +
        '></div>'
    })

    it('should mount Vue component specified by element data-name to .vue-component element', async () => {
      RenderVueComponent.renderComponentsOnRails()
      await flushPromises()
      expect(document.body).toMatchSnapshot()
    });
  });
});