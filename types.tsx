export interface ICloudConvo {
  id: string,
  participantIds: string[],
  messages: IMessage[]
}

export interface IMessage {
  signature: string,
  text: string,
  timestamp: number,
  user: IUser
}

export interface IUser {
  _id: string,
  name: string
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
