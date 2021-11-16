<template>
    <a-modal @cancel="close('argsModal')" @ok="close('argsModal')"
             :destroyOnClose="true" :maskClosable="false"
             :visible="true"
             :okText="'确认'" :cancelText="'取消'"
             :title="title"
    >
        <a-row>
            <a-button v-if="example" @click="example = !example">查看例子二</a-button>
            <a-button v-if="!example" @click="example = !example">查看例子一</a-button>
        </a-row>
        <template v-if="example">
            <pre><code class="Html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-args:foo.a.b</span>=<span class="hljs-string">"message"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></code></pre>
            <pre><code class="JavaScript">
const args = {
    bind: <span class="hljs-built_in">function</span>(el, binding, vNode) {
        let s = JSON.stringify
        el.innerHTML =
            <span class="hljs-string">'name: '</span>       + <span class="hljs-built_in">s</span>(binding.name) + <span class="hljs-string">'&lt;br&gt;'</span> +
            <span class="hljs-string">'value: '</span>      + <span class="hljs-built_in">s</span>(binding.value) + <span class="hljs-string">'&lt;br&gt;'</span> +
            <span class="hljs-string">'expression: '</span> + <span class="hljs-built_in">s</span>(binding.expression) + <span class="hljs-string">'&lt;br&gt;'</span> +
            <span class="hljs-string">'argument: '</span>   + <span class="hljs-built_in">s</span>(binding.arg) + <span class="hljs-string">'&lt;br&gt;'</span> +
            <span class="hljs-string">'modifiers: '</span>  + <span class="hljs-built_in">s</span>(binding.modifiers) + <span class="hljs-string">'&lt;br&gt;'</span> +
            <span class="hljs-string">'vNode keys: '</span> + Object.<span class="hljs-built_in">keys</span>(vNode).<span class="hljs-built_in">join</span>(<span class="hljs-string">', '</span>)
    }
}</code></pre>
            <label>
                <p><span v-args:foo.a.b="message"/></p>
            </label>
        </template>
        <template v-if="!example">
            <pre><code class="Html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-repeat</span>=<span class="hljs-string">"5"</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
            <pre><code class="JavaScript"><span class="hljs-comment">// 元素重复显示</span>
<span class="hljs-keyword">const</span> repeat = {
    <span class="hljs-attr">bind</span>: <span class="hljs-keyword">function</span>(<span class="hljs-params">el, binding, vNode</span>) {
        <span class="hljs-keyword">let</span> div = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">'div'</span>)
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; binding.<span class="hljs-property">value</span>; i++) {
            <span class="hljs-keyword">let</span> ch = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(vNode.<span class="hljs-property">tag</span>)
            ch.<span class="hljs-property">innerHTML</span> = vNode.<span class="hljs-property">children</span>[<span class="hljs-number">0</span>].<span class="hljs-property">text</span>
            div.<span class="hljs-title function_">append</span>(ch)
        }
        div.<span class="hljs-property">innerHTML</span> = <span class="hljs-string">`&lt;div&gt;<span class="hljs-subst">${div.innerHTML}</span>&lt;/div&gt;`</span>
        el.<span class="hljs-property">innerHTML</span> = div.<span class="hljs-property">innerHTML</span>
    }
}</code></pre>
            <label>
                <p v-repeat="5">Hello World!</p>
            </label>
        </template>
    </a-modal>
</template>

<!--suppress HtmlUnknownAttribute -->
<script>
import DIRECTIVES from "@/subfield/directive/index"
export default {
    props: {
        visible: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: '默认标题'
        }
    },
    data() {
        return {
            message: 'Hello World！',
            example: true,
        }
    },
    mounted() {
    },
    methods: {
        open(modal) {
            this.$emit('open', modal)
        },
        close(modal) {
            this.$emit('close', modal)
        },
    },
    directives: DIRECTIVES
}
</script>
