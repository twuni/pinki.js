import CreateCommand from './create/index.mjs';
import ExportCommand from './export/index.mjs';
import FingerprintCommand from './fingerprint/index.mjs';

const Subcommand = Object.freeze({
  create: CreateCommand,
  export: ExportCommand,
  fingerprint: FingerprintCommand
});

export const Command = Object.freeze({
  execute: (operation = 'create', ...rest) => {
    const subcommand = Subcommand[operation];

    if (typeof subcommand?.execute === 'function') {
      return subcommand.execute(...rest);
    }

    return Promise.reject(new Error(`Unsupported subcommand: ${subcommand}`));
  }
});

export default Command;
