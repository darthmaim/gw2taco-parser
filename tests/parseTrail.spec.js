/* eslint-env node, mocha */
import { expect } from 'chai';
import { parseTrail, parseTrailFromFile } from '../src/index';
import path from 'path';

// hex trail header (version 0 map 1337)
const header = '0000000039050000';
// trail ([1,2,3],[4,5,6])
const trail = '0000803f0000004000004040000080400000a0400000c040';
// separator ([0,0,0])
const separator = '000000000000000000000000';

const emptyTrailBuffer = new Buffer(header, 'hex');
const singleTrailBuffer = new Buffer(header + trail, 'hex');
const multiTrailBuffer = new Buffer(header + trail + separator + trail, 'hex');

function trailFile(name) {
    return path.join(__dirname, 'data', name);
}

describe('parseTrail', () => {
    it('should parse empty trail', () => {
        expect(emptyTrailBuffer).to.have.length(8);

        const trail = parseTrail(emptyTrailBuffer);

        expect(trail.version).to.equal(0);
        expect(trail.mapId).to.equal(1337);
        expect(trail.trails).to.have.length(0);
    });

    it('should parse empty trail file', () => {
        return parseTrailFromFile(trailFile('emptyTrail.trl')).then((trail) => {
            expect(trail.version).to.equal(0);
            expect(trail.mapId).to.equal(1337);
            expect(trail.trails).to.have.length(0);
        });
    });

    it('should reject non existing files', (done) => {
        parseTrailFromFile(trailFile('does-not-exist.trl')).catch(() => {
            done();
        });
    })

    it('should parse single trail', () => {
        const trail = parseTrail(singleTrailBuffer);

        expect(trail.version).to.equal(0);
        expect(trail.mapId).to.equal(1337);
        expect(trail.trails).to.have.length(1);
        expect(trail.trails[0]).to.have.length(2);
        expect(trail.trails[0]).to.deep.equal([[1,2,3],[4,5,6]]);
    });

    it('should parse multiple trails', () => {
        const trail = parseTrail(multiTrailBuffer);

        expect(trail.version).to.equal(0);
        expect(trail.mapId).to.equal(1337);
        expect(trail.trails).to.have.length(2);
        expect(trail.trails[0]).to.have.length(2);
        expect(trail.trails[1]).to.have.length(2);
        expect(trail.trails[0]).to.deep.equal([[1,2,3],[4,5,6]]);
        expect(trail.trails[1]).to.deep.equal([[1,2,3],[4,5,6]]);
    });

    it('should error on unsopported version', () => {
        const buffer = new Buffer('2a00000039050000', 'hex');

        expect(parseTrail.bind(null, buffer)).to.throw('Unsupported trail version 42.');
    })

    it('should parse complex trail', () => {
        return parseTrailFromFile(trailFile('tw_lws3_emberbay_petrifiedstumps.trl')).then((trail) => {
            expect(trail.version).to.equal(0);
            expect(trail.mapId).to.equal(1175);
            expect(trail.trails).to.have.length(16);
        });
    })
});
