import { sleep } from 'as-sleep';
import { events } from '../vendor/teleport';

export {
    __protobuf_alloc,
    __protobuf_free,
    __protobuf_getAddr,
    __protobuf_getLength,
} from '../vendor/teleport';

export function ok():i32 {
    return 1;
}

export function fail():i32 {
    throw new Error("Failure");
}

export function infinite():i32 {
    while(1);
}

export function delay100ms(): void {
    sleep(100);
}

export function validatePBMessage(view: DataView):bool {
    return true
    const event = events.OneOf.decode(view)
    if (event.UserCreate == null) {
        return false
    }
    const userCreate = event.UserCreate as events.UserCreate;
    return userCreate.Metadata.ClusterName == "test-cluster"
}