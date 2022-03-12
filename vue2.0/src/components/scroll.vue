<template>
<div class="scroll">
    <div>{{list.length}}</div>
    <div class="box" v-loadScroll="scroll">
        <div class="item" v-for="(item, index) of list" :key="index">
            {{item}}
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "scroll",
    directives: {
        loadScroll: {
            inserted: (el, binding)=> {
                el.addEventListener('scroll', ()=>{
                    const bottomScroll = el.scrollHeight - (el.scrollTop + el.clientHeight)
                    // console.log(bottomScroll, 'sssssssssss');
                    console.log(binding);
                    if (bottomScroll <= 50) {
                        binding.value()
                    }
                })
                // console.log(binding);
                // binding.value()
            }
        }
    },
    data() {
        return {
            list: [1,2,3,4,5,6,7,8,9, 10],
            p: {
                pageNum: 1,
                pageSize: 6,
                total: 54
            }
        }
    },
    methods: {
        scroll () {
            console.log('scroll');
            if (this.p.pageNum * this.p.pageSize >= this.p.total) {
                return
            }
            this.p.pageNum++
            for (let i = 0; i < 6; i++) {
                this.list.push(i * this.p.pageNum)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.scroll {
    width: 100%;
    height: 100%;
}
.box {
    width: 300px;
    height: 400px;
    border: 1px solid salmon;
    overflow: hidden;
    overflow-y: auto;
    .item {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        &:nth-of-type(odd) {
            background-color: aqua;
        }
    }
}
</style>