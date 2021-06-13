---
title: errors.ts
nav_order: 1
parent: Modules
---

## errors overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Constructors](#constructors)
  - [commandNotFoundError](#commandnotfounderror)
  - [exitCodeError](#exitcodeerror)
  - [signalError](#signalerror)
  - [unknownSpawnError](#unknownspawnerror)
- [Errors](#errors)
  - [CommandNotFoundError (interface)](#commandnotfounderror-interface)
  - [ExitCodeError (interface)](#exitcodeerror-interface)
  - [SignalError (interface)](#signalerror-interface)
  - [UnknownSpawnError (interface)](#unknownspawnerror-interface)
- [Types](#types)
  - [\_exitCode (type alias)](#_exitcode-type-alias)
  - [\_nativeError (type alias)](#_nativeerror-type-alias)
  - [\_stderr (type alias)](#_stderr-type-alias)
  - [\_stdin (type alias)](#_stdin-type-alias)
  - [\_stdout (type alias)](#_stdout-type-alias)

---

# Constructors

## commandNotFoundError

**Signature**

```ts
export declare const commandNotFoundError: Ctor<CommandNotFoundError>
```

Added in v1.0.0

## exitCodeError

**Signature**

```ts
export declare const exitCodeError: Ctor<ExitCodeError>
```

Added in v1.0.0

## signalError

**Signature**

```ts
export declare const signalError: Ctor<SignalError>
```

Added in v1.0.0

## unknownSpawnError

**Signature**

```ts
export declare const unknownSpawnError: Ctor<UnknownSpawnError>
```

Added in v1.0.0

# Errors

## CommandNotFoundError (interface)

**Signature**

```ts
export interface CommandNotFoundError extends _nativeError, Tag<'CommandNotFoundError'> {
  command: string
}
```

Added in v1.0.0

## ExitCodeError (interface)

**Signature**

```ts
export interface ExitCodeError extends _stdout, _stderr, Tag<'ExitCodeError'> {
  exitCode: number
}
```

Added in v1.0.0

## SignalError (interface)

**Signature**

```ts
export interface SignalError extends _stdout, _stderr, Tag<'SignalError'> {
  signal: NodeJS.Signals
}
```

Added in v1.0.0

## UnknownSpawnError (interface)

**Signature**

```ts
export interface UnknownSpawnError extends _nativeError, Tag<'UnknownSpawnError'> {}
```

Added in v1.0.0

# Types

## \_exitCode (type alias)

**Signature**

```ts
export type _exitCode = { exitCode: number }
```

Added in v1.0.0

## \_nativeError (type alias)

**Signature**

```ts
export type _nativeError = { nativeError: NodeJS.ErrnoException }
```

Added in v1.0.0

## \_stderr (type alias)

**Signature**

```ts
export type _stderr = { stderr: string }
```

Added in v1.0.0

## \_stdin (type alias)

**Signature**

```ts
export type _stdin = { stdin: string }
```

Added in v1.0.0

## \_stdout (type alias)

**Signature**

```ts
export type _stdout = { stdout: string }
```

Added in v1.0.0
