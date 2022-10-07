<template>
<div id="userblog">
    <div class="scbk">
        <div class="jbxx-top">
            <div class="jbxx-top-l">收藏的博客
              <span>(2)</span>
            </div>
        </div>
        <ul class="cjgd-bot">
            <li>
                <div class="gdurl"></div>
                    <div class="gdname">
                        <div class="top">哪里都是你哪里都是你哪里都是你哪里都是你</div>
                        <div class="bot">
                            <div class="left">
                                <i class="iconfont icon-xiangyousanjiaoxing"></i>
                                <span>21万</span>
                            </div>
                            <div class="mid">
                                <i class="iconfont icon-xitongtuisong"></i>
                                <span>34</span>
                            </div>
                            <div class="right">by Ako_Sera</div>
                        </div>
                </div>
            </li>
            <li>
                <div class="gdurl"></div>
                    <div class="gdname">
                        <div class="top">哪里都是你哪里都是你哪里都是你哪里都是你</div>
                        <div class="bot">
                            <div class="left">
                                <i class="iconfont icon-xiangyousanjiaoxing"></i>
                                <span>21万</span>
                            </div>
                            <div class="mid">
                                <i class="iconfont icon-xitongtuisong"></i>
                                <span>34</span>
                            </div>
                            <div class="right">by Ako_Sera</div>
                        </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    name:'userblog',
    setup(props) {
        return{

        }
    }
}
</script>

<style lang="less" scoped>
#userblog{
    width: 100%;
    height: 10rem;
    margin-top: 0.3rem;
    padding: 0 0.2rem;
    .scbk{
        margin-bottom: 0.3rem;
        width: 100%;
        border-radius: 0.2rem;
        background-color: #fff;
        .jbxx-top{
            padding: 0.3rem 0.3rem 0 0.3rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .yyqd-top-r{
                font-size: 0.1rem;
                color: rgb(153, 153, 153);
            }
            .jbxx-top-l{
                font-size: 0.4rem;
                span{
                font-size: 0.1rem;
                }
            }
            .icon-yonghu2{
                color: rgb(190, 190, 190);
            }
            .jbxx-top-r{
                padding: 0.05rem 0.2rem;
                border: 1px solid rgb(190, 190, 190);
                border-radius: 0.3rem;
                font-size: 0.1rem;
                i{
                margin-right: 0.05rem;
                }
            }
        }
        .cjgd-bot{
        padding: 0.3rem;
        width: 100%;
        // height: 3.2rem;
        li{
            margin-bottom: 0.15rem;
            display: flex;
            align-items: center;
            width: 100%;
            height: 1rem;
            .gdurl{
            margin-right: 0.2rem;
            width: 1rem;
            height: 1rem;
            border-radius: 0.2rem;
            border: 1px solid #000;
            }
            .gdname{
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .top{
                    font-size: 0.35rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .bot{
                    color: rgb(164, 164, 164);
                    font-size: 0.25rem;
                    display: flex;
                    align-items: center;
                    .mid{
                        margin: 0 0.2rem;
                    }
                }
            }
        }
        }
    }
}
</style>