# Jina Reader Proxy

Wrap [Jina Reader](https://jina.ai/reader/) in Cloudflare Worker.

## Usage

Append the `url` param to these endpoints.

### `/reader`

`https://jina.detools.dev/reader?url=${YOUR_URL}`

#### Example:

<https://jina.detools.dev/reader?url=https://hono.dev>

### `/markdown`

`https://jina.detools.dev/markdown?url=${YOUR_URL}`

#### Example:

<https://jina.detools.dev/markdown?url=https://hono.dev>

### `/html`

`https://jina.detools.dev/html?url=${YOUR_URL}`

#### Example:

<https://jina.detools.dev/html?url=https://hono.dev>


### `/text`

`https://jina.detools.dev/text?url=${YOUR_URL}`

#### Example:

<https://jina.detools.dev/text?url=https://hono.dev>

### `/screenshot`

`https://jina.detools.dev/screenshot?url=${YOUR_URL}`

#### Example:

<https://jina.detools.dev/screenshot?url=https://hono.dev>

## Install

```
pnpm i
pnpm run dev
```

## Deploy

```
pnpm run deploy
```

## License
MIT