import { getFixture } from './vendor/test';
import { handleEvent } from '.';
import { events } from './vendor/teleport';

export { __protobuf_alloc, __protobuf_free, __protobuf_getAddr, __protobuf_getLength, __protobuf_setu8 } from './vendor/teleport';
export { handleEvent } from './index';

export function test():void {
    trace("teleport-plugin-framework tests")

    testRegularEvent();
    testSkipLoginSecretSanta();
    testAddAnnotations();

    trace("Success!")
}

function testRegularEvent():void {
    const createMeData = getFixture(1)
    assert(handleEvent(createMeData) != null, "Regular event is handled")
}

function testSkipLoginSecretSanta():void {
    const loginSecretSantaData = getFixture(2)
    assert(handleEvent(loginSecretSantaData) == null, "Skip secret-santa login")
}

function testAddAnnotations():void {
    const testAccessRequest = getFixture(3)
    const result = handleEvent(testAccessRequest)
    assert(result != null, "Request is processed")

    // NOTE: This block will be wrapped into test helper || decode/encode signatures will operate StaticArray
    const a = result as Array<u8>
    const v = new DataView(new ArrayBuffer(a.length));
    for (let i:i32 = 0; i < a.length; i++) {
        v.setUint8(i, a.at(i))
    }
    // NOTE: -----

    const changedEvent = events.OneOf.decode(v);
    assert(changedEvent.AccessRequestCreate != null, "AccessRequestCreate is present")

    const changedAccessRequest = changedEvent.AccessRequestCreate as events.AccessRequestCreate;
    assert(changedAccessRequest.Annotations.fields.get("seen-by-us").string_value == "yes", "changed-by-us annotation is set")
}

