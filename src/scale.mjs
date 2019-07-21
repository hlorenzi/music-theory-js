export const knownScales =
[
	{ pitches: [0, 2, 4, 5, 7, 9, 11], mode: 0, code: "maj", names: ["Major", "Ionian"] },
	{ pitches: [0, 2, 3, 5, 7, 9, 10], mode: 1, code: "dor", names: ["Dorian"] },
	{ pitches: [0, 1, 3, 5, 7, 8, 10], mode: 2, code: "phr", names: ["Phrygian"] },
	{ pitches: [0, 2, 4, 6, 7, 9, 11], mode: 3, code: "lyd", names: ["Lydian"] },
	{ pitches: [0, 2, 4, 5, 7, 9, 10], mode: 4, code: "mix", names: ["Mixolydian"] },
	{ pitches: [0, 2, 3, 5, 7, 8, 10], mode: 5, code: "min", names: ["Natural Minor", "Minor", "Aeolian"] },
	{ pitches: [0, 1, 3, 5, 6, 8, 10], mode: 6, code: "loc", names: ["Locrian"] },
	
	{ pitches: [0, 1, 4, 5, 7, 8, 11], mode: 0, code: "dharmaj", names: ["Double Harmonic Major"] },
]


export class Scale
{
	constructor(pitches, name, code, mode)
	{
		this.pitches = pitches
		this.name = name
		this.code = code
		this.mode = mode
	}
	
	
	static fromName(name)
	{
		name = name.toLowerCase().trim()
		
		const knownScale = knownScales.find(s => s.names.some(n => n.toLowerCase() == name))
		if (!knownScale)
			throw "no known scale with given name"
		
		return new Scale(knownScale.pitches, knownScale.names[0], knownScale.code, knownScale.mode)
	}
	
	
	static fromPitches(pitches)
	{
		const knownScale = knownScales.find(s =>
			s.pitches.length == pitches.length &&
			s.pitches.every((p, index) => p == pitches[index])
		)
		
		if (!knownScale)
			throw "no known scale with given pitches"
		
		return new Scale(knownScale.pitches, knownScale.names[0], knownScale.code, knownScale.mode)
	}
	
	
	static custom(pitches, data = {})
	{
		return Object.assign(new Scale(pitches, null, null, null), data)
	}
}