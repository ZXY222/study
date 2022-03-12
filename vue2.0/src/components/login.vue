<template>
    <div class="login">
        <div class="login-box">
            <input type="text" placeholder="请输入用户名" v-model="userName">
            <div class="submit" @click="submit">进入聊天室</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            userName: ''
        }
    },
    methods: {
        submit() {
            if (this.userName.length <= 0) {
                alert('输名字!!!')
                return
            }
            localStorage.setItem('userName', this.userName)
            this.$emit('pushRouter', 'chatRoom')
        }
    }
}
</script>

<style scoped lang="scss">
.login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .login-box {
        width: 200px;
        height: 200px;
        margin-top: 200px;
        background-color: salmon;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: baseline;
        input {
            width: 80%;
            height: 20px;
            outline: none;
        }
        .submit {
            width: 100px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
            background-color: cornflowerblue;
        }
    }
}
</style>