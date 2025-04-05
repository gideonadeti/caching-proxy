#!/usr/bin/env node

import { Command } from "commander";

import { startServer } from "./server";
import { clearCache } from "./cache";

const program = new Command();

program
  .name("caching-proxy")
  .description(
    "A CLI tool that starts a caching proxy server, forwards requests to an actual server, and cache the responses."
  );

program
  .command("start")
  .description("Start the caching proxy server")
  .option("-p, --port <number>", "Port to run the server on", "3000")
  .option("-o, --origin <url>", "Origin URL to proxy requests to")
  .action(async (options) => {
    const port = parseInt(options.port, 10);

    if (!options.origin) {
      console.error("Missing --origin");
      process.exit(1);
    }

    await startServer(port, options.origin);
  });

program
  .command("clear-cache")
  .description("Clear in-memory cache")
  .action(() => {
    clearCache();

    console.log("Cache cleared");
  });

program.parse();
