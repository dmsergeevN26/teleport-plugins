import { getFixture, arrayToDataView } from './vendor/test';
import { handleEvent } from '.';
import { events } from './vendor/teleport';

export { __protobuf_alloc, __protobuf_free, __protobuf_getAddr, __protobuf_getLength, __protobuf_setu8 } from './vendor/teleport';
export { handleEvent } from './index';

export function test(): void {
    trace("teleport-plugin-framework tests")

    testRegularEvent();
    testSkipLoginSecretSanta();
    testAddAnnotations();

    trace("Success!")
}

function testRegularEvent(): void {
    const createMeData = getFixture(1)
    assert(handleEvent(createMeData) != null, "Regular event is handled")
}

function testSkipLoginSecretSanta(): void {
    const loginSecretSantaData = getFixture(2)
    assert(handleEvent(loginSecretSantaData) == null, "Skip secret-santa login")
}

function testAddAnnotations(): void {
    const testAccessRequest = getFixture(3)
    const result = handleEvent(testAccessRequest)
    assert(result != null, "Request is processed")

    const changedEvent = events.OneOf.decode(arrayToDataView(result as Array<u8>));
    assert(changedEvent.AccessRequestCreate != null, "AccessRequestCreate is present")

    const changedAccessRequest = changedEvent.AccessRequestCreate as events.AccessRequestCreate;
    assert(
        changedAccessRequest.Annotations.fields.get("seen-by-us").string_value == "yes", 
        "seen-by-us annotation is set"
    )
}

