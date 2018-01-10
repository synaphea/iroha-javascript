/// <reference types="node" />
export declare function createKeyPair(): IKeyPair;
export declare function sign(opt: {
    publicKey: string;
    privateKey: string;
    message: string;
}): string;
export declare function verify(opt: {
    publicKey: string;
    message: string;
    signature: string;
}): any;
export interface IKeyPair {
    privateKey: string;
    publicKey: string;
}
export interface IWallet {
    privateKey: Buffer;
    publicKey: Buffer;
}
export declare class Wallet implements IWallet {
    privateKey: Buffer;
    publicKey: Buffer;
    constructor(keyPair?: IWallet);
    toJSON(): IKeyPair;
    sign(msg: string): string;
}
