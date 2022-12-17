import { Experimental, Field, Poseidon, Struct, UInt32 } from 'snarkyjs';

export class gameState extends Struct({
  solutionHash: Field,
  lastGuess: Field,
  numTurns: UInt32,
}) {}

export const SimpleProgram = Experimental.ZkProgram({
  publicInput: gameState,

  methods: {
    initState: {
      privateInputs: [Field, Field],

      method(publicInput: gameState, salt: Field, winningNum: Field) {
        publicInput.solutionHash = Poseidon.hash([salt, winningNum]);
        publicInput.lastGuess = Field(-1);
        publicInput.numTurns = UInt32.from(0);
      },
    },
  },
});
