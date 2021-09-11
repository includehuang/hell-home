<template>
    <div id="h-editor" :style="Object.assign(style, defaultStyle)">
        <div :id="id">
            <slot/>
        </div>
    </div>
</template>

<script>

import Editor from "wangeditor"

// 定义配置项的类型规范
// export type ConfigType = {
//     height: number
//     languageType: string[]
//     languageTab: string
//     menus: string[]
//     excludeMenus: string[]
//     fontNames: FontStyleType
//     lineHeights: string[]
//     showMenuTooltips: boolean
//     indentation: IndentationType
//     fontSizes: FontSizeConfType
//     colors: string[]
//     emotions: EmotionsType[]
//     zIndex: number
//     onchange: Function | null
//     onfocus: Function
//     onblur: Function
//     onchangeTimeout: number
//     pasteFilterStyle: boolean
//     pasteIgnoreImg: boolean
//     pasteTextHandle: Function
//     styleWithCSS: boolean
//     linkImgCallback: Function
//     onSelectionChange: Function
//
//     placeholder: string
//     zIndexFullScreen: number
//     showFullScreen: boolean
//     showLinkImg: boolean
//     showLinkImgAlt: boolean
//     showLinkImgHref: boolean
//     uploadImgAccept: string[]
//     uploadImgServer: string
//     uploadImgShowBase64: boolean
//     uploadImgMaxSize: number
//     uploadImgMaxLength: number
//     uploadFileName: string
//     uploadImgParams: DicType
//     uploadImgParamsWithUrl: boolean
//     uploadImgHeaders: DicType
//     uploadImgHooks: UploadImageHooksType
//     uploadImgTimeout: number
//     withCredentials: boolean
//     customUploadImg: Function | null
//     uploadImgFromMedia: Function | null
//     customAlert: Function
//
//     onCatalogChange: Function | null
//
//     lang: string
//     languages: typeof langConfig
//
//     linkCheck: Function
//     linkImgCheck: Function
//     compatibleMode: () => boolean
//     historyMaxSize: number
//
//     focus: boolean
//
//     onlineVideoCheck: Function
//     onlineVideoCallback: Function
//
//     showLinkVideo: Boolean
//     uploadVideoAccept: string[]
//     uploadVideoServer: string
//     uploadVideoMaxSize: number
//     uploadVideoName: string
//     uploadVideoParams: DicType
//     uploadVideoParamsWithUrl: boolean
//     uploadVideoHeaders: DicType
//     uploadVideoHooks: UploadVideoHooksType
//     uploadVideoTimeout: number
//     withVideoCredentials: boolean
//     customUploadVideo: Function | null
//     customInsertVideo: Function | null
//
//     menuTooltipPosition: tooltipPositionType
// }

// noinspection JSUnusedGlobalSymbols
export default {
    name: "HEditor",
    props: {
        id: {
            type: String,
            default: 'editor'
        },
        config: {
            type: Object,
            default: () => {
                return { }
            }
        },
        style: {
            type: Object,
            default: () => {
                return { }
            }
        },
        button: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            defaultConfig: {
                uploadImgShowBase64: true,
                height: 1001,
                zIndex: 0,
                focus: false
            },
            defaultStyle: {
                width: '100%'
            },
            editor: null,
        }
    },
    mounted() {
        this.editor = new Editor(`#${this.id}`)
        const config = Object.assign(this.defaultConfig, this.config)
        Object.assign(this.editor.config, config)
        this.editor.i18next = null
        this.editor.create()
        this.menusAppend(this.button)
    },
    methods: {
        setContent(value, type = 'html') {
            switch (type) {
                case "html": this.editor.txt.html(value); break
                case "json": this.editor.txt.setJSON(value); break
                case "text": this.editor.text(value); break
                default: this.editor.txt.html(value)
            }
        },
        getContent(type = 'html') {
            switch (type) {
                case "html": return this.editor.txt.html()
                case "json": return this.editor.txt.getJSON()
                case "text": return this.editor.txt.text()
                default: return this.editor.txt.html()
            }
        },
        appendContent(html) {
            this.editor.txt.append(html)
        },
        clearContent(html) {
            this.editor.txt.clear()
        },
        menusAppend(button) {
            if (!button) {
                return
            }
            const editorMenus = document.querySelector(`#${this.id}`).childNodes[0]
            const extraButton = document.createElement('div')
            extraButton.innerHTML = button
            editorMenus.append(extraButton.childNodes[0])
        }
    }
}
</script>

<style scoped>

</style>
