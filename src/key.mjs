import { PitchName } from "./pitchName"
import { Scale } from "./scale"
import * as Utils from "./utils"


export class Key
{
	constructor(tonic, scale)
	{
		this.tonic = tonic
		this.scale = scale
	}
	
	
	static fromTonicAndScale(tonic, scale)
	{
		return new Key(tonic, scale)
	}
	
	
	static parse(str)
	{
		str = str.toLowerCase().trim()
		
		const separator = str.indexOf(" ")
		if (separator < 1)
			throw "invalid key string"
		
		const tonicStr = str.substr(0, separator)
		const scaleStr = str.substr(separator)
		
		const tonic = PitchName.parse(tonicStr)
		const scale = Scale.fromName(scaleStr)
		
		return new Key(tonic, scale)
	}
	
	
	toString()
	{
		const scaleStr = this.scale.name || "Unknown Scale"
		const tonicStr = this.tonic.name
		
		return tonicStr + " " + scaleStr
	}
	
	
	degreeForPitch(pitch)
	{
		const midiPitch = pitch.midiPitch
	
		const relativePitch = Utils.mod(midiPitch - this.tonic.midiPitch, 12)
		
		const scaleLen = this.scale.pitches.length
		
		let degree = scaleLen - 0.5
		for (let i = 0; i < scaleLen; i++)
		{
			if (relativePitch == this.scale.pitches[i])
			{
				degree = i
				break
			}
			
			if (relativePitch < this.scale.pitches[i])
			{
				degree = Utils.mod(i - 0.5, scaleLen)
				break
			}
		}
		
		return degree + scaleLen * Math.floor((midiPitch - Utils.mod(this.tonic.midiPitch, 12)) / 12)
	}
	
	
	pitchForDegree(degree)
	{
		const degreeClamped = Utils.mod(degree, 7)
		const degreeOctave = Math.floor(degree / 7)
		
		return Utils.mod(this.tonic.midiPitch, 12) + this.scale.pitches[Math.floor(degreeClamped)] + degreeOctave * 12
	}
	
	
	pitchNameForPitch(pitch, extraAccidental = 0)
	{
		const degree = this.degreeForPitch(pitch)
		
		const letter     = Utils.mod(this.tonic.letter + Math.floor(degree), 7)
		const accidental = extraAccidental + Utils.mod(pitch.midiPitch - Utils.letterToChromatic[letter] + 6, 12) - 6
		
		return PitchName.fromLetterAndAccidental(letter, accidental)
	}
}