export declare function getFixture(n: i32): DataView;

// Helper method, TODO: think of using same sigs on encode/decode
export function arrayToDataView(source: Array<u8>): DataView {
    const v = new DataView(new ArrayBuffer(source.length));
    for (let i: i32 = 0; i < source.length; i++) {
        v.setUint8(i, source.at(i))
    }
    return v;
}