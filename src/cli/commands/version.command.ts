import { Command } from './commands.interface';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type PackageJSONConfig = {
  version: string
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  public getName(): string {
    return '--version';
  }

  public async execute(...parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.log(version)
    } catch (error: unknown) {
      console.error(`Filed to read version from ${this.filePath}`)

      if (error instanceof Error)
        console.error(error.message)
    }
  }

  private readVersion(): string {
    const jsonContent: string = readFileSync(resolve(this.filePath), 'utf-8');
    const parsedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(parsedContent))
      throw new Error('Failed to parse json content.')

    return parsedContent.version;
  }
}
