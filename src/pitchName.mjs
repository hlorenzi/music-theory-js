import * as Utils from "./utils"


export class PitchName
{
	constructor(letter, accidental)
	{
		this.letter = letter
		this.accidental = accidental
	}
	

	static fromMidi(midiPitch)
	{
		const pitchInOctave = Utils.mod(midiPitch, 12)
		
		const letter     = Utils.chromaticToLetters[pitchInOctave]
		const accidental = Utils.chromaticToAccidentals[pitchInOctave]
		
		return new PitchName(letter, accidental)
	}
	
	
	static fromLetterAndAccidental(letter, accidental)
	{
		return new PitchName(letter, accidental)
	}
	
	
	static parse(str)
	{
		if (str.length < 1)
			throw "invalid pitch string"
		
		str = str.toLowerCase().trim()
		
		// Determine letter
		const letterStr = str[0]
		const letter = Utils.strToLetters[letterStr]
		
		if (letter === undefined)
			throw "invalid pitch string"
		
		// Determine accidental
		let accidental = 0
		for (let i = 1; i < str.length; i++)
		{
			const c = str.charCodeAt(i)
			
			if (c == "b".charCodeAt(0) || c == "♭".charCodeAt(0))
				accidental -= 1
				
			else if (c == "#".charCodeAt(0) || c == "♯".charCodeAt(0))
				accidental += 1
		}
		
		return new PitchName(letter, accidental)
	}
	
	
	get midiPitch()
	{
		return Utils.letterToChromatic[this.letter] + this.accidental
	}
	
	
	get pitchClass()
	{
		return Utils.mod(this.midiPitch, 12)
	}
	
	
	get name()
	{
		return this.nameWithAccidental()
	}
	
	
	nameWithAccidental(extraAccidental = 0)
	{
		const letterStr     = Utils.letterToStr[this.letter]
		const accidentalStr = Utils.accidentalToStr(this.accidental + extraAccidental)
			
		return letterStr + accidentalStr
	}
}