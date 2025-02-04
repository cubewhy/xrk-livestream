export interface Message {
    user: string;
    content: string;
}

export interface LiveConfig {
    s: string; // stream server
    c: string; // chat server
}