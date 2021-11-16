<template>
    <a-modal @cancel="close('changeModal')" @ok="close('changeModal')"
             :destroyOnClose="true" :maskClosable="false"
             :visible="true"
             :okText="'确认'" :cancelText="'取消'"
             :title="title"
    >
            <pre><code class="Html"><span class="hljs-tag">&lt;<span class="hljs-name">a-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"change"</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-change:</span>[<span class="hljs-attr">change</span>]=<span class="hljs-string">"message"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></code></pre>
        <pre><code class="JavaScript"><span class="hljs-keyword">const</span> change = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el, binding, vNode</span>) </span>{
    <span class="hljs-keyword">let</span> s = <span class="hljs-built_in">JSON</span>.stringify
    el.innerHTML =
        <span class="hljs-string">'argument: '</span>   + s(binding.arg)
}</code></pre>
        <a-input v-model="change"/>
        <label>
            <p><span v-change:[change]="message"/></p>
        </label>
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
            change: '默认值',
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
