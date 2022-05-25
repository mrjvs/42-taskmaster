import { Transform, TransformCallback } from "stream";
import { Packet, OpCodes } from "comm/opcodes";
import { env } from "process";

/*
 * Packet header structure:
 *  - 1 byte  - uint    - opcode
 *  - 4 bytes - uint BE - length of packet
 */

export function readPacketFromBuffer(packet: Buffer): Packet {
  const opcode = packet.readUInt8(0);
  if (!Object.values(OpCodes).includes(opcode))
    throw new Error("invalid packet - wrong opcode");
  const out = {
    type: opcode as OpCodes,
  };

  const extraData = JSON.parse(packet.slice(5).toString("utf8"));

  return {
    ...out,
    ...extraData,
  } as Packet;
}

export function createBufferFromPacket(packet: Packet): Buffer {
  const code: OpCodes = packet.type;
  let data: any = packet;
  delete data.type;
  data = JSON.stringify(data);

  const out = Buffer.alloc(1 + 4 + (data as string).length);
  out.writeUInt8(code, 0);
  out.writeUInt32BE(data.length, 1);
  out.write(data as string, 5, "utf8");
  return out;
}

export class PacketParser extends Transform {
  private _possibleEncodings = ["utf8", "buffer"];

  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk: any, enc: any, cb: TransformCallback): void {
    if (!this._possibleEncodings.includes(enc))
      return cb(new Error("Cannot accept encoding: " + env));
    if (enc === "utf8") chunk = Buffer.from(chunk, enc);
    try {
      const packet = readPacketFromBuffer(chunk);
      return cb(null, packet);
    } catch {
      // ignore error, otherwise entire program terminates
    }
  }
}
