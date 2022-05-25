import { createServer, Socket, Server } from "net";

/**
 * create a TaskMaster socket
 * @param listen port number or socket file path
 * @returns socket server
 */
export function createTMServer(
  listen: number | string,
  cb: (client: Socket) => void
): Promise<Server> {
  return new Promise((resolve, reject) => {
    const server = createServer((socket) => {
      cb(socket);
    });
    server.on("error", (err) => {
      reject(err);
    });
    server.on("listening", () => {
      resolve(server);
    });
    server.listen(listen);
  });
}

function connectToTMServerBase(
  portOrPath: string | number,
  ip: undefined | string
): Promise<Socket> {
  return new Promise((resolve, reject) => {
    const client = new Socket();
    client.on("ready", () => {
      resolve(client);
    });
    client.on("error", (err) => {
      reject(err);
    });

    // actually connect
    if (ip) client.connect(portOrPath as number, ip);
    else client.connect(portOrPath as string);
  });
}

/**
 * connect to a TaskMaster tcp socket
 * @param url ip + port
 * @returns socket connection
 */
export function connectToTMServer(url: string): Promise<Socket> {
  const [ip, port] = url.split(":");
  return connectToTMServerBase(+port, ip);
}

/**
 * connect to a TaskMaster unix socket
 * @param path file path
 * @returns socket connection
 */
export function connectToTMUnixSocket(path: string): Promise<Socket> {
  return connectToTMServerBase(path, undefined);
}
