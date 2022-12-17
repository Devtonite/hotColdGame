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

  const serverSolutionHash = Field(75);

  let zeroState = new gameState({
    solutionHash: serverSolutionHash,
    lastGuess: Field(-1),
    numTurns: UInt32.from(0),
    hint: UInt32.from(0),
  });

  // Initialize Game State PROOF
  tic('proof0');
  // const proof0 =
  await SimpleProgram.initState(zeroState);
  toc();

  //send this proof to player to start game:

  //player guess 1
  // let playerState = new gameState({
  //   solutionHash: serverSolutionHash,
  //   lastGuess: Field(-1),
  //   numTurns: UInt32.from(0),
  //   hint: UInt32.from(0)
  // });

  // Turn 1:
  tic('proof1_0');
  // const proof1_0 = await SimpleProgram.guess(playerState, Field(70), proof0 )
  // toc();

  // tic('proof1_1');
  // const proof1_1 = await SimpleProgram.checkGuess(playerState, UInt32.from(1), proof1_0 )
  // toc();

  await shutdown();
})();
