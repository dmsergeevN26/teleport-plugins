import { getFixture } from './vendor/test';
import { handleEvent } from '.';

export { __protobuf_alloc, __protobuf_free, __protobuf_getAddr, __protobuf_getLength, __protobuf_setu8 } from './vendor/teleport';
export { handleEvent } from './index';

export function test():void {
    trace("teleport-plugin-framework tests")

    testSkipPrintEvent();

    trace("Success!")
}

function testSkipPrintEvent():void {
    const createUserData = getFixture(1)
    handleEvent(createUserData)

    // const printEvent = new events.SessionPrint()
    // printEvent.Metadata = fixtures.genEventMetadata("print-event")    
    // const event = new events.OneOf();
    // event.SessionPrint = printEvent;

    // const encoded = event.encode()
    // // -> protobuf-as:encodeAsDataView(), that would be used in tests only
    // const data = new DataView(new ArrayBuffer(encoded.length));
    // for (let i:i32 = 0; i < data.byteLength; i++) {
    //     data.setUint8(i, encoded.at(i))
    // }

    // const result = handleEvent(data);
    // const result = 0;
    //assert(result == null, "Print event is skipped")
}