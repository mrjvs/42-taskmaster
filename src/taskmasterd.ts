/**
 * taskmasterd -- run a set of applications as daemons.
 *
 * Usage: %s [options]
 *
 * Options:
 * -c/--configuration FILENAME -- configuration file path (searches if not given)
 * -n/--nodaemon -- run in the foreground (same as 'nodaemon=true' in config file)
 * -s/--silent -- no logs to stdout (maps to 'silent=true' in config file)
 * -h/--help -- print this usage message and exit
 * -v/--version -- print supervisord version number and exit
 * -u/--user USER -- run supervisord as this user (or numeric uid)
 * -m/--umask UMASK -- use this umask for daemon subprocess (default is 022)
 * -d/--directory DIRECTORY -- directory to chdir to when daemonized
 * -l/--logfile FILENAME -- use FILENAME as logfile path
 * -y/--logfile_maxbytes BYTES -- use BYTES to limit the max size of logfile
 * -z/--logfile_backups NUM -- number of backups to keep when max bytes reached
 * -e/--loglevel LEVEL -- use LEVEL as log level (debug,info,warn,error,critical)
 * -j/--pidfile FILENAME -- write a pid file for the daemon process to FILENAME
 * -i/--identifier STR -- identifier used for this instance of supervisord
 * -q/--childlogdir DIRECTORY -- the log directory for child process logs
 * -k/--nocleanup --  prevent the process from performing cleanup (removal of old automatic child log files) at startup.
 * -a/--minfds NUM -- the minimum number of file descriptors for start success
 * -t/--strip_ansi -- strip ansi escape codes from process output
 * --minprocs NUM  -- the minimum number of processes available for start success
 * --profile_options OPTIONS -- run supervisord under profiler and output
 *                              results based on OPTIONS, which  is a comma-sep'd
 *                              list of 'cumulative', 'calls', and/or 'callers',
 *                              e.g. 'cumulative,callers')
 */

import {InputOption, Options} from "@taskmaster/options";

const options: InputOption[] = [
    ['h|help', {
        description: "Display the help command",
        on: () => console.log('Hi!'),
    }],
]

const parser = new Options();
parser.options(options).parse()
