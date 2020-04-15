<template>
    <div class="dataCollection">
        <div class="search-form">
            <el-input size="small" style="width:450px"></el-input>
            <el-button type="primary" style="margin-left:20px">开始采集</el-button>
        </div>
        <div class="data-form">
            <el-table border>
                <el-table-column label="商品信息">
                    <template slot-scope="scope">
                        <div class="goods-info">
                            <div class="goods-info-left">
                                <img src="" alt="">
                            </div>
                            <div class="goods-info-right">
                                <p class="p1">亿健旗舰款室内春秋复古...<span>复制标题</span></p>
                                <p class="p2"><span>复制宝贝链接</span></p>
                                <p class="p3">天猫 ID：606517465529</p>
                                <p class="p4">自然宝宝旗舰店</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="总评数"></el-table-column>
                <el-table-column label="好评"></el-table-column>
                <el-table-column label="中评"></el-table-column>
                <el-table-column label="差评"></el-table-column>
                <el-table-column label="图片"></el-table-column>
                <el-table-column label="视频"></el-table-column>
                <el-table-column label="问大家"></el-table-column>
                <el-table-column label="视频+主图">
                    <template slot-scope="scope">
                        <span>下载</span>
                    </template>
                </el-table-column>
                <el-table-column label="评论+买家秀">
                    <template slot-scope="scope">
                        <span>查看</span>
                    </template>
                </el-table-column>
                <el-table-column label="问大家">
                    <template slot-scope="scope">
                        <span>查看</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span>删除</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.dataCollection {
    .search-form {
        margin-top: 15px;
    }
    .data-form {
        margin-top: 20px;
    }
}
</style>