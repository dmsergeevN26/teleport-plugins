import { events, google, types } from '../vendor/teleport';
import * as store from '../vendor/store';
import { upsertLock } from '../vendor/api';

export {
    __protobuf_alloc,
    __protobuf_getAddr,
    __protobuf_getLength,
} from '../vendor/teleport';

type Event = events.OneOf;

const maxFailedLoginAttempts = 3;     // 3 tries
const failedAttemptsTimeout = 60 * 5; // within 5 minutes

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

// Adds label to access request create
function addRequiredLabels(event: Event): Event | null {
    if (event.AccessRequestCreate != null) {
        const request = event.AccessRequestCreate as events.AccessRequestCreate;

        const value = new google.protobuf.Value()
        value.string_value = "yes"

        request.Annotations.fields.set("seen-by-us", value)
    }

    if (event.RoleCreate != null) {
        const roleCreate = event.RoleCreate as events.RoleCreate;

        roleCreate.Metadata.ClusterName = "changed-cluster-name"
    }

    return event;
}

function createLockBasedOnEvent(event: Event): Event | null {
    if (event.UserLogin != null) {
        const login = event.UserLogin as events.UserLogin;
        const count = store.takeToken(login.User.Login, failedAttemptsTimeout) // 5 minutes
        if (count > maxFailedLoginAttempts) {
            trace("Suspicious login activity detected, attempts made:", 1, count)

            const lock = new types.LockV2()
            lock.Metadata = new types.Metadata()
            lock.Metadata.Name = "wasm-plugin-lock-" + login.User.Login;

            lock.Spec = new types.LockSpecV2()
            lock.Spec.Message = "Suspicious login"
            lock.Spec.Target = new types.LockTarget()
            lock.Spec.Target.Login = login.User.Login;
            lock.Spec.Target.User = login.User.User;
            
            lock.Spec.Expires = new google.protobuf.Timestamp()
            lock.Spec.Expires.seconds = Date.now() + 3600;

            const encoded = lock.encodeDataView()
            upsertLock(changetype<usize>(encoded))
        }
    }

    return event;
}