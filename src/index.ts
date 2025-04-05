#!/usr/bin/env node

import { Command } from "commander";

import { startServer } from "./server";
import { clearCache } from "./cache";

const program = new Command();

program
  .name("caching-proxy")
  .description(
    "A CLI tool that starts a caching proxy server, forwards requests to an actual server, and caches the responses."
  )
  .option("-p, --port <number>", "Port to run the server on", "3000")
  .option("-o, --origin <url>", "Origin URL to proxy requests to")
  .option("--clear-cache", "Clear the in-memory cache", () => {
    clearCache();

    console.log("Cache cleared");

    process.exit(0);
  });

program.action(async (options) => {
  // If --clear-cache is set, it will already have cleared the cache and exited
  if (!options.clearCache) {
    if (!options.origin) {
      console.error("Missing --origin");
      process.exit(1);
    }

    const port = parseInt(options.port, 10);

    await startServer(port, options.origin);
  }
});

program.parse();
