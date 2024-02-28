import { Command } from './commands.interface';
import packageJSON from '../../../package.json' assert { type: 'json' };

export class VersionCommand implements Command {
  public getName(): string {
    return '--version';
  }

  public async execute(...parameters: string[]): Promise<void> {
    if (!packageJSON)
      throw new Error('Failed to access package.json.');

    console.log(packageJSON.version);
  }
}
