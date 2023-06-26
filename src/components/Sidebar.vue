<script setup>

  import { useAccessStore } from '@/stores/userStore' 
  import { inject, onMounted } from 'vue';
  import { watch } from 'vue';
  import Room from './Room.vue';
  import Member from './Member.vue';
  import socket from "./../lib/socket";

  const store = useAccessStore()

  // const dispatch = useDispatch()
  // const user = useSelector(store => store.user)
  /* const { 
    socket, 
    setMembers, 
    members, 
    setCurrentRoom, 
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom
  } = useContext(AppContext) */
  /* useEffect(() => {
    if(user) {
      setCurrentRoom('general')
      getRooms()
      socket.emit('join-room', 'general')
      socket.emit('new-user')
    }
  },[]) */

  const { 
    // socket,
    setMembers,
    members,
    setMessages,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom
  } = inject('chat-context')

  const joinRoom = (room, isPublic = true) => {
    
    console.log(room)

    if (!store.user) {
      return alert('Please Login')
    }
    
    socket.emit('join-room', room)
    setCurrentRoom(room)

    if(isPublic) {
      setPrivateMemberMsg(null)
    }

    store.resetNotifications(room)
    
  }

  socket.off('notifications').on('notifications',(room) => {
    if(currentRoom.value !== room) store.addNotifications(room)
  })

  onMounted(() => {
    if(store.user) {
      setCurrentRoom('general')
      getRooms()
      socket.emit('join-room', 'general')
      socket.emit('new-user')
    }
  })

  socket.off('new-user').on('new-user', (payload) => {
    setMembers(payload)
  })

  const getRooms = async () => {
    const response = await fetch(
      'https://pfapi-production.up.railway.app/chat/rooms',
      {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
      })
    const {rooms} = await response.json()
    setRooms(rooms)
  }

  const orderIds =  (id1, id2) => {
    if(id1 > id2) {
      return id1 + '-' + id2
    } else {
      return id2 + '-' + id1
    }
  }

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member)
    const roomId = orderIds(store.user._id, member._id)
    joinRoom(roomId, false)
    setCurrentRoom(roomId) // ! ////
  }

  const ejemplo = () => {
    // console.log(members)
    console.log(`current: ${currentRoom.value}`)
  }

</script>

<template>
  
  <div class="sidebar flex flex-col">
    <h2 class="bg-yellow-400 p-2 text-center text-lg"
      @click="ejemplo"
    >Available Rooms</h2>

    <!-- <div>

      <p v-for="room in rooms"></p>

    </div> -->

    
    <div>
      <Room
        v-for="room in rooms"
        :newMessages="store.user.newMessages[room]"
        :currentRoom="currentRoom"
        :room="room"
        @click="joinRoom(room)"
      />
    </div>

      <!-- <ListGroup>
        {rooms?.map((room, idx) => {
          return (
            <ListGroup.Item 
              key={idx} 
              onClick={() => joinRoom(room)}
              active={room === currentRoom}
              style={{cursor: 'pointer', display: 'flex', justifyContent: 'space-between'}}
            >
              {room} {currentRoom !== room && <span className='badge rounded-pill bg-primary'>{user.newMessages[room]}</span>}
            </ListGroup.Item>
          )
        })}
      </ListGroup> -->

      <h2 class="bg-yellow-400 p-2 text-center text-lg">Members</h2>

      
      <div>
        <Member
          v-for="member in members"
          :newMessages="store.user?.newMessages[orderIds(member._id,store.user._id)]" 
          @click="handlePrivateMemberMsg(member)"
          :member="member"
          :user="store.user"
          
        />
      </div>

      <!-- {members.map((member) => {
        return (
          <ListGroup.Item 
            key={member._id} 
            style={{cursor: 'pointer', height: '2rem'}}

            active={privateMemberMsg?._id === member?._id}

            onClick={() => handlePrivateMemberMsg(member)} 

            disabled={member._id === user._id}
          >
            <Row>
              <Col xs={2} className='member-status' style={{height: '1rem'}}>
                {
                  member.status === 'online' 
                    ? <i className='sidebar-online-status'><BsFillCircleFill/></i> 
                    : <i className='sidebar-offline-status'><BsFillCircleFill/></i>
                }
              </Col>
              <Col xs={8} className='member-status' style={{height: '1rem'}}>
                {
                  <span>{member.name}</span>
                }
                {
                  member._id === user?._id && " ( You )"
                }
                {
                  member.status === 'offline' && '(Offline)'
                }
              </Col>
                <Col xs={2}>
                  <span className='badge rounded-pill bg-primary'>
                    {user.newMessages[orderIds(member._id, user._id)]}
                  </span>
                </Col>
            </Row>
          </ListGroup.Item>
        )
      })} -->
      
  </div>

</template>


<style scoped>

  .sidebar {
    background-color: gray;
    min-height: 100%;
  }

</style>