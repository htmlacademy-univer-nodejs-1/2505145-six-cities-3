import { Command } from './commands.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer } from '../../shared/helpers/offer.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): void {
    const [filePath] = parameters;
    const fileReader = new TSVFileReader(filePath.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filePath}`);
      console.error(getErrorMessage(error));
    }
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onCompleteImport(count: string) {
    console.info(`${count} rows imported.`);
  }
}
