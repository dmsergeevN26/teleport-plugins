import { events } from './vendor/teleport';
export { __protobuf_alloc, __protobuf_free, __protobuf_getAddr, __protobuf_getLength, __protobuf_setu8 } from './vendor/teleport';

export function handleEvent(eventData: DataView): DataView | null {
    const event = events.OneOf.decode(eventData);
    return null;
}