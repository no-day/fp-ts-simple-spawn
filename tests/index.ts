import * as $ from '../src'
import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/Either'
import * as T from 'fp-ts/Task'

describe('spawn', () => {
  // it('prints to stdout', () =>
  //   pipe(
  //     $.spawn('echo', ['one', 'two']),
  //     T.map((result) =>
  //       expect(result).toStrictEqual(
  //         E.right({
  //           stdout: 'one two\n',
  //           stderr: '',
  //         })
  //       )
  //     ),
  //     (p) => p()
  //   ))

  it('takes stdin', () =>
    pipe(
      $.spawn('cat', [], { stdin: 'Hello' }),
      T.map((result) =>
        expect(result).toStrictEqual(
          E.right({
            stdout: 'Hello',
            stderr: '',
          })
        )
      ),
      (p) => p()
    ))

  it('throws with unknown command', () =>
    pipe(
      $.spawn('somethingUnknown', ['one', 'two']),
      T.map((result) =>
        expect(result).toMatchObject(
          E.left({
            _tag: 'CommandNotFoundError',
            command: 'somethingUnknown',
          })
        )
      ),
      (p) => p()
    ))

  it('throws exit code error', () =>
    pipe(
      $.spawn('yarn', ['somethingUnknown']),
      T.map((result) =>
        expect(result).toMatchObject(
          E.left({
            _tag: 'ExitCodeError',
            exitCode: 1,
          })
        )
      ),
      (p) => p()
    ))
})

describe('spawnWithExitCode', () => {
  // it('prints to stdout', () =>
  //   pipe(
  //     $.spawnWithExitCode('echo', ['one', 'two']),
  //     T.map((result) =>
  //       expect(result).toStrictEqual(
  //         E.right({
  //           stdout: 'one two\n',
  //           stderr: '',
  //           exitCode: 0,
  //         })
  //       )
  //     ),
  //     (p) => p()
  //   ))

  it('takes stdin', () =>
    pipe(
      $.spawnWithExitCode('cat', [], { stdin: 'Hello' }),
      T.map((result) =>
        expect(result).toStrictEqual(
          E.right({
            stdout: 'Hello',
            stderr: '',
            exitCode: 0,
          })
        )
      ),
      (p) => p()
    ))

  it('throws with unknown command', () =>
    pipe(
      $.spawnWithExitCode('somethingUnknown', ['one', 'two']),
      T.map((result) =>
        expect(result).toMatchObject(
          E.left({
            _tag: 'CommandNotFoundError',
            command: 'somethingUnknown',
          })
        )
      ),
      (p) => p()
    ))

  it('returns exit code', () =>
    pipe(
      $.spawnWithExitCode('yarn', ['somethingUnknown']),
      T.map((result) =>
        expect(result).toMatchObject(
          E.right({
            exitCode: 1,
          })
        )
      ),
      (p) => p()
    ))
})
