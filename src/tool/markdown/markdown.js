import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

// noinspection JSUnusedLocalSymbols
const markdown = {
    install: function(Vue, option) {
        Vue.component(MarkdownItVue.name, MarkdownItVue)
    }
}
export default markdown
