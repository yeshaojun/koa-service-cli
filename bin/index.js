#!/usr/bin/env node

const init = require("../lib/init.js");
require("yargs")
  .usage("$0 <cmd> [args]")
  .demandCommand(
    1,
    "A command is required. Pass --help to see all available commands and options."
  )
  .recommendCommands()
  .strict()
  .command({
    command: "create [name]",
    describe: "create [name]",
    builder(yargs) {
      yargs.positional("name", {
        type: "string",
        default: "Cambi",
        describe: "the name to say create to",
      });
    },
    handler(argv) {
      init(argv["name"]);
    },
  })
  .alias("h", "--help")
  .alias("-v", "--version")
  .help().argv;
