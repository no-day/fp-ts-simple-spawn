import { flow, pipe } from 'fp-ts/lib/function'
import * as $ from '../src'
import * as TE from 'fp-ts/TaskEither'
import * as C from 'fp-ts/Console'
import * as T from 'fp-ts/lib/Task'

const print = flow(
  TE.match(
    (error) => JSON.stringify(error, null, 2),
    (result) => JSON.stringify(result, null, 2)
  ),
  T.chain((msg) => T.fromIO(C.log(msg)))
)

pipe($.spawnWithExitCode('cat', ['--help'], {}), print)()

pipe($.spawnWithExitCode('cat', [], { stdin: 'dog' }), print)()
