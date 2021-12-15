import { events, google } from './teleport';
import uuid from "as-uuid";

export function genEventMetadata(type: string): events.Metadata {
    const m = new events.Metadata();

    m.ClusterName = "test-cluster";
    m.Type = type;
    m.ID = uuid();
    
    return m;
}