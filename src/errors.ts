/** @since 1.0.0 */

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Types
 */
export type _stdout = { stdout: string }

/**
 * @since 1.0.0
 * @category Types
 */
export type _stderr = { stderr: string }

/**
 * @since 1.0.0
 * @category Types
 */
export type _stdin = { stdin: string }

/**
 * @since 1.0.0
 * @category Types
 */
export type _exitCode = { exitCode: number }

/**
 * @since 1.0.0
 * @category Types
 */
export type _nativeError = { nativeError: NodeJS.ErrnoException }

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

const tag =
  <Tag extends string>(_tag: Tag) =>
  <O>(o: O) => ({ ...o, _tag })

type Tag<T> = { _tag: T }

type OmitTag<T> = Omit<T, '_tag'>

type Ctor<T> = (opts: OmitTag<T>) => T

// -----------------------------------------------------------------------------
// Errors
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Errors
 */
export interface ExitCodeError extends _stdout, _stderr, Tag<'ExitCodeError'> {
  exitCode: number
}

/**
 * @since 1.0.0
 * @category Errors
 */
export interface SignalError extends _stdout, _stderr, Tag<'SignalError'> {
  signal: NodeJS.Signals
}

/**
 * @since 1.0.0
 * @category Errors
 */
export interface UnknownSpawnError
  extends _nativeError,
    Tag<'UnknownSpawnError'> {}

/**
 * @since 1.0.0
 * @category Errors
 */
export interface CommandNotFoundError
  extends _nativeError,
    Tag<'CommandNotFoundError'> {
  command: string
}

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Constructors
 */
export const exitCodeError: Ctor<ExitCodeError> = tag('ExitCodeError')

/**
 * @since 1.0.0
 * @category Constructors
 */
export const signalError: Ctor<SignalError> = tag('SignalError')

/**
 * @since 1.0.0
 * @category Constructors
 */
export const unknownSpawnError: Ctor<UnknownSpawnError> =
  tag('UnknownSpawnError')

/**
 * @since 1.0.0
 * @category Constructors
 */
export const commandNotFoundError: Ctor<CommandNotFoundError> = tag(
  'CommandNotFoundError'
)
