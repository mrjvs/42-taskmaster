/**
 * taskmasterctl -- control applications run by taskmasterd from the cmd line.
 *
 * Usage: %s [options] [action [arguments]]
 *
 * Options:
 * -c/--configuration FILENAME -- configuration file path (searches if not given)
 * -h/--help -- print usage message and exit
 * -i/--interactive -- start an interactive shell after executing commands
 * -s/--serverurl URL -- URL on which supervisord server is listening (default "http://localhost:9001").
 * -u/--username USERNAME -- username to use for authentication with server
 * -p/--password PASSWORD -- password to use for authentication with server
 * -r/--history-file -- keep a readline history (if readline is available)
 *
 * action [arguments] -- see below
 *
 * Actions are commands like "tail" or "stop".  If -i is specified or no action is
 * specified on the command line, a "shell" interpreting actions typed
 * interactively is started.  Use the action "help" to find out about available
 * actions.
 */

import { ConnectionHandler } from "comm/connection";
import { connectToTMServer, connectToTMUnixSocket } from "comm/socket";
import { OpCodes } from "comm/opcodes";

async function bootstrap() {
  const conn = await connectToTMServer("127.0.0.1:9999");
  const handler = new ConnectionHandler(conn);
  handler.on("exit", () => {
    console.log("connection closed");
    process.exit(1);
  });

  handler.send({
    type: OpCodes.PING,
    data: 42,
  });
  console.log("sent data");
}

bootstrap();
