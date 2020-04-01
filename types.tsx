export interface ICloudConvo {
  id: string,
  participantIds: string[],
  messages: IMessage[]
}

export interface IMessage {
  senderId: string,
  text: string,
  timestamp: number
}

export interface IParticipant {
  id: string,
  publicKey: string,
  privateKey: string
}

export interface ILocalConvo {
  id: string,
  contact: string,
  publicKey: string
}

export interface IQRData {
  id: string,
  publicKey: string
}

export interface IConvo {
  id: string,
  contact: string,
  encryptingKey: string
}
