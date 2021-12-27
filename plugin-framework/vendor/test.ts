// Returns size of a fixture with number n
export declare function getFixtureSize(n: i32): i32;

// Copies fixture number n to the addr
export declare function getFixtureBody(n: i32, addr: usize): void;

// Returns DataView of a fixture number n
export function getFixture(n: i32): DataView {
    const size = getFixtureSize(n);
    const view = new DataView(new ArrayBuffer(size));
    getFixtureBody(n, changetype<usize>(view.buffer) + view.byteOffset);
    return view;
}

// Helper method, TODO: think of using same sigs on encode/decode
export function arrayToDataView(source: Array<u8>): DataView {
    const v = new DataView(new ArrayBuffer(source.length));
    for (let i: i32 = 0; i < source.length; i++) {
        v.setUint8(i, source.at(i))
    }
    return v;
}