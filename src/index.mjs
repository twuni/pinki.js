import HelpCommand from './help/index.mjs';
import KeyCommand from './key/index.mjs';
import SignCommand from './sign/index.mjs';
import VerifyCommand from './verify/index.mjs';

const Command = Object.freeze({
  help: HelpCommand,
  key: KeyCommand,
  sign: SignCommand,
  verify: VerifyCommand
});

const ARGV_OFFSET = 2;

const main = async () => {
  const [command, ...rest] = Array.from(process.argv).slice(ARGV_OFFSET);

  const { execute } = Command[command] || Command.help;

  try {
    process.stdout.write(await execute(...rest));
    process.exit(0);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }
};

main();
