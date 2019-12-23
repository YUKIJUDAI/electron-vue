<template>
    <div class="video-center">
        <div class="video-modle">
            <div class="title">补单技巧</div>
            <ul class="list">
                <li>
                    <iframe class="video" src="http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=0134fd748a4ea791f602974921853add&tvId=9749815600&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%" frameborder="0" allowfullscreen="true" width="100%" height="100%"></iframe>
                    <p class="tit">庆余年第一级</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/commom.less");

.video-center {
    margin-top: 15px;
    padding: 0 20px;
    .video-modle {
        .title {
            height: 17px;
            font-size: 18px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
        }
        li {
            .fl;
            width: 190px;
            margin-right: 16px;
        }
        .video {
            width: 190px;
            height: 100px;
            margin: 20px 0 10px 0;
            border-radius:4px; 
        }
        .tit {
            font-size: 14px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
</style>