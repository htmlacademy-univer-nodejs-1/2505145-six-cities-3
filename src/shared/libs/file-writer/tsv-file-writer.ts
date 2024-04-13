import { FileWriter } from './file-writer.interface.js';
import { createWriteStream, WriteStream } from 'node:fs';

export class TsvFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      encoding: 'utf-8',
      flags: 'w',
      autoClose: true
    });
  }

  public async write(row: string): Promise<void> {
    const writeSuccess = this.stream.write(`${row}\n`);

    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }

    return Promise.resolve();
  }
}
