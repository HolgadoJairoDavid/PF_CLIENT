<script setup>

  import { useAccessStore } from '@/stores/userStore'
  import { inject, onMounted, onUpdated, ref } from 'vue';
  import { watch } from 'vue';
  import socket from "./../lib/socket";

  // const user = useSelector(store => store.user)
  /*  useEffect(() => {
    console.log(user)
   },[user]) */
  // const [message, setMessage] = useState('')
  /* const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext) */
  // const messageEndRef = useRef(null)
  /* useEffect(() => {
    scrollToBottom()
  },[messages]) */

  const store = useAccessStore()
  const scrollPix = ref(0)
  const message = ref('') // necesita el v-model
  const div = ref('')
  const { 
    // socket,
    currentRoom,
    setMessages,
    messages,
    privateMemberMsg,
  } = inject('chat-context')
  const newMessage = ref(false)
  
  const messageEndRef = ref(null) // necesita ref="input" en el elemento
  const scroll = ref(null)
  watch(currentRoom, () => {
    scrollToBottom()
  })

  watch(store.user.newMessages,()=>{
    if(store.user.newMessages[currentRoom.value]){
      newMessage.value = true
    }
  })

  const getFormatedDate = () => {
    const date = new Date()
    let year = date.getFullYear()
    let month = (1+date.getMonth()).toString()
    month = month.length > 1 ? month : '0' + month
    let day = date.getDate().toString()
    day = day.length > 1 ? day : '0' + day;
    return `${month}/${day}/${year}`
  }


  const scrollToBottom = () => {
    newMessage.value = false
    store.user.newMessages[currentRoom.value] = 0
    messageEndRef.value?.scrollIntoView({behavior: 'smooth', block: 'end' })
  }

  

  
  const todayDate = getFormatedDate()
  
  const localMessages = ref({})



  socket.off('room-messages').on('room-messages', (roomMessages) => {
    localMessages.value = roomMessages
    if(roomMessages.room === currentRoom.value) {
      setMessages(roomMessages)
    }

  })


  const handleScroll = ()=>{
    if(scroll.value.scrollTop>scrollPix.value){
      newMessage.value = false
      scrollPix.value = scroll.value.scrollTop
    }
  }

  onMounted(() => {
    setTimeout(()=>{
      messageEndRef.value.scrollIntoView({behavior: 'smooth', block: 'end' })
    }, 500)
    setMessages(localMessages.value)
    scrollPix.value = scroll.value.scrollTop
  })


  const setMessage = () => {
    message.value = ''
  }

  const handleSubmit = () => {
    if(!message.value) return
    
    const today = new Date()
    
    const minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
    
    const time = today.getHours() + ':' + minutes
    
    const roomId = currentRoom.value
    
    socket.emit('message-room', roomId, message.value, store.user, time, todayDate)
    
    setMessage()

    setTimeout(()=>{
      messageEndRef.value.scrollIntoView({behavior: 'smooth', block: 'end' })
    },500) 
    
  }

</script>

<template>
  <div class='messages-output' @scroll="handleScroll" ref="scroll">


        <!-- { 
          user && !privateMemberMsg?._id 
          &&  <div className='alert alert-info'>
                <span>
                  Yuo are in the <b>{currentRoom}</b> room
                </span>
              </div>
        } -->

        <!-- {
          !user 
          &&  <div className='alert alert-danger'>
                Please login
              </div>
        } -->

        <div class="chatbox"  ref="messageEndRef" v-if="store.user">
        
          <div  v-for="message in messages.messages">
            <p class="fecha">{{ message._id }}</p>

            <div v-for="msg in message.messagesByDate">
              <div 
              :class="[msg.from.email === store.user.email ? 'me' : 'others']"
              >                
              
              <p class="name"> 
                {{ msg.from._id === store.user._id ? '' : msg.from.name }}
              </p>
                <div class="message-inner ">
                  <div> <!-- Debe ser flex -->

                  </div>
                  <p class="message-content text-justify">{{ msg.content }}</p>
                  <div>
                    <p class="time">{{ msg.time }} ✔</p>
                  </div>
                </div>
              </div>
              <div :class="[msg.from.email === store.user.email ? 'triangulo' : 'triangle']"></div>
            </div>
          </div>
          <div class="messageEnd" ></div>
        </div> 
        
        <!-- {
          user && messages.map(({_id: date, messagesByDate}, idx) => {
            return (
              <div key={idx}>
                <p className='alert alert-info text-center message-date-indicator'>
                  {date}
                </p>
                {
                  messagesByDate?.map(({content, time, from: sender}, idx) => {
                    return (
                      <div className={sender?.email === user?.email ? 'message' : 'incoming-message'} key={idx}>
                        <div className='message-inner'>
                          <div className='d-flex align-items-center mb-3'>
                            {/* Aquí va la img */}
                            <p className='message-sender'>{sender._id === user?._id ? 'You' : sender.name}</p>
                          </div> 
                          <p className='message-content'>{content}</p>
                          <p className='message-timestamp-left'>{time}</p>
                        </div>
                      </div>
                  )
                }) 
              }
            </div>
            )
        })}
        <div ref={messageEndRef}></div>
      </div>
        -->
        
        <!-- :disabled="[!store.user]" -->
        <div class="boxInput" >
          <button class="bajar" v-if="newMessage" @click="scrollToBottom">{{ store.user.newMessages[currentRoom] }}  🔽</button>
          <form @submit.prevent="handleSubmit" class="flex flex-row  sticky bottom-0 w-full" >
            
            <input 
            class="text-white bg-black border border-yellow-400 m-2 w-3/4 pl-2 rounded-l-lg"
            type="text" 
            placeholder="Your message"
            v-model="message"
            >
            <button
            
            class="text-black m-2 p-2 bg-yellow-400 rounded-e-lg"
            @click.prevent="handleSubmit"
            
                type="submit"
                >
                Send
              </button>
            </form>
            
        </div>

      <!-- <form onSubmit={handleSubmit}>

        <Row>
          <Col md={10}>
            <Form.Group>
              <Form.Control type='text' placeholder='your message' disabled={!user} value={message} onChange={e => setMessage(e.target.value)}></Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button 
              disabled={!user}
              variant='primary' 
              type='submit' 
              style={{width: '100%', backgroundColor: 'orange'}}
            >
              Send
            </Button>
          </Col>
        </Row>

      </form>  -->
  </div>
</template>


<style scoped>

.messages-output {
  min-height: 100%;
  overflow-y: scroll;
  width: 350px;
  height: 70vh;
}

.messageEnd {
  height: 50px;
}

.triangulo {
    margin-left: 305px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid #F2E500;
  }


  .triangle {
    margin-left: 18px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid #EDEDED;
  }

  .fecha{
    margin-top: 10px;
    margin-bottom: 10px;
    color: #111827;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 100%;
    background-color: #F2E500;
  }
.message{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 30px;
  background-color: #F2E500;
}

.name{
  font-size: 13px;
}

.boxInput{
  width: 100%;
  bottom: 0;
  position: absolute;
}


.bajar{
  color: white;
  z-index: 10;
  width: 30px;
  height: 30px;
  margin-left: 300px;
  margin-bottom: 20px;
  background-color: red;
  border-radius: 50%;
}
.me{
  color: #111827;
  font-size: 16px;
  padding: 2px;
  height: auto;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  margin-top: 10px;
  margin-left: 35px;
  width: 300px;
  background-color: #F2E500;
  border: none;
}

.others{
  color: #111827;
  padding: 2px;
  height: auto;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  margin-top: 10px;
  margin-left: 10px;
  width: 300px;
  background-color: #EDEDED;
  border: none;
}

.chatbox{
  border-radius: 15px 15px 0px 15px;
  background-color: #111827;
}

.time{
  margin-left: 240px;
  font-size: 12px;
  margin-bottom: 3px;
}

</style>