export const chromaticToLetters     = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6]
export const chromaticToAccidentals = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]

export const letterToChromatic = [0, 2, 4, 5, 7, 9, 11]

export const letterToStr  = ["C",  "D",  "E",  "F",  "G",  "A",  "B"]
export const strToLetters = { c: 0, d: 1, e: 2, f: 3, g: 4, a: 5, b: 6 }

export const degreeToRomanStr = ["I", "II", "III", "IV", "V", "VI", "VII"]


export function mod(x, m)
{
	return (x % m + m) % m
}


export function accidentalToStr(accidental)
{
	if (accidental > 0)
		return "♯".repeat(accidental)
	
	if (accidental < 0)
		return "♭".repeat(-accidental)
	
	return ""
}


export function colorForDegree(degree)
{
	switch (mod(degree, 7))
	{
		case 0: return "#f00"
		case 1: return "#f80"
		case 2: return "#fd0"
		case 3: return "#0d0"
		case 4: return "#00f"
		case 5: return "#80f"
		case 6: return "#f0f"
		default: return "#aaa"
	}
}