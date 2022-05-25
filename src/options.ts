export type OptionDescriptor = string;
export type OptionCallable = CallableFunction;
export type OptionValues = Array<string>
export type OptionCallableTest = (value: any, key: string) => boolean;
export type OptionTest = OptionValues|OptionCallableTest;

export interface OptionDescription {
    description: string;
    on?: OptionCallable;
    test?: OptionTest;
}

export type InputOption = [OptionDescriptor, string|OptionDescription];

interface ParsedOption extends OptionDescription {
    name: string,
}

type ParsedOptions = Record<OptionDescriptor, Parameter>

function splitString(str: string, match: string, limit: number) {
    const split = str.split(match), newSplit = [];

    for (let i = 0; i < limit - 1; i++) {
        newSplit.push(split.shift());
    }

    newSplit.push(split.join(match));

    return newSplit;
}

class Parameter {
    protected name: OptionDescriptor;
    protected description: string = '';
    protected value: any = undefined;
    protected negatable: boolean = false;
    protected increment: boolean = false;
    protected decrement: boolean = false;
    protected parameter: boolean = false;
    protected auto: boolean = false;

    protected test = [];
    protected possible = [];
    protected short = [];
    protected object = {}

    constructor(name: string) {
        this.name = name;
    }

    public process(arg1: string, arg2: string): boolean|number {


        return false
    }
}

export class Options {
    /** Hold all the parsed options **/
    protected parameters: Parameter[] = [];
    protected inCommand: boolean = false;

    /** Remaining arguments after parsing **/
    public args: string[] = []

    /**
     * Set the options inside the options instance.
     * @param options
     */
    public options(options: InputOption[]) {
        this.parameters = options.map(([opt, descr]) => {
            return new Parameter(
                opt
            )
        })

        return this;
    }

    /**
     * Parse the stored options
     * @param argv
     */
    public parse(argv: string[] | null = null) {
        let args: string[] = argv ?? process.argv;
        let extra: string[] = [];

        while (args.length) {
            if (!args[0].match(/^-/)) {
                extra.push(args.shift() as string);
                if (this.inCommand) {
                    extra.push.apply(extra, args);
                    break;
                }
                continue;
            }

            // We have found a terminator.
            if (args[0] == '--') {
                args.shift()
                extra.push.apply(extra, args)
                break
            }

            for (const param in this.parameters) {
                const parameter = this.parameters[param]
                const match = parameter.process.apply(parameter, args)
                // parse each option
            }
        }
    }
}
