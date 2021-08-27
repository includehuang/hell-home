// noinspection SpellCheckingInspection
/**
 "off" or 0 - 关闭规则
 "warn" or 1 - 将规则视为一个警告（不会影响退出码）
 "error" or 2 - 将规则视为一个错误 (退出码为1)
 */
module.exports = {
    // 保证最大作用域在当前文件夹
    root: true,
    // 解析配置
    parserOptions: {
        // 解析器，如果使用ts，则需要使用@typescript-eslint/parser
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    // 全局环境
    env: {
        browser: true,
        node: true,
        es6: true
    },
    // 继承已经封装好的eslint模块
    extends: ['eslint:recommended'],
    // it is base on https://github.com/vuejs/eslint-config-vue
    rules: {
        /*
          使用let 或 const而不是var
          ❌ var a = 1
          ✅
            const a = 1
            let b = 1
        */
        'no-var': 2,
        /*
          强制 getter 和 setter 在对象中成对出现
          ❌ const a = { get value() { return 123 } }
          ✅ const a = { get value() { return 123 }, set value(v) { console.log(v) } }
        */
        'accessor-pairs': ["error", {"getWithoutSet": true}],
        /*
          禁止在循环中出现await
          ❌
            async function foo(things) {
              const results = []
              for (const thing of things) {
                results.push(await bar(thing))
              }
              return baz(results)
            }
          ✅
            async function foo(things) {
              const results = []
              for (const thing of things) {
                results.push(bar(thing))
              }
              return baz(await Promise.all(results))
            }
        */
        'no-await-in-loop': 2,
        /*
          强制箭头函数的箭头前后使用一致的空格
          ❌ ()=>{}
          ✅ () => {}
        */
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        /*
          禁止或强制在代码块中开括号前和闭括号后有空格:"always"(more) 要求使用一个或多个空格
          ❌ function fn() {return true}
          ✅ function fn() { return true }
        */
        'block-spacing': [2, 'always'],
        /*
          强制在代码块中使用一致的大括号风格:1tbs大括号放在控制语句或声明语句同一行的位置
          ❌
            if (foo)
            {
              bar()
            }
          ✅
            if (foo) {
              bar()
            }
        */
        'brace-style': [
            2,
            '1tbs',
            {
                /*
                  "allowSingleLine": true(默认false) 允许块的开括号和闭括号在同一行
                  ✅ if (foo) { bar() }
                */
                allowSingleLine: true
            }
        ],
        /*
          强制使用骆驼拼写法命名约定
        */
        camelcase: [
            2,
            {
                properties: 'always',
                ignoreDestructuring: true
            }
        ],
        /*
          要求或禁止末尾逗号
          ❌
            const a = {
              b: 1,
            }
          ✅
            const a = {
              b: 1
            }
        */
        'comma-dangle': [2, 'never'],
        /*
          强制在逗号前后使用一致的空格
          ❌ const arr = [1 , 2]
          ✅ const arr = [1, 2]
        */
        'comma-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        /* 强制使用一致的逗号风格:"last"(默认) 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
        * */
        'comma-style': [2, 'last'],
        /*
          要求在构造函数中有 super() 的调用
          ❌
            class Animal {
              constructor() {}
            }
          ✅
            class Animal {
              constructor() {
                super()
              }
            }
        */
        'constructor-super': 2,
        /*
          强制所有控制语句使用一致的括号风格: 'multi-line' 允许在单行中省略大括号
          ❌
            if (foo)
              doSomething()
          ✅
            if (foo) doSomeThing()
        */
        curly: [2, 'multi-line'],
        /*
          强制在点号之前和之后一致的换行:  'property' 表达式中的点号操作符应该和属性在同一行
          ❌
            obj.
              a
          ✅
            obj
              .a
        */
        'dot-location': [2, 'property'],
        /*
          要求或禁止文件末尾存在空行: "always"(默认) 强制使用换行 (LF)
          ❌ demo.js
            1. const a = 123
            2. console.log(a)
          ✅ demo.js
            1. const a = 123
            2. console.log(a)
            3.
        */
        'eol-last': ["error", "always"],
        /*
          要求使用 === 和 !==
          ❌ a == b
          ✅ a === b
        */
        eqeqeq: ['error', 'always', {null: 'ignore'}],
        /*
          强制 generator 函数中 * 号周围使用一致的空格
          ❌
            function *generator() {
              yield *other()
            }
          ✅
            function* generator() {
              yield* other()
            }
        */
        'generator-star-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        /* 要求回调函数中有容错处理（@description 只用于Node或CommonJs）
         */
        'handle-callback-err': [2, '^(e|E)(rr|rror)$'],
        /*
          强制使用一致的缩进: "SwitchCase"(默认：0) 强制switch语句中的case子句的缩进级别
          ❌
            function fn() {
                console.log(123)
            }
          ✅
            function fn() {
              console.log(123)
            }
        */
        indent: [
            2,
            4,
            {
                SwitchCase: 1
            }
        ],
        /*
          强制在 JSX 属性中一致地使用单引号
          ❌ <div className="wrapper" />
          ✅ <div className='wrapper' />
        */
        'jsx-quotes': [2, 'prefer-single'],
        /*
          强制在对象字面量的属性中键和值之间使用一致的间距
          ❌
            const obj = {
              a : 1
            }
          ✅
            const obj = {
              a: 1
            }
        */
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        /*
          强制在关键字前后使用一致的空格
          ❌ if(true) {}
          ✅ if (true) {}
        */
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        /*
          要求构造函数首字母大写
          ❌ function person() {}
          ✅ function Person() {}
        */
        'new-cap': [
            2,
            {
                /*
                  "newIsCap": true (默认) 要求调用 new 操作符时有首字母大写的函数。
                  ❌ new person()
                  ✅ new Person()
                */
                newIsCap: true,
                /*
                  "capIsNew": false 允许调用首字母大写的函数时没有 new 操作符。
                  ✅ Person.name
                */
                capIsNew: false
            }
        ],
        /*
          强制或禁止调用无参构造函数时有圆括号
          ❌ const person = new Person
          ✅ const person = new Person()
        */
        'new-parens': 2,
        /*
          禁用 Array 构造函数
          ❌ new Array(0, 1, 2)
          ✅ new Array(someOtherArray.length)
        */
        'no-array-constructor': 2,
        /* 禁用 arguments.caller 或 arguments.callee
         */
        'no-caller': 2,
        /*
          禁用 console
          ❌ console.log(xxx)
        */
        'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
        /*
          禁止修改类声明的变量
          ❌
            class A {}
            A = 123
          ✅
            let A = class {}
            A = 123
        */
        'no-class-assign': 2,
        /*
          禁止条件表达式中出现赋值操作符
          ❌ if (x = 0) {}
          ✅
            let x
            if (x === 0) {}
        */
        'no-cond-assign': 2,
        /*
          禁止修改 const 声明的变量
          ❌
            const a = 123
            a = 456
          ✅
            const a = 123
            const b = 456
        */
        'no-const-assign': 2,
        /* 禁止在正则表达式中使用控制字符
        https://baike.baidu.com/item/%E6%8E%A7%E5%88%B6%E5%AD%97%E7%AC%A6
         */
        'no-control-regex': 2,
        /*
          禁止删除变量
          ❌
            var a
            delete a
        */
        'no-delete-var': 2,
        /*
          禁止 function 定义中出现重名参数
          ❌ function fn(a, b, a) {}
          ✅ function fn(a, b, c) {}
        */
        'no-dupe-args': 2,
        /*
          禁止类成员中出现重复的名称
          ❌
            class Foo {
              bar() {}
              bar() {}
            }
          ✅
            class Foo {
              foo() {}
              bar() {}
            }
        */
        'no-dupe-class-members': 2,
        /*
          禁止对象字面量中出现重复的 key
          ❌
            const obj = {
              a: 1,
              a: 2
            }
          ✅
            const obj = {
              a: 1,
              b: 2
            }
        */
        'no-dupe-keys': 2,
        /*
          禁止出现重复的 case 标签
          ❌
            switch(a) {
              case 1:
                xxx
                break
              case 1;
                xxx
                break
            }
          ✅
            switch(a) {
              case 1:
                xxx
                break
              case 2:
                xxx
                break
            }
        */
        'no-duplicate-case': 2,
        /*
          禁止在正则表达式中使用空字符集
          ❌ /^abc[]/.test("test")
          ✅ /^abc[a-z]/.test("test")
        */
        'no-empty-character-class': 2,
        /*
          禁止使用空解构模式
          ❌ const { obj: {} } = data
          ✅ const { obj: { name } } = data
        */
        'no-empty-pattern': 2,
        /*
          禁用 eval()
          ❌ eval('(' + '{"a": 1}' + ')')
          ✅ JSON.parse('{"a": 1}')
        */
        'no-eval': 2,
        /*
          禁止对 catch 子句的参数重新赋值
          ❌
            try {

            } catch (e) {
              e = 123
            }
          ✅
            try {

            } catch (e) {
              const a = 123
            }
        */
        'no-ex-assign': 2,
        /*
          禁止扩展原生类型
          ❌ Object.prototype.a = 123
        */
        'no-extend-native': 2,
        /*
          禁止不必要的 .bind() 调用
          ❌
            var x = function() {
              foo()
            }.bind(bar)
          ✅
            var x = function () {
              this.foo()
            }.bind(bar)
        */
        'no-extra-bind': 2,
        /*
          禁止不必要的布尔转换
          ❌ if (!!foo) {}
          ✅ if (foo) {}
        */
        'no-extra-boolean-cast': 2,
        /*
          禁止不必要的括号
          ❌ const y = (function () { return 1 })
          ✅ (a * b) + c
        */
        'no-extra-parens': [2, 'functions'],
        /*
          禁止 case 语句落空
          ❌
            switch(a) {
              case 1:
                console.log(a)
              case 2:
                xxx
            }
          ✅
            switch(a) {
              case 1:
                console.log(a)
                break
              case 2:
                xxx
                break
            }
        */
        'no-fallthrough': 2,
        /*
          禁止数字字面量中使用前导和末尾小数点
          ❌ const num = .5
          ✅ const num = 0.5
        */
        'no-floating-decimal': 2,
        /*
          禁止对 function 声明重新赋值
          ❌
            function fn() {}
            fn = 123
          ✅
            function fn() {}
            let num = 123
        */
        'no-func-assign': 2,
        /*
          禁止使用类似 eval() 的方法
          ❌ setTimeout("alert('Hi!')", 100)
          ✅ setTimeout(() => alert('Hi!'), 100)
        */
        'no-implied-eval': 2,
        /*
          禁止在嵌套的块中出现变量声明或 function 声明
          ❌
            if (foo) {
              function fn() {}
            }
          ✅
            let fn
            if (foo) {
              fn = function() {}
            }
        */
        'no-inner-declarations': [2, 'functions'],
        /*
          禁止 RegExp 构造函数中存在无效的正则表达式字符串
          ❌ new RegExp('[')
          ✅ new RegExp('\\[')
        */
        'no-invalid-regexp': 2,
        /*
          禁止不规则的空白
          ❌ function fn(   ) {}
          ✅ function fn() {}
        */
        'no-irregular-whitespace': 2,
        /* 禁用 __iterator__ 属性
         */
        'no-iterator': 2,
        /* 不允许标签与变量同名
         */
        'no-label-var': 2,
        /*
          禁用不必要的嵌套块
          ❌
            function fn() {
              {
                bar()
              }
            }
          ✅
            function fn() {
              bar()
            }
        */
        'no-lone-blocks': 2,
        /* 禁止空格和 tab 的混合缩进
         */
        'no-mixed-spaces-and-tabs': 2,
        /*
          禁止使用多个空格
          ❌ const a =   1
          ✅ const a = 1
        */
        'no-multi-spaces': 2,
        /*
          禁止使用多行字符串
          ❌
            const x = "Line 1 \
              Line 2"
          ✅
            const x = "Line 1\n" +
              "Line 2"
        */
        'no-multi-str': 2,
        /*
          禁止出现多行空行，空行最多一行
          ❌ demo.js
            1. const a = 123
            2.
            3.
            4. console.log(a)
          ✅ demo.js
            1. const a = 123
            2.
            3. console.log(a)
            4.
        */
        'no-multiple-empty-lines': [
            2,
            {
                max: 1
            }
        ],
        /*
          不允许重新分配原生对象
          ❌ window = {}
        */
        'no-native-reassign': 2,
        /*
          不允许对表达式中的左操作数求反
          ❌ if (!key in object) {}
          ✅ if (!(key in object)) {}
        */
        'no-negated-in-lhs': 2,
        /*
          禁用 Object 的构造函数
          ❌ const obj = new Object()
          ✅ const obj = {}
        */
        'no-new-object': 2,
        /*
          禁止调用 require 时使用 new 操作符
          ❌ const a = new require('a')
          ✅
            const A = require('a')
            const a = new A()
        */
        'no-new-require': 2,
        /*
          禁止 Symbol 操作符和 new 一起使用
          ❌ const foo = new Symbol('foo')
          ✅ const foo = Symbol('foo')
        */
        'no-new-symbol': 2,
        /*
          禁止对 String，Number 和 Boolean 使用 new 操作符
          ❌ const str = new Number('123')
          ✅ const str = Number(123)
        */
        'no-new-wrappers': 2,
        /*
          禁止把全局对象作为函数调用
          ❌ const json = JSON()
          ✅ const json = JSON.parse('{}')
        */
        'no-obj-calls': 2,
        /*
          禁用八进制字面量
          ❌ const num = 071
          ✅ const num = 56
        */
        'no-octal': 2,
        /*
          禁止在字符串中使用八进制转义序列
          ❌ const foo = 'Copyright \071'
        */
        'no-octal-escape': 2,
        /*
          禁止对 __dirname 和 __filename 进行字符串连接
          ❌ const fullPath = __dirname + '/1.js'
          ✅ const fullPath = path.resolve(__dirname, '1.js')
        */
        'no-path-concat': 2,
        /*
          禁用 __proto__ 属性
          ❌ const a = obj.__proto__
          ✅ const a = Object.getPrototypeOf(obj)
        */
        'no-proto': 2,
        /*
          禁止多次声明同一变量
          ❌
            var a = 3
            var a = 10
          ✅
            var a = 3
            a = 10
        */
        'no-redeclare': 2,
        /*
          禁止正则表达式字面量中出现多个未知数量的空格
          ❌ const reg = /foo   bar/
          ✅ const reg = /foo {3}bar/
        */
        'no-regex-spaces': 2,
        /*
          禁止在 return 语句中使用赋值语句: except-parens（默认）：禁止出现赋值语句，除非使用括号把它们括起来。
          ❌
            function fn() {
              return foo = bar + 2
            }
          ✅
            function fn() {
              return (foo = bar + 2)
            }
        */
        'no-return-assign': [2, 'except-parens'],
        /*
          禁止自我赋值
          ❌ a = a
          ✅ a = b
        */
        'no-self-assign': 2,
        /*
          禁止自身比较
          ❌ a === a
          ✅ a === b
        */
        'no-self-compare': 2,
        /*
          禁用逗号操作符
          ❌ const a = (3, 5) // a = 5
          ✅ const a = 5
        */
        'no-sequences': 2,
        /*
          禁止将标识符定义为受限的名字
          ❌ function NaN() {}
          ✅ function fn() {}
        */
        'no-shadow-restricted-names': 2,
        /*
          函数使用的时候不允许有空格
          ❌ fn ()
          ✅ fn()
        */
        'no-spaced-func': 2,
        /*
          禁用稀疏数组
          ❌ const items = ['red',, 'blue']
          ✅ const items = ['red', 'blue', ]
        */
        'no-sparse-arrays': 2,
        /*
          禁止在构造函数中，在调用 super() 之前使用 this 或 super
          ❌
            class Animal {
              constructor() {
                this.a = 1
                super()
              }
            }
          ✅
            class Animal {
              constructor() {
                super()
                this.a = 1
              }
            }
        */
        'no-this-before-super': 2,
        /*
          禁止抛出异常字面量
          ❌ throw 123
          ✅ throw new Error(123)
        */
        'no-throw-literal': 2,
        /* 禁用行尾空格
         */
        'no-trailing-spaces': 2,
        /*
          禁用未声明的变量，除非它们在 \/*global *\/ 注释中被提到
          ❌ a = 10
          ✅
            \/* global a:true *\/
            a = 10
        */
        'no-undef': 2,
        /*
          禁止将变量初始化为 undefined
          ❌ let a = undefined
          ✅ let a
        */
        'no-undef-init': 2,
        /*
          禁止出现令人困惑的多行表达式）
          ❌
            const hello = 'world'
            [1, 2, 3].forEach(addNumber)
          ✅
            const hello = 'world'
            ;[1, 2, 3].forEach(addNumber)
        */
        'no-unexpected-multiline': 2,
        /*
          禁用一成不变的循环条件
          ❌
            while (node) {
              doSomeThing(node)
            }
          ✅
            while (node) {
              doSomeThing(node)
              node = node.parent
            }
        */
        'no-unmodified-loop-condition': 2,
        /*
          禁止可以在有更简单的可替代的表达式时使用三元操作符
          ❌ const flag = a === 1 ? true : false
          ✅ const flag = a === 1
        */
        'no-unneeded-ternary': [
            2,
            {
                /*
                  禁止条件表达式作为默认的赋值模式
                  ❌ const a = x ? x : 1
                */
                defaultAssignment: false
            }
        ],
        /*
          禁止在 return、throw、continue 和 break 语句之后出现不可达代码
          ❌
            function fn() {
              return
              console.log(123)
            }
          ✅
            function fn() {
              console.log(123)
              return
            }
        */
        'no-unreachable': 2,
        /*
          禁止在 finally 语句块中出现控制流语句
          ❌
            try {
              return 1
            } catch (e) {
              return 2
            } finally {
              return 3
            }
          ✅
            try {
              return 1
            } catch (e) {
              return 2
            } finally {
              console.log(3)
            }
        */
        'no-unsafe-finally': 2,
        /*
          禁止出现未使用过的变量
          ❌ const a = 123
          ✅
            const a = 123
            console.log(a)
        */
        'no-unused-vars': [
            2,
            {
                vars: 'all', // 检测所有变量，包括全局环境中的变量。这是默认值
                args: 'none' // 不检查参数
            }
        ],
        /*
          禁止不必要的 .call() 和 .apply()
          ❌ foo.call(null, 123) // 等同于foo(123)
          ✅ foo.call(obj, 123)
        */
        'no-useless-call': 2,
        /*
          禁止在对象中使用不必要的计算属性
          ❌ const obj = { ['a']: 1 }
          ✅ const obj = { a: 1 }
        */
        'no-useless-computed-key': 2,
        /*
          禁用不必要的构造函数
          ❌
            class A {
              constructor() {}
            }
          ✅
            class A {}
        */
        'no-useless-constructor': 2,
        /*
          禁用不必要的转义字符
          ❌ "\'"
          ✅ "\""
        */
        'no-useless-escape': 2,
        /*
          禁止属性前有空白
          ❌
            foo. bar
            foo .bar
          ✅
            foo.bar
        */
        'no-whitespace-before-property': 2,
        /*
          禁用 with 语句
          ❌ with({}) {}
        */
        'no-with': 2,
        /* 强制函数中的变量要么一起声明要么分开声明
         */
        'one-var': [
            2,
            {
                /*
                  \/\/ 要求每个作用域的初始化的变量有多个变量声明
                  ❌
                    function fn() {
                      var foo = true,
                        bar = false
                    }
                  ✅
                    function fn() {
                      var foo = true
                      var bar = false
                      var a, b, c // 未初始化的变量可以这么声明
                    }
                */
                initialized: 'never'
            }
        ],
        /*
          强制操作符使用一致的换行符: "after" 要求把换行符放在操作符后面
          ❌
            const a = process ?
              2 :
              1
          ✅
            const a = process
              ? 2
              : 1
        */
        'operator-linebreak': [
            2,
            'after',
            {
                overrides: {
                    // 覆盖对指定的操作的全局设置
                    '?': 'before',
                    ':': 'before'
                }
            }
        ],
        /*
          禁止块内填充
          ❌
            if (a) {

              b()

            }
          ✅
            if (a) {
              b()
            }
        */
        'padded-blocks': [2, 'never'],
        /* 强制使用一致的反勾号、双引号或单引号: "single" 要求尽可能地使用单引号
         */
        quotes: [
            0,
            'single',
            {
                avoidEscape: true, // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
                allowTemplateLiterals: true // 允许字符串使用反勾号
            }
        ],
        /*
          语句拒绝分号结尾
          ❌ const a = 1;
          ✅ const a = 1
        */
        semi: [2, 'never'],
        /*
          分号前后空格
          ❌ for (let i = 0 ;i < 10 ;i++) {}
          ✅ for (let i = 0; i < 10; i++) {}
        */
        'semi-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        /* 强制在块之前使用一致的空格
         */
        'space-before-blocks': [2, 'always'],
        /*
          强制在 function的左括号之前使用一致的空格
          ❌ function fn () {}
          ✅ function fn() {}
        */
        'space-before-function-paren': [2, 'never'],
        /*
          强制在圆括号内使用一致的空格
          ❌ const foo = ( 1 + 2 ) * 3
          ✅ const foo = (1 + 2) * 3
        */
        'space-in-parens': [2, 'never'],
        /*
          要求操作符周围有空格
          ❌ const sum = 1+2
          ✅ const sum = 1 + 2
        */
        'space-infix-ops': 2,
        /*
          强制在一元操作符前后使用一致的空格
          ❌
            typeof!foo
            ++ foo
          ✅
            typeof foo
            ++foo
        */
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],
        /*
          强制在注释中 // 或 \/* 使用一致的空格: 如果是 "always"，// 或 \/* 必须跟随至少一个空白。
          ❌
            \/\/123
            \/*123*\/
          ✅
            \/\/ 123
            \/* 123 *\/
        */
        'spaced-comment': [
            2,
            'always',
            {
                // "markers"的值是一个字符串形式的数组，这些字符串也就是块级注释的标记，例如一个额外的，被用来表示是由 doxygen, vsdoc 等系统读取的文档，这些系统必须有额外的字符。 不管第一个参数是 "always" 还是 "never"、"markers"数组都会起作用。
                markers: [
                    'global',
                    'globals',
                    'eslint',
                    'eslint-disable',
                    '*package',
                    '!',
                    ','
                ]
            }
        ],
        /*
          要求或禁止模板字符串中的嵌入表达式周围空格的使用
          ❌ `hello ${ people.name }`
          ✅ `hello ${people.name}`
        */
        'template-curly-spacing': [2, 'never'],
        /*
          要求使用 isNaN() 检查 NaN
          ❌ if (foo == NaN) {}
          ✅ if (isNaN(foo)) {}
        */
        'use-isnan': 2,
        /*
          强制 typeof 表达式与有效的字符串进行比较（typeof出来的值是可以确保的，防止拼写错误）
          ❌ typeof foo === 'stirng' -> 错误的拼写
          ✅ typeof foo === 'string'
        */
        'valid-typeof': 2,
        /*
          要求 IIFE 使用括号括起来: "any"强制总是包裹，但允许其它风格。
          ❌ const a = function() {}()
          ✅
            const a = (function() {})()
            const b = (function() {}())
        */
        'wrap-iife': [2, 'any'],
        /*
          强制在 yield* 表达式中 * 周围使用空格
          ❌
            function *generator() {
              yield *other()
            }
          ✅
            function* generator() {
              yield* other()
            }
        */
        'yield-star-spacing': [2, 'after'],
        /*
          要求或禁止 “Yoda” 条件（它被叫做 Yoda 条件是因为它这样读：”红色是颜色”，类似于星球大战中 Yoda 的讲话方式）
          ❌ if ('red' === color) {}
          ✅ if (color === 'red') {}
        */
        yoda: [2, 'never'],
        /*
          要求使用 const 声明那些声明后不再被修改的变量
          ❌ let baseUrl = 'https://www.feihe.com'
          ✅ const baseUrl = 'https://www.feihe.com'
        */
        'prefer-const': 2,
        /* 禁用 debugger
         */
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        /*
          强制在大括号中使用一致的空格: "always"要求花括号内有空格 (除了{})
          ✅ const obj = { "foo": { "baz": 1, "bar": 2 }}
        */
        'object-curly-spacing': [
            2,
            'always',
            {
                // "objectsInObjects": false 禁止以对象元素开始或结尾的对象的花括号中有空格 (当第一个选项为 always 时生效)
                objectsInObjects: false
            }
        ],
        /*
          强制数组方括号中使用一致的空格
          ❌ const arr = [1, 2 ,3, 4 ,5]
          ✅ const arr = [1, 2, 3, 4, 5]
        */
        'array-bracket-spacing': [2, 'never']
    }
}
