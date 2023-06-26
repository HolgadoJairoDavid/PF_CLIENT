<script setup>

  import { useAccessStore } from '@/stores/userStore'
  import { inject, onMounted, ref } from 'vue';
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

  const message = ref('') // necesita el v-model

  const { 
    // socket,
    currentRoom,
    setMessages,
    messages,
    privateMemberMsg
  } = inject('chat-context')

  /* onMounted(() => {
    scrollToBottom()
  }) */

  const messageEndRef = ref(null) // necesita ref="input" en el elemento

  /* watch(currentRoom, () => {
    scrollToBottom()
  }) */

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
    messageEndRef.value?.scrollIntoView({behavior: 'smooth'})
  }

  
  const todayDate = getFormatedDate()
  
  const localMessages = ref({})

  socket.off('room-messages').on('room-messages', (roomMessages) => {

    localMessages.value = roomMessages

    if(roomMessages.room === currentRoom.value) {
      setMessages(roomMessages)
    }

  })

  onMounted(() => {
    setMessages(localMessages.value)
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
  }

</script>

<template>

  <div class='messages-output'>


        <div 
          v-if="store.user.name && !privateMemberMsg?._id"
          class="bg-cyan-400 p-2 mb-2"
        >
          <span>You are in the <b>{{ currentRoom }}</b> room</span>
        </div>
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

        <div v-if="store.user">
        
          <div v-for="message in messages.messages">
            <p class="bg-yellow-400 p-2 m-2 text-center border border-black rounded-lg">{{ message._id }}</p>

            <div v-for="msg in message.messagesByDate">
              <div 
                :class="[msg.from.email === store.user.email ? 'bg-yellow-400' : 'bg-gray-300']"
                class="m-2 p-2 border border-black rounded-lg"
              >                

                <div class="message-inner ">
                  <div> <!-- Debe ser flex -->

                    <p class="message-sender"> 
                      {{ msg.from._id === store.user._id ? 'You:' : msg.from.name }}
                    </p>
                  </div>
                  <p class="message-content text-justify">{{ msg.content }}</p>
                  <p class="message-timestamp-right text-right">{{ msg.time }} ✔</p>
                </div>
              </div>
            </div>
          </div>
          <div ref="messageEndRef"></div>
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
        <form @submit.prevent="handleSubmit" class="flex flex-row  sticky bottom-0 w-full">
     
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
  background-color: gray;
  border: 1px solid gray;
  min-height: 100%;
}

</style>