<template>
<div class="chat-room">
    <div class="chat-box">
        <!-- 聊天盒子 -->
        <div class="chat-message">
            <!-- 消息展示 -->
            <div class="message-box" :class="{'is-me' : item.userName === userName}" v-for="item of messageList" :key="item.id">
                <!-- 区分是否本人消息 -->
                <div class="message">
                    <div class="name-time">
                        <span class="name">{{item.userName}}</span>
                        <span class="time">{{item.time}}</span>
                    </div>
                    <div class="info">{{item.message}}</div>
                </div>
            </div>
        </div>
        <!-- 发送 -->
        <div class="send-message">
            <textarea name="message" v-model="message"></textarea>
            <div class="send" @click="send">发送</div>
        </div>
    </div>
</div>
</template>

<script>
// 后端端口，也可以写成localhost
const ws = new WebSocket('ws://127.0.0.1:3000')
export default {
    name: "chatRoom",
    mounted() {
        // 进入判断是否有名字
        const name = localStorage.getItem('userName')
        if (!name) {
            this.$emit('pushRouter', 'login')
            return
        }
        this.userName = name
        // 注册socket的接收消息事件
        ws.addEventListener('message', this.handleMessage,false)
    },
    data() {
        return {
            userName: '',
            messageList: [],
            message: ''
        }
    },
    methods: {
        handleMessage(e) {
            this.messageList.push(JSON.parse(e.data))
        },
        // 发送事件
        send () {
            ws.send(JSON.stringify({
                userName: this.userName,
                time: new Date().getTime(),
                message: this.message
            }))
            this.message = ''
        }
    }
}
</script>

<style scoped lang="scss">
.chat-room {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .chat-box {
        width: 40%;
        height: 60%;
        margin-top: 100px;
        background: #FFFFFF;
        box-shadow: 0px 2px 20px 1px rgba(42, 42, 42, 0.07999999821186066);
        .chat-message {
            width: 100%;
            height: 70%;
            box-shadow: inset 0px -1px 0px 1px #EBEFF8;
            overflow: hidden;
            overflow-y: auto;
            .message-box {
                width: 100%;
                &.is-me {
                    display: flex;
                    flex-direction: row-reverse;
                    .message {
                        display: flex;
                        flex-direction: row-reverse;
                        flex-wrap: wrap;
                        .name-time {
                            text-align: right;
                        }
                        .info {
                            background: #DDEBFF;
                        }
                    }
                }
                .message {
                    width: 40%;
                    max-height: 100px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding: 20px 20px;
                    .name-time {
                        width: 100%;
                        font-size: 12px;
                        font-weight: 400;
                        color: #898E97;
                        text-align: left;
                        .name {
                            margin-right: 10px;
                        }
                    }
                    .info {
                        padding: 5px;
                        border-radius: 4px;
                        border: 1px solid #E4E7ED;
                    }
                }
            }
        }
        .send-message {
            width: 100%;
            height: 30%;
            position: relative;
            textarea {
                outline: none;
                border: none;
                width: 100%;
                height: 100%;
                resize: none;
                box-sizing: border-box;
                font-size: 20px;
            }
            .send {
                position: absolute;
                right: 10px;
                bottom: 10px;
                width: 68px;
                height: 36px;
                text-align: center;
                line-height: 36px;
                border-radius: 4px;
                background: rgba(24, 129, 225, 0.00009999999747378752);
                border: 1px solid #E4E7ED;
                font-size: 14px;
                font-weight: 500;
                color: #3F81FF;
                cursor: pointer;
            }
        }
    }
}
</style>