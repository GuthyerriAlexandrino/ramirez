export function formatBytes(bytes: number, decimal = 2) {
    if (bytes === 0 || bytes === undefined) {
        return {
            value: 0,
            sizes: "bytes"
        }
    }

    const base = 1024;
    const sizes = ['bytes', 'kb', 'mb'];
    const index = Math.floor(Math.log(bytes) / Math.log(base));
    const calcValueOfBytes = parseFloat((bytes / Math.pow(1000, index)).toFixed(decimal))
    
    return {
        value: calcValueOfBytes,
        sizes: sizes[index]
    }
}