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
export interface TerminationError
  extends _stdout,
    _stderr,
    _exitCode,
    Tag<'TerminationError'> {}

/**
 * @since 1.0.0
 * @category Errors
 */
export interface CancellationError
  extends _stdout,
    _stderr,
    Tag<'CancellationError'> {}

/**
 * @since 1.0.0
 * @category Errors
 */
export interface ExecutionError extends _nativeError, Tag<'ExecutionError'> {}

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
export const terminationError: Ctor<TerminationError> = tag('TerminationError')

/**
 * @since 1.0.0
 * @category Constructors
 */
export const cancellationError: Ctor<CancellationError> =
  tag('CancellationError')

/**
 * @since 1.0.0
 * @category Constructors
 */
export const executionError: Ctor<ExecutionError> = tag('ExecutionError')

/**
 * @since 1.0.0
 * @category Constructors
 */
export const commandNotFoundError: Ctor<CommandNotFoundError> = tag(
  'CommandNotFoundError'
)
