
type SocketEvents = keyof SocketEventEmissionData

type SocketEventEmissionData = {
  nomination : { server : string, client : boolean }
}

type SocketEventDestination = 'server' | 'client'

interface MySocket {
  on <T extends SocketEvents, U extends SocketEventDestination>
    (event : T, destination : U, fn : (x : SocketEventEmissionData[T][U]) => void) : void

  once <T extends SocketEvents, U extends SocketEventDestination>
    (event : T, fn : (x : SocketEventEmissionData[T][U]) => void) : void

  emit <T extends SocketEvents, U extends SocketEventDestination>
    (event : T, data : SocketEventEmissionData[T][U]) : void
}