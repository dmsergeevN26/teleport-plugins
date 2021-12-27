export function ok():i32 {
    return 1;
}

export function fail():i32 {
    throw new Error("Failure");
}

export function infinite():i32 {
    while(1);
}