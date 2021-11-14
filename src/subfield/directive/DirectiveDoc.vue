<!-- eslint-disable -->
<template>
    <div id="DirectiveDoc">

        <div>
            <h1 >自定义指令</h1>
            <h2 >简介</h2>
            <p>&nbsp;</p>
            <p>除了核心功能默认内置的指令 (<code>v-model</code> 和 <code>v-show</code>)，Vue 也允许注册自定义指令。注意，在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。举个聚焦输入框的例子，如下：</p>
            <!--suppress HtmlFormInputWithoutLabel -->
            <input v-focus/>
            <p>当页面加载时，该元素将获得焦点 (注意：<code>autofocus</code> 在移动版 Safari 上不工作)。事实上，只要你在打开这个页面后还没点击过任何内容，这个输入框就应当还是处于聚焦状态。现在让我们用指令来实现这个功能：</p>
            <a-button size="small" @click="open('focusModal')">查看例子</a-button>
            <pre><code class="JavaScript"><span class="hljs-regexp">//</span> 注册一个全局自定义指令 `v-focus`
Vue.directive(<span class="hljs-string">'focus'</span>, {
  <span class="hljs-regexp">//</span> 当被绑定的元素插入到 DOM 中时……
  inserted: <span class="hljs-keyword">function</span> (el) {
    <span class="hljs-regexp">//</span> 聚焦元素
    el.focus()
  }
})</code></pre>
            <p>如果想注册局部指令，组件中也接受一个 <code>directives</code> 的选项：</p>
            <pre><code class="JavaScript"><span class="hljs-symbol">directives:</span> <span class="hljs-punctuation">{</span>
<span class="hljs-symbol">  focus:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-comment">// 指令的定义</span>
<span class="hljs-symbol">    inserted:</span> function (el) <span class="hljs-punctuation">{</span>
      el.focus()
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span></code></pre>
            <p>然后你可以在模板中任何元素上使用新的 <code>v-focus</code> property，如下：</p>
            <pre><code class="Html"><span class="hljs-section">&lt;input v-focus&gt;</span></code></pre>
            <h2 >钩子函数</h2>
            <a-button size="small" @click="open('testModal')">查看钩子函数例子</a-button>
            <p>一个指令定义对象可以提供如下几个钩子函数 (均为可选)：</p>
            <ul>
                <li><code class="Bash"><span class="hljs-built_in">bind</span></code>：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。</li>
                <li><code class="Bash"><span class="hljs-built_in">inserted</span></code>：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。</li>
                <li><code class="Bash"><span class="hljs-built_in">update</span></code>：所在组件的 VNode 更新时调用，<strong>但是可能发生在其子 VNode 更新之前</strong>。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。</li>

            </ul>
            <p>我们会在稍后讨论渲染函数时介绍更多 VNodes 的细节。</p>
            <ul>
                <li><code class="Bash"><span class="hljs-built_in">componentUpdated</span></code>：指令所在组件的 VNode <strong>及其子 VNode</strong> 全部更新后调用。</li>
                <li><code class="Bash"><span class="hljs-built_in">unbind</span></code>：只调用一次，指令与元素解绑时调用。</li>

            </ul>
            <p>接下来我们来看一下钩子函数的参数 (即 <code class="Bash"><span class="hljs-built_in">el</span></code>、<code class="Bash"><span class="hljs-built_in">binding</span></code>、<code class="Bash"><span class="hljs-built_in">vnode</span></code> 和 <code class="Bash"><span class="hljs-built_in">oldVnode</span></code>)。</p>
            <h2 >钩子函数参数</h2>
            <p>指令钩子函数会被传入以下参数：</p>
            <ul>
                <li><p><code class="Bash"><span class="hljs-built_in">el</span></code>：指令所绑定的元素，可以用来直接操作 DOM。</p>
                </li>
                <li><code class="Bash"><span class="hljs-built_in">bind</span></code>
                    <p>：一个对象，包含以下 property：</p>
                    <ul>
                        <li><code class="Bash"><span class="hljs-built_in">name</span></code>：指令名，不包括 <code>v-</code> 前缀。</li>
                        <li><code class="Bash"><span class="hljs-built_in">value</span></code>：指令的绑定值，例如：<code>v-my-directive=&quot;1 + 1&quot;</code> 中，绑定值为 <code>2</code>。</li>
                        <li><code class="Bash"><span class="hljs-built_in">oldValue</span></code>：指令绑定的前一个值，仅在 <code>update</code> 和 <code>componentUpdated</code> 钩子中可用。无论值是否改变都可用。</li>
                        <li><code class="Bash"><span class="hljs-built_in">expression</span></code>：字符串形式的指令表达式。例如 <code>v-my-directive=&quot;1 + 1&quot;</code> 中，表达式为 <code>&quot;1 + 1&quot;</code>。</li>
                        <li><code class="Bash"><span class="hljs-built_in">arg</span></code>：传给指令的参数，可选。例如 <code>v-my-directive:foo</code> 中，参数为 <code>&quot;foo&quot;</code>。</li>
                        <li><code class="Bash"><span class="hljs-built_in">modifiers</span></code>：一个包含修饰符的对象。例如：<code>v-my-directive.foo.bar</code> 中，修饰符对象为 <code>{ foo: true, bar: true }</code>。</li>

                    </ul>
                </li>
                <li><p><code class="Bash"><span class="hljs-built_in">vnode</span></code>：Vue 编译生成的虚拟节点。移步 <a href='https://cn.vuejs.org/v2/api/#VNode-接口'>VNode API</a> 来了解更多详情。</p>
                </li>
                <li><p><code class="Bash"><span class="hljs-built_in">oldVnode</span></code>：上一个虚拟节点，仅在 <code class="Bash"><span class="hljs-built_in">update</span></code> 和 <code class="Bash"><span class="hljs-built_in">componentUpdated</span></code> 钩子中可用。</p>
                </li>

            </ul>
            <p>除了 <code class="Bash"><span class="hljs-built_in">el</span></code> 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 <a href='https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset'><code>dataset</code></a> 来进行。</p>
            <a-button size="small" @click="open('argsModal')">查看钩子参数例子</a-button>
            <p>这是一个使用了这些 property 的自定义钩子样例：</p>
            <pre><code class="JavaScript">&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"hook-arguments-example"</span> v-demo:foo<span class="hljs-selector-class">.a</span>.b=<span class="hljs-string">"message"</span>&gt;&lt;/div&gt;
Vue<span class="hljs-selector-class">.directive</span>(<span class="hljs-string">'demo'</span>, {
  bind: function (el, binding, vnode) {
    <span class="hljs-selector-tag">var</span> s = JSON<span class="hljs-selector-class">.stringify</span>
    el<span class="hljs-selector-class">.innerHTML</span> =
      <span class="hljs-string">'name: '</span>       + s(binding.name) + <span class="hljs-string">'&lt;br&gt;'</span> +
      <span class="hljs-string">'value: '</span>      + s(binding.value) + <span class="hljs-string">'&lt;br&gt;'</span> +
      <span class="hljs-string">'expression: '</span> + s(binding.expression) + <span class="hljs-string">'&lt;br&gt;'</span> +
      <span class="hljs-string">'argument: '</span>   + s(binding.arg) + <span class="hljs-string">'&lt;br&gt;'</span> +
      <span class="hljs-string">'modifiers: '</span>  + s(binding.modifiers) + <span class="hljs-string">'&lt;br&gt;'</span> +
      <span class="hljs-string">'vnode keys: '</span> + Object<span class="hljs-selector-class">.keys</span>(vnode)<span class="hljs-selector-class">.join</span>(<span class="hljs-string">', '</span>)
  }
})

new Vue({
  el: <span class="hljs-string">'#hook-arguments-example'</span>,
  data: {
    message: <span class="hljs-string">'hello!'</span>
  }
})</code></pre>
            <pre><code class="Bash"><span class="hljs-symbol">name:</span> <span class="hljs-string">"demo"</span>
<span class="hljs-symbol">value:</span> <span class="hljs-string">"hello!"</span>
<span class="hljs-symbol">expression:</span> <span class="hljs-string">"message"</span>
<span class="hljs-symbol">argument:</span> <span class="hljs-string">"foo"</span>
<span class="hljs-symbol">modifiers:</span> {<span class="hljs-string">"a"</span>:true,<span class="hljs-string">"b"</span>:true}
vnode keys: tag, data, children, text, elm, ns, context, fnContext, fnOptions, fnScopeId, key, componentOptions, componentInstance, parent, raw, isStatic, isRootInsert, isComment, isCloned, isOnce, asyncFactory, asyncMeta, isAsyncPlaceholder</code></pre>
            <h3 >动态指令参数</h3>
            <p>指令的参数可以是动态的。例如，在 <code class="Bash"><span class="hljs-built_in">v-mydirective:[argument]=&quot;value&quot;</span></code> 中，<code class="Bash"><span class="hljs-built_in">argument</span></code> 参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用。</p>
            <p>例如你想要创建一个自定义指令，用来通过固定布局将元素固定在页面上。我们可以像这样创建一个通过指令值来更新竖直位置像素值的自定义指令：</p>
            <pre><code class="JavaScript">&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"baseexample"</span>&gt;
  &lt;p&gt;Scroll down the page&lt;/p&gt;
  &lt;<span class="hljs-selector-tag">p</span> v-pin=<span class="hljs-string">"200"</span>&gt;Stick me <span class="hljs-number">200px</span> from the <span class="hljs-attribute">top</span> of the page&lt;/p&gt;
&lt;/div&gt;
Vue<span class="hljs-selector-class">.directive</span>(<span class="hljs-string">'pin'</span>, {
  bind: function (el, binding, vnode) {
    el<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.position</span> = <span class="hljs-string">'fixed'</span>
    el<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.top</span> = binding<span class="hljs-selector-class">.value</span> + <span class="hljs-string">'px'</span>
  }
})

new Vue({
  el: <span class="hljs-string">'#baseexample'</span>
})</code></pre>
            <p>这会把该元素固定在距离页面顶部 200 像素的位置。但如果场景是我们需要把元素固定在左侧而不是顶部又该怎么办呢？这时使用动态参数就可以非常方便地根据每个组件实例来进行更新。</p>
            <pre><code class="JavaScript">&lt;div id=<span class="hljs-string">"dynamicexample"</span>&gt;
  <span class="hljs-symbol">&lt;h3&gt;</span>Scroll down inside this section ↓&lt;/h3&gt;
  &lt;<span class="hljs-keyword">p</span> v-pin:[direction]=<span class="hljs-string">"200"</span>&gt;I <span class="hljs-keyword">am</span> pinned onto the page at <span class="hljs-number">200</span>px <span class="hljs-keyword">to</span> the <span class="hljs-keyword">left</span>.&lt;/<span class="hljs-keyword">p</span>&gt;
&lt;/div&gt;
Vue.directive(<span class="hljs-string">'pin'</span>, {
  bind: <span class="hljs-keyword">function</span> (<span class="hljs-keyword">el</span>, binding, vnode) {
    <span class="hljs-keyword">el</span>.style.position = <span class="hljs-string">'fixed'</span>
    var s = (binding.arg == <span class="hljs-string">'left'</span> ? <span class="hljs-string">'left'</span> : <span class="hljs-string">'top'</span>)
    <span class="hljs-keyword">el</span>.style[s] = binding.value + <span class="hljs-string">'px'</span>
  }
})

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">el</span>: <span class="hljs-string">'#dynamicexample'</span>,
  data: <span class="hljs-keyword">function</span> () {
    <span class="hljs-keyword">return</span> {
      direction: <span class="hljs-string">'left'</span>
    }
  }
})</code></pre>
            <p>结果：</p>
            <iframe height="200" class="demo" scrolling="no" title="Dynamic Directive Arguments" src="https://codepen.io/team/Vue/embed/rgLLzb/?height=300&amp;theme-id=32763&amp;default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen
                    style="border: 1px solid rgb(238, 238, 238); border-radius: 2px; padding: 25px 35px; margin: 1em 0 10px; user-select: none; overflow-x: auto; color: rgb(48, 68, 85); font-family: Source Sans Pro, Helvetica Neue, Arial, sans-serif;
                     font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0; text-transform: none; white-space: normal; widows: 2; word-spacing: 0; -webkit-text-stroke-width: 0;
                      background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; width: 700px;"></iframe>
            <p>&nbsp;</p>
            <a-button size="small" @click="open('changeModal')">查看更多例子</a-button>
            <p>这样这个自定义指令现在的灵活性就足以支持一些不同的用例了。</p>
            <h2 >函数简写</h2>
            <p>在很多时候，你可能想在 <code class="Bash"><span class="hljs-built_in">bind</span></code> 和 <code class="Bash"><span class="hljs-built_in">update</span></code> 时触发相同行为，而不关心其它的钩子。比如这样写：</p>
            <pre><code class="JavaScript">Vue<span class="hljs-selector-class">.directive</span>(<span class="hljs-string">'color-swatch'</span>, function (el, binding) {
  el<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.backgroundColor</span> = binding<span class="hljs-selector-class">.value</span>
})</code></pre>
            <h2 >对象字面量</h2>
            <p>如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。</p>
            <pre><code class="JavaScript">&lt;<span class="hljs-selector-tag">div</span> v-demo=<span class="hljs-string">"{ color: 'white', text: 'hello!' }"</span>&gt;&lt;/div&gt;
Vue<span class="hljs-selector-class">.directive</span>(<span class="hljs-string">'demo'</span>, function (el, binding) {
  console<span class="hljs-selector-class">.log</span>(binding<span class="hljs-selector-class">.value</span>.<span class="hljs-attribute">color</span>) // =&gt; <span class="hljs-string">"white"</span>
  console<span class="hljs-selector-class">.log</span>(binding<span class="hljs-selector-class">.value</span>.text)  <span class="hljs-comment">// =&gt; "hello!"</span>
})</code></pre>
            <h2 >更多例子</h2>
            <a-button size="small" @click="open('moreModal')">查看更多例子</a-button>
            <h2>总结</h2>
            <h3>1. 自定义指令用法</h3>
            <ul>
                <li>多个元素需要执行相同的操作时</li>
                <li>封装方法与操作，方便在各处复用</li>
                <li>简化复杂操作</li>
            </ul>
            <h3>2. 指令优点</h3>
            <ul>
                <li>可复用性强，使用灵活。全局指令只需要在任意位置定义一次就能全局生效，也可以定义局部指令，在指定范围使用</li>
                <li>简化代码。例如v-for指令，如果不使用指令，那每次需要循环元素时都需要写一大堆内容</li>
                <li>提高可读性与可维护性。使用指令后的代码量比较小而且清晰，比直接阅读代码会轻松很多，并且维护时在自定义内部维护即可</li>
            </ul>
        </div>
    </div>
</template>

<script>
import DIRECTIVES from "@/subfield/directive/index"
export default {
    name: "DirectiveDoc",
    props: {},
    data() {
        return {}
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

<style lang="less">
.ant-btn {
    margin: 5px;
}
</style>
