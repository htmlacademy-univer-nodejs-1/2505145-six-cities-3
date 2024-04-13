import { Command } from './commands/commands.interface.js';
import { CommandParser } from './command-parser.js';

type CommandCollection = Record<string, Command>

export class CLIApplication {
  private Commands: CommandCollection = {};

  constructor(
    private readonly defaultCommand: string = '--help'
  ) {}

  public registerCommands(commandList: Command[]): void {
    commandList.map((command) => {
      if (Object.hasOwn(this.Commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered.`);
      }

      this.Commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.Commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command {
    if (!this.Commands[this.defaultCommand]) {
      throw new Error(`The default command ${this.defaultCommand} is not registered`);
    }

    return this.Commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
