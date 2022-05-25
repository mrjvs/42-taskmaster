import {EventEmitter} from 'events'

const { Argument, humanReadableArgName } = require('@taskmaster/options/argument');

export class Command extends EventEmitter {
    private name: string;
    protected commands: Command[] = []
    protected options: [] = []
    protected args: string[] = []
    protected rawArgs: string[] = []

    private _description: string | undefined;
    private _argsDescription: string | undefined;
    private _executableHandler: boolean = false;

    constructor(name: string | undefined) {
        super();
        this.name = name || '';
    }

    command(nameAndArgs: string, actionOptsOrExecDesc: string, execOpts: Object) {
        let desc: string|null = actionOptsOrExecDesc
        let opts = execOpts || {}

        // @ts-ignore
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const cmd = this.createCommand(name);

        if (desc) {
            cmd.description(desc);
            cmd._executableHandler = true;
        }

        if (args) {
            // cmd.arguments(args);
        }

        this.commands.push(cmd);

        if (desc) {
            return this;
        }

        return cmd;
    }

    description(str: string, argsDescription: string | undefined = undefined) {
        if (str === undefined && argsDescription === undefined) return this._description;
        this._description = str;

        if (argsDescription) {
            this._argsDescription = argsDescription;
        }
        return this;
    }

    createCommand(name: string) {
        return new Command(name);
    }
}
