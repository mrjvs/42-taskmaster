export enum OpCodes {
  PING = 0,
  PONG = 1,
}

export interface PingPacket {
  type: OpCodes.PING | OpCodes.PONG;
  data: number;
}

export type Packet = PingPacket;
