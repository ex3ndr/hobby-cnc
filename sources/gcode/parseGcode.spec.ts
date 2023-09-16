import { parseGcode } from "./parseGcode";

describe('parseGcode', () => {
    it('should parse a single line', () => {
        let parsed = parseGcode('G1 X10 Y10 Z10 F1000');
        expect(parsed).toMatchInlineSnapshot(`
[
  {
    "gcode": "G1",
    "params": {
      "F": 1000,
      "X": 10,
      "Y": 10,
      "Z": 10,
    },
  },
]
`);
    });
});