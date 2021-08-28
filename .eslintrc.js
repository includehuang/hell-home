// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ['plugin:vue/essential'],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        /* 禁用 debugger
         */
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        /*
          禁用 console
          ❌ console.log(xxx)
        */
        'no-console': process.env.NODE_ENV === 'production' ? 1 : 1,
        /*
          使用let 或 const而不是var
          ❌ var a = 1
          ✅
            const a = 1
            let b = 1
        */
        'no-var': 1,
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
        'block-spacing': [1, 'never'],
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
            1,
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
        /*
          强制在点号之前和之后一致的换行:  'property'表达式中的点号操作符应该和属性在同一行
          ❌
            obj.
              a
          ✅
            obj
              .a
        */
        'dot-location': [1, 'property'],
        /*
          要求使用 === 和 !==
          ❌ a == b
          ✅ a === b
        */
        'eqeqeq': ['error', 'always', {null: 'ignore'}],
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
        'indent': [
            2,
            4,
            {
                SwitchCase: 1
            }
        ],
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
            1,
            {
                beforeColon: false,
                afterColon: true
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
          禁止修改 const 声明的变量
          ❌
            const a = 123
            a = 456
          ✅
            const a = 123
            const b = 456
        */
        'no-const-assign': 2,
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
          禁止数字字面量中使用前导和末尾小数点
          ❌ const num = .5
          ✅ const num = 0.5
        */
        'no-floating-decimal': 2,
        /*
          禁止不规则的空白
          ❌ function fn(   ) {}
          ✅ function fn() {}
        */
        'no-irregular-whitespace': 1,
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
                max: 3
            }
        ],
        /*
          禁用 Object 的构造函数
          ❌ const obj = new Object()
          ✅ const obj = {}
        */
        'no-new-object': 2,
        /*
          禁止对 String，Number 和 Boolean 使用 new 操作符
          ❌ const str = new Number('123')
          ✅ const str = Number(123)
        */
        'no-new-wrappers': 2,
        /*
          禁用八进制字面量
          ❌ const num = 071
          ✅ const num = 56
        */
        'no-octal': 2,
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
        /* 禁用行尾空格
         */
        'no-trailing-spaces': 1,
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
        'no-unreachable': 1,
        /*
          禁止出现未使用过的变量
          ❌ const a = 123
          ✅
            const a = 123
            console.log(a)
        */
        'no-unused-vars': [
            1,
            {
                vars: 'all', // 检测所有变量，包括全局环境中的变量。这是默认值
                args: 'none' // 不检查参数
            }
        ],
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
          强制在注释中 // 或 \/* 使用一致的空格: 如果是 "always"，// 或 \/* 必须跟随至少一个空白。
          ❌
            \/\/123
            \/*123*\/
          ✅
            \/\/ 123
            \/* 123 *\/
        */
        'spaced-comment': [
            1,
            'always',
            {
                // "markers"的值是一个字符串形式的数组，这些字符串也就是块级注释的标记，例如一个额外的，被用来表示是由 doxygen、vsdoc 等系统读取的文档，这些系统必须有额外的字符。 不管第一个参数是 "always" 还是 "never"、"markers"数组都会起作用。
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
          强制数组方括号中使用一致的空格
          ❌ const arr = [1, 2 ,3, 4 ,5]
          ✅ const arr = [1, 2, 3, 4, 5]
        */
        'array-bracket-spacing': [2, 'never']
    }
}
