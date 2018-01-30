// Helpers --------------------------------------------------------------------
/**
 * Parses the Accept Header mostly according to RFC7231 Sec. 5.3.2.
 * Note that this doesn't handle any additional parameters besides quality (;q=...), it discards them instead
 * @param accepts The recieved Accept header
 */
export function sortAcceptHeader(accepts: string = "*/*"): string[] {
    // Regex that matches every format and each formats q value, ignoring the rest
    const regex = RegExp(/([\w*]+\/[\w.+\*]+)(?:(?:;)(?:(?:q=)(\d(?:.\d)?)|(?:[\w]*=)(?:\d(?:.\d)?)))*/,'g');
    let regexMatches;
    
    const accQuality: {
        format: string,
        quality: number,
        specificity: number
    }[] = [];

    // Extract formats with their corresponding qualities
    while ((regexMatches = regex.exec(accepts)) !== null) {
        accQuality.push({
            format: regexMatches[1],
            quality: Number(regexMatches[2]) || 1,
            specificity: 2 - (regexMatches[1].match(/\*/g) || []).length // Ranks the formats by how specific they're defined. Example: text/plain > text/* > */*
        });
    }
    
    // Sort array by specificity and quality, descending
    accQuality
        .sort((a, b) => b.specificity - a.specificity)
        .sort((a, b) => b.quality - a.quality);
    
    let result: string[] = [];
    
    // Copy the formats in descending order of quality, omitting the quality value
    accQuality.forEach((element) => {
        result.push(element.format);
    });

    // Delete duplicates
    result = [...new Set(result)];

    return result;
}