import { getFixture, arrayToDataView } from '../vendor/test';
import { handleEvent } from '.';
import { events } from '../vendor/teleport';

export { 
    __protobuf_alloc,
    __protobuf_free,
    __protobuf_getAddr,
    __protobuf_getLength,
} from '../vendor/teleport';
export { handleEvent } from './index';

// Main test function
export function test(): void {
    trace("teleport-plugin-framework tests")

    testRegularEvent();
    testSkipLoginSecretSanta();
    testAddAnnotation();

    trace("Success!")
}

// Ensure that nomal event passes through
function testRegularEvent(): void {
    const createMeData = getFixture(1)
    assert(handleEvent(createMeData) != null, "Regular event is handled")
}

// Ensure that secret santa login hids
function testSkipLoginSecretSanta(): void {
    const loginSecretSantaData = getFixture(2)
    assert(handleEvent(loginSecretSantaData) == null, "Skip secret-santa login")
}

// Ensure that custom annotation is added to the create access request
function testAddAnnotation(): void {
    const testAccessRequest = getFixture(3)
    const result = handleEvent(testAccessRequest)
    assert(result != null, "Request is processed")

    const changedEvent = events.OneOf.decode(result as DataView);
    assert(changedEvent.AccessRequestCreate != null, "AccessRequestCreate is present")

    const changedAccessRequest = changedEvent.AccessRequestCreate as events.AccessRequestCreate;
    assert(
        changedAccessRequest.Annotations.fields.get("seen-by-us").string_value == "yes", 
        "seen-by-us annotation is set"
    )
}

