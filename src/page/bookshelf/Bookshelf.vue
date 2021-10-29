<template>
    <div id="bookshelf">

        <div class="content">
            <a-row :gutter="24">
                <a-col :span="24">
                    <a-card
                        class="book-card-list"
                        style=":margin-bottom 24px;"
                        :bordered="false"
                        :loading="false"
                        :title="$t('book.recommend.title')"
                    >
                        <template slot="extra">
                            <a>{{ $t('book.recommend.more') }}</a>
                        </template>
                        <template v-if="bookList.length">
                            <a-card-grid class="book-card-grid" :key="i" v-for="(item, i) in bookList">
                                <a-card :bordered="false" :body-style="{ padding: 0 }">
                                    <div class="book-wrapper">
                                        <div class="book-cover">
                                            <img :src="item.cover || dCover">
                                        </div>
                                        <div class="book-content">
                                            <p class="book-title">
                                                <a>{{ item.name }}</a>
                                            </p>
                                            <p class="book-description" :title="item.description">
                                                <span>{{ item.description }}</span>
                                            </p>
                                            <div class="book-meta">
                                                <a-row>
                                                    <a-col :span="8" :title="item.author">
                                                        {{ item.author }}
                                                    </a-col>
                                                    <a-col :span="16" :title="item.tag.join(' , ')" style="text-align: right">
                                                        <a-tag v-for="temp in item.tag" :key="temp">
                                                            {{ temp }}
                                                        </a-tag>
                                                    </a-col>
                                                </a-row>
                                            </div>
                                        </div>
                                    </div>
                                </a-card>
                            </a-card-grid>
                        </template>
                        <a-empty v-else/>
                    </a-card>
                </a-col>
            </a-row>
        </div>

    </div>
</template>

<script>
import Reader from "@/components/exhibition/Reader"

const bookList = [
    {
        id: 'vision$1',
        author: 'vision',
        name: '魔法师生存守则魔法师生存守则魔法师生存守则魔法师生存守则',
        cover: '',
        tag: ['魔法', '穿越'],
        description: '这是一本魔法书这是一本魔法书这是一本魔法书这是一本魔法书这是一本魔法书这是一本魔法书这是一本魔法书这是一本魔法书这是一本魔法书这是一本魔法书这是一本魔法书这是一本魔法书这是一本魔法书',
    },
    {
        id: 'vision$0',
        author: 'vision',
        name: '公告',
        cover: '',
        tag: ['魔法', '穿越', '公告', '啊这'],
        description: '这是一本魔法书',
    },
    {
        id: 'vision$2',
        author: 'vision',
        name: '测试',
        cover: '',
        tag: ['都市', '修仙'],
        description: '这是一本魔法书',
    },
    {
        id: 'vision$1',
        author: 'vision',
        name: '魔法师生存守则',
        cover: '',
        tag: ['都市修仙'],
        description: '这是一本魔法书',
    },
    {
        id: 'vision$0',
        author: 'vision',
        name: '公告',
        cover: '',
        tag: ['魔法'],
        description: '这是一本魔法书',
    },
    {
        id: 'vision$2',
        author: 'vision',
        name: '测试测试测试测试测试测试测试测试测试测试测试测试',
        cover: '',
        tag: ['魔法'],
        description: '这是一本魔法书',
    },
]

const projects = [
    {
        "id": 1,
        "cover": "https://img-static.mihoyo.com/mainPage/ys-logo.png",
        "title": "project.Teyvat",
        "description": "那是一种内在的东西， 他们到达不了，也无法触及的",
        "status": 1,
        "author": "科学搬砖组",
        "updatedTime": "2021-09-03 00:00:00",
        "route": "/Teyvat"
    },
    {
        "id": 2,
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
        "title": "project.TwoDimensions",
        "description": "希望是一个好东西，也许是最好的，好东西是不会消亡的",
        "status": 1,
        "author": "科学搬砖组",
        "updatedTime": "2021-09-04 00:00:00",
        "route": "/TwoDimensions"
    },
    {
        "id": 3,
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
        "title": "project.Eguo",
        "description": "城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",
        "status": 1,
        "author": "科学搬砖组",
        "updatedTime": "2021-09-05 00:00:00",
        "route": "/Eguo"
    },
    {
        "id": 4,
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",
        "title": "project.Front",
        "description": "那时候我只会想自己想要什么，从不想自己拥有什么",
        "status": 1,
        "author": "科学搬砖组",
        "updatedTime": "2021-09-06 00:00:00",
        "route": "/Front"
    },
    {
        "id": 5,
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",
        "title": "project.Study",
        "description": "凛冬将至",
        "status": 1,
        "author": "科学搬砖组",
        "updatedTime": "2021-09-07 00:00:00",
        "route": "/Study"
    },
    {
        "id": 6,
        "cover": "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png",
        "title": "project.Essay",
        "description": "生命就像一盒巧克力，结果往往出人意料",
        "status": 1,
        "author": "科学搬砖组",
        "updatedTime": "2021-09-08 00:00:00",
        "route": "/Essay"
    }
]

export default {
    name: "Bookshelf",
    components: {Reader},
    props: {},
    data() {
        return {
            bookList,
            projects,
            dCover: './static/img/book/d-cover.jfif',
        }
    },
    mounted() {
    },
    methods: {}
}
</script>

<style lang="less">

@import "../../assets/style/color";

#bookshelf {

    .content {
        width: 1200px;
        margin: 12px auto;

        .book-card-list {

            .ant-card-body {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                padding: 0.5em;

                .ant-card-grid {
                    width: min-content;
                    box-shadow: none;
                }

                .ant-card-grid-hoverable:hover {
                    position: relative;
                    z-index: 1;
                    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0 , 15%);
                    box-shadow: 0 2px 8px rgba(0, 0, 0 , 15%);
                }

                .book-card-grid.ant-card-grid.ant-card-grid-hoverable {
                    padding: 0;
                }
            }

            .book-wrapper {
                width: 288px;
                height: 96px;
                margin: 4px;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;

                .book-cover {
                    width: 72px;
                    height: 96px;
                    font-size: 0;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .book-content {
                    position: relative;
                    width: 208px;
                    height: 96px;
                    padding: 0 8px;

                    .book-title {
                        font-size: 1.15em;
                        font-weight: 500;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-bottom: 8px;

                        a {
                            text-decoration: none;
                            outline: 0;
                            transition: 0.3s;
                            color: #1a1a1a;

                            &:hover {
                                color: #ed4259;
                            }
                        }
                    }

                    .book-description {
                        text-indent: 2em;
                        max-height: 42px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-break: break-word;
                    }

                    .book-meta {
                        width: 192px;
                        position: absolute;
                        bottom: 0;

                        .ant-row {

                            .ant-col {
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>
