import { sleep } from 'as-sleep';
import { events } from '../vendor/teleport';

export {
    __protobuf_alloc,
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

export function validatePBMessage(view: DataView):i64 {
    const event = events.OneOf.decode(view)
    __unpin(changetype<usize>(view))
    if (event.UserCreate == null) {
        return 0
    }
    const userCreate = event.UserCreate as events.UserCreate;
    return userCreate.Metadata.Index
}