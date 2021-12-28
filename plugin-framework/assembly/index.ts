import { events } from '../vendor/teleport';
import { google } from '../vendor/teleport';
export {
    __protobuf_alloc,
    __protobuf_getAddr,
    __protobuf_getLength,
} from '../vendor/teleport';

type Event = events.OneOf;

export function handleEvent(eventData: DataView): DataView | null {
    let event:Event | null = events.OneOf.decode(eventData);
    if (event == null) {
        throw new Error("Failed to decode Event from protobuf!")
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

    return event.encodeDataView();
}

// Hides secret-santa user logins
function hideEvent(event: Event): Event | null {
    if (event.UserLogin != null) {
        const userLogin = event.UserLogin as events.UserLogin
        if (userLogin.User.Login == "secret-santa") {
            return null;
        }
    }

    return event;
}

function addRequiredLabels(event: Event): Event | null {
    if (event.AccessRequestCreate != null) {
        const request = event.AccessRequestCreate as events.AccessRequestCreate;

        const value = new google.protobuf.Value()
        value.string_value = "yes"

        request.Annotations.fields.set("seen-by-us", value)
    }

    return event;
}

function createLockBasedOnEvent(event: Event): Event | null {
    return event;
}