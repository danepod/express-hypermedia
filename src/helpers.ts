// Helpers --------------------------------------------------------------------
/**
 * Parses the Accept Header mostly according to RFC2616 Sec. 14.1
 * Note that this doesn't handle any additional parameters besides quality (;q=...), it discards them instead
 * @param accepts The recieved Accept header
 */
export function sortAcceptHeader(accepts: string): string[] {
    // Regex that matches every format and each formats q value, ignoring the rest
    const regex = RegExp(/([\w*]+\/[\w.+\*]+)(?:(?:;)(?:(?:q=)(\d(?:.\d)?)|(?:[\w]*=)(?:\d(?:.\d)?)))*/,'g');
    let regexMatches;
    
    const accQuality: {
        format: string,
        quality: number
    }[] = [];

    // Extract formats with their corresponding qualities
    while ((regexMatches = regex.exec(accepts)) !== null) {
        accQuality.push({
            format: regexMatches[1],
            quality: Number(regexMatches[2]) || 1
        });
    }
    
    // Sort array by quality, descending
    accQuality.sort((a, b) => {
        return b.quality - a.quality
    });
    
    let result: string[] = [];
    
    // Copy the formats in descending order of quality, omitting the quality value
    accQuality.forEach((element) => {
        result.push(element.format);
    });

    // Delete duplicates
    result = [...new Set(result)];

    return result;
}