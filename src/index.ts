/** @since 1.0.0 */

import * as cp from 'child_process'
import * as TE from 'fp-ts/TaskEither'
import { TaskEither } from 'fp-ts/TaskEither'
import * as IMP from './impl'
import { absurd, pipe } from 'fp-ts/lib/function'
import {
  SignalError,
  CommandNotFoundError,
  UnknownSpawnError,
  unknownSpawnError,
  signalError,
  exitCodeError,
  ExitCodeError,
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
): CommandNotFoundError | UnknownSpawnError =>
  nativeError.code === 'ENOENT'
    ? commandNotFoundError({
        nativeError,
        command: nativeError.path || '',
      })
    : unknownSpawnError({ nativeError })

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
  UnknownSpawnError | CommandNotFoundError | SignalError,
  { stdout: string; stderr: string; exitCode: number }
> = (command, args = [], options = {}) =>
  pipe(
    TE.taskify(IMP.simpleSpawn)(command, args, options),
    TE.mapLeft(matchNativeError),
    TE.chainW(({ signal, exitCode, stderr, stdout }) =>
      signal !== null
        ? TE.throwError(signalError({ stderr, stdout, signal }))
        : exitCode !== null
        ? TE.of({ stderr, stdout, exitCode })
        : absurd<ReturnType<typeof spawnWithExitCode>>(null as never)
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
  UnknownSpawnError | CommandNotFoundError | SignalError | ExitCodeError,
  { stdout: string; stderr: string }
> = (command, args = [], options = {}) =>
  pipe(
    spawnWithExitCode(command, args, options),
    TE.chainW(({ exitCode, stdout, stderr }) =>
      exitCode === 0
        ? TE.of({ stdout, stderr })
        : TE.throwError(exitCodeError({ exitCode, stdout, stderr }))
    )
  )
