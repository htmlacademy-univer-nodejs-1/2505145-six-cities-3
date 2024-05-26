import { Command } from './commands.interface';
import { version } from '../../../package.json';

export class VersionCommand implements Command {
  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    if (!version) {
      throw new Error('Failed to access package.json.');
    }

    console.log(version);
  }
}
