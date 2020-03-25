export interface IConvo {
  id: string,
  contact: string,
  messages: IMessage[]
}

export interface IMessage {
  text: string,
  timestamp: number
}

export interface IConvoParams {
  id: string,
  title: string
}