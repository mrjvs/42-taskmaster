const { InvalidArgumentError } = require('@taskmaster/options/error');

export class Argument {
    private readonly _name: string;
    public description: string = '';
    public variadic: boolean = false;
    public required: boolean = false;
    public parseArg: Function | undefined = undefined;
    public defaultValue: any = undefined;
    public defaultValueDescription: string | undefined = undefined;
    public argChoices: string[] | undefined = undefined;

    /**
     * Initialize a new command argument with the given name and description.
     * The default is that the argument is required, and you can explicitly
     * indicate this with <> around the name. Put [] around the name for an optional argument.
     *
     * @param {string} name
     * @param {string} [description]
     */
    constructor(name: string, description: string) {
        this.description = description || '';

        switch (name[0]) {
            case '<': // e.g. <required>
                this.required = true;
                this._name = name.slice(1, -1);
                break;
            case '[': // e.g. [optional]
                this.required = false;
                this._name = name.slice(1, -1);
                break;
            default:
                this.required = true;
                this._name = name;
                break;
        }

        if (this._name.length > 3 && this._name.slice(-3) === '...') {
            this.variadic = true;
            this._name = this._name.slice(0, -3);
        }
    }

    /**
     * Return argument name.
     *
     * @return {string}
     */
    name() {
        return this._name;
    }

    /**
     * @api private
     */
    private concatValue(value: any, previous: string | any[]) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
            return [value];
        }

        return previous.concat(value);
    }

    /**
     * Set the default value, and optionally supply the description to be displayed in the help.
     *
     * @param {any} value
     * @param {string} [description]
     * @return {Argument}
     */
    public default(value: any, description: string): Argument {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
    }

    /**
     * Set the custom handler for processing CLI command arguments into argument values.
     *
     * @param {Function} [fn]
     * @return {Argument}
     */
    argParser(fn: Function): Argument {
        this.parseArg = fn;
        return this;
    }

    /**
     * Only allow argument value to be one of choices.
     *
     * @param {string[]} values
     * @return {Argument}
     */
    public choices(values: string[]) {
        this.argChoices = values.slice();
        this.parseArg = (arg: any, previous: string | any[]) => {
            if (!this.argChoices?.includes(arg)) {
                throw new InvalidArgumentError(`Allowed choices are ${this.argChoices?.join(', ')}.`);
            }

            if (this.variadic) {
                return this.concatValue(arg, previous);
            }

            return arg;
        };
        return this;
    }

    /**
     * Make argument required.
     */
    public argRequired() {
        this.required = true;
        return this;
    }

    /**
     * Make argument optional.
     */
    public argOptional() {
        this.required = false;
        return this;
    }
}

/**
 * Takes an argument and returns its human-readable equivalent for help usage.
 *
 * @param {Argument} arg
 * @return {string}
 * @api private
 */

export function humanReadableArgName(arg: Argument) {
    const nameOutput = arg.name() + (arg.variadic ? '...' : '');

    return arg.required
        ? '<' + nameOutput + '>'
        : '[' + nameOutput + ']';
}
