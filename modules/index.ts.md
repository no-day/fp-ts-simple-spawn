---
title: index.ts
nav_order: 2
parent: Modules
---

## index overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Types](#types)
  - [Options (interface)](#options-interface)
- [Utils](#utils)
  - [spawn](#spawn)
  - [spawnWithExitCode](#spawnwithexitcode)

---

# Types

## Options (interface)

**Signature**

```ts
export interface Options extends Omit<cp.SpawnOptions, 'stdio'> {
  stdin?: string
}
```

Added in v1.0.0

# Utils

## spawn

**Signature**

```ts
export declare const spawn: (
  command: string,
  args?: string[] | undefined,
  options?: Options | undefined
) => TaskEither<
  UnknownSpawnError | CommandNotFoundError | SignalError | ExitCodeError,
  { stdout: string; stderr: string }
>
```

Added in v1.0.0

## spawnWithExitCode

**Signature**

```ts
export declare const spawnWithExitCode: (
  command: string,
  args?: string[] | undefined,
  options?: Options | undefined
) => TaskEither<
  UnknownSpawnError | CommandNotFoundError | SignalError,
  { stdout: string; stderr: string; exitCode: number }
>
```

Added in v1.0.0
