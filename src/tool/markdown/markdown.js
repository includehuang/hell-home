import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

/**
 * 安装Markdown插件
 * @type {{install: markdown.install}}
 */

// noinspection JSUnusedLocalSymbols
const markdown = {
    install: function(Vue, option) {
        Vue.component(MarkdownItVue.name, MarkdownItVue)
    }
}
export default markdown
