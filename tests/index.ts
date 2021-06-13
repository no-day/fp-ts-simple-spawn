import * as $ from '../src'
import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/Either'
import * as T from 'fp-ts/Task'

describe('spawn', () => {
  it('prints to stdout', () =>
    pipe(
      $.spawn('yarn', ['-v']),
      T.map((result) =>
        expect(result).toStrictEqual(
          E.right({
            stdout: 'one two\n',
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
})
