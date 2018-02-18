import fs from 'fs';

/**
 * Parse trail data from Buffer.
 * 
 * @param {Buffer} trail
 */
export function parseTrail(trail) {
    // read 4-byte version
    const version = trail.readInt32LE(0);
    
    switch(version) {
        case 0: return parseTrailV0(trail, 0);
        default: throw new Error(`Unsupported trail version ${version}.`);
    }
}

function parseTrailV0(trail, version) {
    // 4-byte map id
    const mapId = trail.readInt32LE(4);

    // read trails
    let trails = [[]];

    // trails start at offset 8
    let offset = 8;
    while(offset < trail.length) {
        // read 3 * 4-byte floats (x, y, z)
        const pos = [
            trail.readFloatLE(offset + 0),
            trail.readFloatLE(offset + 4),
            trail.readFloatLE(offset + 8)
        ];

        if(pos[0] === 0 && pos[1] === 0 && pos[2] === 0) {
            // if x, y and z are 0 a new trail is started
            trails.push([]);
        } else {
            // otherwise add the position to the last trail
            trails[trails.length - 1].push(pos);
        }

        // increase the current offset by 3*4 bytes
        offset += 12;
    }

    // remove empty trails
    trails = trails.filter((trail) => trail.length !== 0);

    // return the parsed trail data.
    return { version, mapId, trails };
}

/**
 * Parse trail data from *.trl-file.
 * 
 * @param {string} filename 
 */
export function parseTrailFromFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, trail) => {
            if(err) {
                return reject(err);
            }

            return resolve(parseTrail(trail));
        });
    });
}
