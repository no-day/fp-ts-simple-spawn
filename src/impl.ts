/** @since 1.0.0 */

import * as cp from 'child_process'

type Callback = (err: null | NodeJS.ErrnoException, result?: Result) => void

export const simpleSpawn: {
  (command: string, args: string[], options: Options, callback: Callback): void
} = (command, args, options, callback) => {
  try {
    const proc = cp.spawn(command, args, options)
    let stdout = ''
    let stderr = ''

    proc.stdout?.on('data', (chunk) => {
      stdout += chunk.toString()
    })

    proc.stderr?.on('data', (chunk) => {
      stderr += chunk.toString()
    })

    if (options.stdin) {
      proc.stdin.write(options.stdin)
      proc.stdin.end()
    }

    proc.on('error', callback)

    proc.on('exit', (exitCode, signal) =>
      callback(null, { exitCode, signal, stdout, stderr })
    )
  } catch (e) {
    callback(e)
  }
}

export type Result = {
  stdout: string
  stderr: string
  exitCode: number | null
  signal: NodeJS.Signals | null
}

export type Options = Omit<cp.SpawnOptions, 'stdio'> & { stdin?: string }
