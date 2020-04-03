<template>
    <div class="tutor-center">
        <div class="p-1">实战中走出来的导师满满都是干货</div>
        <div class="p-2">导师打造出的爆款商品和优质店铺共计1000+</div>
        <div class="navigation">
            <span v-for="(value,key,i) in mentorList" :key="i" :class="{'active':index === key}" @click="changeTab(key)">{{key}}</span>
        </div>
        <div class="swiper-container tutor-list" v-if="Object.keys(mentorList).length > 0" id="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,i) in mentorList[index]">
                    <img :src="item.mentor_photo">
                    <div class="tutor-msg">
                        <p class="tutor-title">{{item.mentor_name}}</p>
                        <p class="tutor-txt">{{item.mentor_desc}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default {
    data() {
        return {
            mentorList: {},
            index: "",
            swiper: ""
        }
    },
    created() {
        this.getMentorList();
    },
    methods: {
        // 获取导师
        async getMentorList() {
            var res = await this.$fetch.post("/ganhuo/getGanHuoMentorList");
            if (0 === res.code) {
                this.mentorList = res.data;
                this.index = Object.keys(res.data)[0];
                this.$nextTick(() => {
                    this.swiper = new Swiper("#swiper", { slidesPerView: 4, spaceBetween: 12 });
                })
            }
        },
        changeTab(key) {
            this.index = key;
            this.$nextTick(() => {
                this.swiper && this.swiper.update();
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");
.tutor-center {
    margin: 0 20px;
    .p-1 {
        font-size: 36px;
        margin-top: 40px;
        .tc;
    }
    .p-2 {
        font-size: 22px;
        color: #666;
        margin-top: 28px;
        .tc;
    }
    .navigation {
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #ebebeb;
        margin-top: 36px;
        span {
            padding: 12px;
            font-size: 16px;
            color: #333;
        }
        .active {
            border-bottom: 4px solid #ff6801;
        }
    }
    .tutor-list {
        margin-top: 26px;
        min-height: 350px;
        .swiper-slide {
            .rel;
            img {
                width: 100%;
                height: auto;
            }
            .tutor-msg {
                .abs;
                left: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                width: 100%;
                height: 30%;
                transition: all 0.25s ease-in;
                -webkit-transition: all 0.25s ease-in;
                font-size: 16px;
                color: #fff;
                &:hover {
                    height: 70%;
                }
            }
            .tutor-title {
                padding: 16px;
                padding-top: 24px;
            }
            .tutor-txt {
                padding: 0 16px;
            }
        }
    }
}
</style>