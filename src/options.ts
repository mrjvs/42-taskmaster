export type OptionDescriptor = string;
export type OptionCallable = CallableFunction;
export type OptionValues = Array<string>
export type OptionCallableTest = (value: any, key: string) => boolean;
export type OptionTest = OptionValues|OptionCallableTest;

interface OptionDescription {
    description: OptionDescription;
    on: OptionCallable;
    test: OptionTest;
}

export type InputOption = [OptionDescriptor, string|OptionDescription|OptionCallable];
export type Option = Record<OptionDescriptor, OptionDescription>

class Options {
    protected _options: InputOption[] = [];

    public options(options: InputOption[]) {
        options.map(opt => {

        })
    }
}

export class ClientOptions extends Options {
}

export class ServerOptions extends Options {
}
