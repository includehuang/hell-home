import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

const markdown = {
    install: function(Vue, option) {
        Vue.component('markdown', MarkdownItVue)
    }
}
export default markdown
