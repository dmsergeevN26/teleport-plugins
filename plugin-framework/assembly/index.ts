import { events } from './vendor/teleport';
export { __protobuf_alloc, __protobuf_free, __protobuf_getAddr, __protobuf_getLength, __protobuf_setu8 } from './vendor/teleport';

type Event = events.OneOf;

export function handleEvent(eventData: DataView): Array<u8> | null {
    let event:Event | null = events.OneOf.decode(eventData);
    if (event == null) {
        trace("Failed to decode Event from protobuf!")
        return null
    }

    event = hideEvent(event);
    if (event == null) {
        return null;
    }

    event = addRequiredLabels(event);
    if (event == null) {
        return null;
    }

    event = createLockBasedOnEvent(event);
    if (event == null) {
        return null;
    }

    return event.encode();
}

function hideEvent(event: Event): Event | null {
    // Hide session print event
    if (event.SessionPrint != null) {
        return null;
    }

    // Hide secret-santa logins
    if (event.UserLogin != null) {
        if (event.UserLogin.User != null) {
            if (event.UserLogin.User.Login == "secret-santa") {
                return null;
            }
        }
    }

    return event;
}

function addRequiredLabels(event: Event): Event | null {
    return null;
}

function createLockBasedOnEvent(event: Event): Event | null {
    return null;
}