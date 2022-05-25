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