<template>
    <div id="test-markdown" contenteditable="true">
        <div ref="box">
            <markdown-it-vue :content="content"/>
        </div>
        <a-input type="textarea" @click="add" v-model="content" :auto-size="{ minRows: 2, maxRows: 666 }"></a-input>
<!--        </div>-->
    </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import Vue from "vue"
export default {
    name: "Markdown",
    components: {MarkdownItVue},
    data() {
        return {
            showMark: true,
            content:
            `
> 争做国内使用体验Z好的开源 Web 富文本编辑器！
# 为何选择 wangEditor
简洁、轻量级、文档齐全
# 初见
\`\`\`
npm 安装 npm i wangeditor --save ，几行代码即可创建一个编辑器。

import E from 'wangeditor'
const editor = new E('#div1')
editor.create()
\`\`\`
更多使用配置，请阅读使用文档。

            `
        }
    },
    watch: {
        content() {
            console.log()
        }
    },
    methods: {
        add() {
            const cmp = new (Vue.extend(MarkdownItVue))({propsData: {content: this.content}}).$mount().$el
            this.$refs.box.append(cmp)
        }
    }
}
</script>

<style lang="less">

#test-markdown {
    min-height: 300px;

    #edit {
        min-height: 300px;
        border: #42b983;
    }
}

</style>
