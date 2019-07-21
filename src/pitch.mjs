import { PitchName } from "./pitchName"
import { mod } from "./utils"


export class Pitch
{
	constructor(midiPitch)
	{
		this.midiPitch = midiPitch
	}
	

	static fromMidi(midiPitch)
	{
		return new Pitch(midiPitch)
	}
	
	
	static fromOctaveAndPitchClass(octave, pitchClass)
	{
		return Pitch.fromMidi(12 * octave + pitchClass)
	}
	
	
	static fromOctaveAndName(octave, pitchName)
	{
		return Pitch.fromMidi(12 * octave + pitchName.midiPitch)
	}
	
	
	static parse(str)
	{
		const pitchName = PitchName.parse(str)
		
		str = str.toLowerCase().trim()
		
		// Determine octave
		let octave = 0
		for (let i = 1; i < str.length; i++)
		{
			const c = str.charCodeAt(i)
			
			if (c == "-".charCodeAt(0) || (c >= "0".charCodeAt(0) && c <= "9".charCodeAt(0)))
			{
				octave = parseInt(str.substr(i))
				break
			}
		}
		
		if (octave === undefined || octave === null || isNaN(octave) || !isFinite(octave))
			throw "invalid pitch string"
		
		return Pitch.fromOctaveAndName(octave, pitchName)
	}
	
	
	get frequency()
	{
		return Math.pow(2, (this.midiPitch - 69) / 12) * 440
	}
	
	
	get octave()
	{
		return Math.floor(this.midiPitch / 12)
	}
	
	
	get pitchClass()
	{
		return mod(this.midiPitch, 12)
	}
	
	
	get name()
	{
		return this.pitchName.name + this.octave
	}
	
	
	get pitchName()
	{
		return this.pitchNameInKey(null)
	}
	
	
	pitchNameInKey(key)
	{
		if (!key)
			return PitchName.fromMidi(this.midiPitch)
			
		return key.pitchNameForPitch(this)
	}
}