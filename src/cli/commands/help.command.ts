import { Command } from './commands.interface';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public async execute(...parameters: string[]): Promise<void> {
    console.info(chalk.greenBright(`
      Программа для подготовки данных для REST API сервера.
      Пример:
        cli.js ${chalk.redBright('--<command>')} ${chalk.yellowBright('[--argument]')}

      Команды:
        ${chalk.redBright('--version')}:                       # Номер версии
        ${chalk.redBright('--help')}:                          # Печатает данный текст
        ${chalk.redBright('--import')} ${chalk.yellowBright('<path>')}:                 # Импортирует данные
        `));
  }

  public getName(): string {
    return '--help';
  }
}
