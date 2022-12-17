import { Field, UInt32, isReady, shutdown } from 'snarkyjs';
import { SimpleProgram, gameState } from './recursion.js';
import { tic, toc } from './tictoc.js';

(async function main() {
  tic('SnarkyJs Loading');
  await isReady;
  toc();

  tic('Compiling');
  await SimpleProgram.compile();
  toc();

  let winState = new gameState({
    solutionHash: Field(0),
    lastGuess: Field(-1),
    numTurns: UInt32.from(0),
  });

  console.log(winState.solutionHash.toJSON());
  tic('proof0');
  // const proof0 =
  await SimpleProgram.initState(winState, Field(10), Field(75));
  toc();
  console.log(winState.solutionHash.toJSON());

  await shutdown();
})();
