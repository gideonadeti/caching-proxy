# Caching Proxy

A CLI tool that starts a caching proxy server, forwards requests to an actual server, and caches the responses.

## Features

- Start a caching proxy server
- Forward requests to an actual server
- Cache the responses to reduce latency on subsequent requests
- Clear in-memory cache with a simple command

## Installation

To get started, you'll need to clone the repository and install the required dependencies.

### 1. Clone the repository

```bash
git clone https://github.com/gideonadeti/caching-proxy.git
cd caching-proxy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the project

```bash
npm run build
```

### 4. Link the CLI tool globally

This enables you to run the `caching-proxy` command globally

```bash
npm link
```

## Usage

### 1. Start the caching proxy server

To start the caching proxy server, run the following command with the required options:

```bash
caching-proxy --port <number> --origin <url>
```

- `--port`: (Optional) The port to run the server on. Default is 3000.
- `--origin`: (Required) The origin URL to proxy requests to. This option is required because the proxy server needs a target server to forward requests to. If omitted, the proxy server will not know where to send the requests and will fail to start.

Example:

```bash
caching-proxy --port 3000 --origin http://dummyjson.com
```

This command starts a proxy server that:

- Listens on port 3000
- Forwards requests from `http://localhost:3000` to `http://dummyjson.com`
- Caches responses in memory until server restart or manual cache clear

**Note:** Currently, there is no automatic cache expiration mechanism.

### 2. Clear the in-memory cache

To clear the in-memory cache (all cached responses), run the following command:

```bash
caching-proxy --clear-cache
```

## Background

This project is part of the [roadmap.sh](https://roadmap.sh) backend development roadmap and can be found [here](https://roadmap.sh/projects/caching-server).
