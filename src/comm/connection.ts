import { EventEmitter, Readable, Writable } from "stream";
import { createBufferFromPacket, PacketParser } from "comm/parse";
import { Packet } from "comm/opcodes";

/**
 * high level handler for packet transfer
 * possible events:
 *  * exit - when connection closes or forcibly closed
 */
export class ConnectionHandler extends EventEmitter {
  private _connection: Readable;
  private _write: Writable | undefined;
  private _transformer: PacketParser;

  constructor(conn: Readable, write: Writable | undefined = undefined) {
    super();
    this._connection = conn;
    this._transformer = new PacketParser();
    this._write = write;
    if (!write && conn instanceof Writable) {
      this._write = conn;
    }
    this._setupConnection();
  }

  _setupConnection() {
    this._connection.on("close", () => {
      this.emit("exit");
    });

    this._transformer.on("data", (data: Packet) => {
      console.log("got packet", data);
    });

    this._connection.pipe(this._transformer);
  }

  send(packet: Packet) {
    this._write?.write(createBufferFromPacket(packet));
  }
}
