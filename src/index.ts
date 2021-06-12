/** @since 1.0.0 */

import * as cp from 'child_process'
import * as TE from 'fp-ts/TaskEither'
import * as O from 'fp-ts/Option'
import { TaskEither } from 'fp-ts/TaskEither'
import * as IMP from './impl'
import { pipe } from 'fp-ts/lib/function'
import {
  CancellationError,
  CommandNotFoundError,
  ExecutionError,
  executionError,
  cancellationError,
  terminationError,
  TerminationError,
  commandNotFoundError,
} from './errors'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Types
 */
export interface Options extends Omit<cp.SpawnOptions, 'stdio'> {
  stdin?: string
}

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

const matchNativeError = (
  nativeError: NodeJS.ErrnoException
): CommandNotFoundError | ExecutionError =>
  nativeError.code === 'ENOENT'
    ? commandNotFoundError({
        nativeError,
        command: nativeError.path || '',
      })
    : executionError({ nativeError })

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

/**
 * @since 1.0.0
 * @category Utils
 */
export const spawnWithExitCode: (
  command: string,
  args?: string[],
  options?: Options
) => TaskEither<
  CommandNotFoundError | CancellationError | ExecutionError,
  { stdout: string; stderr: string; exitCode: number }
> = (command, args = [], options = {}) =>
  pipe(
    TE.taskify(IMP.simpleSpawn)(command, args, options),
    TE.mapLeft(matchNativeError),
    TE.chainW(({ exitCode, stderr, stdout }) =>
      pipe(
        exitCode,
        O.fromNullable,
        O.match(
          () => TE.throwError(cancellationError({ stderr, stdout })),
          (n) => TE.of({ exitCode: n, stderr, stdout })
        )
      )
    )
  )

/**
 * @since 1.0.0
 * @category Utils
 */
export const spawn: (
  command: string,
  args?: string[],
  options?: Options
) => TaskEither<
  CommandNotFoundError | CancellationError | ExecutionError | TerminationError,
  { stdout: string; stderr: string }
> = (command, args = [], options = {}) =>
  pipe(
    spawnWithExitCode(command, args, options),
    TE.chainW(({ exitCode, stdout, stderr }) =>
      exitCode === 0
        ? TE.of({ stdout, stderr })
        : TE.throwError(terminationError({ exitCode, stdout, stderr }))
    )
  )
