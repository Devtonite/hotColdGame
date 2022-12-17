import {
  Circuit,
  Experimental,
  Field,
  SelfProof,
  Struct,
  UInt32,
} from 'snarkyjs';

export class gameState extends Struct({
  solutionHash: Field,
  lastGuess: Field,
  numTurns: UInt32,
  hint: UInt32,
}) {}

export const SimpleProgram = Experimental.ZkProgram({
  publicInput: gameState,

  methods: {
    initState: {
      privateInputs: [],

      method(publicInput: gameState) {
        publicInput.lastGuess.assertEquals(Field(-1));
        publicInput.numTurns.assertEquals(UInt32.from(0));
        publicInput.hint.assertEquals(UInt32.from(0));
      },
    },

    guess: {
      privateInputs: [Field, SelfProof],

      method(
        publicInput: gameState,
        myGuess: Field,
        prevProof: SelfProof<gameState>
      ) {
        prevProof.verify();
        // publicInput.numTurns.assertEquals(myTurnNum);
        Circuit.if(
          publicInput.solutionHash.equals(myGuess),
          publicInput.hint.assertEquals(UInt32.from(2)),
          publicInput.hint.assertEquals(UInt32.from(1))
          // Circuit.if(
          //   publicInput.solutionHash.gt(myGuess),
          //   publicInput.hint.assertEquals(UInt32.from(1)),
          //   publicInput.hint.assertEquals(UInt32.from(3))
          // )
        );
        // publicInput.numTurns.add(UInt32.from(1))
      },
    },

    checkGuess: {
      privateInputs: [UInt32, SelfProof],

      method(
        publicInput: gameState,
        hintVal: UInt32,
        prevProof: SelfProof<gameState>
      ) {
        prevProof.verify();
        publicInput.hint.assertEquals(hintVal);
      },
    },
  },
});
