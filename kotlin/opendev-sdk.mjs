
import { instantiate } from './opendev-sdk.uninstantiated.mjs';


const exports = (await instantiate({
})).exports;

export const {
wasmJsDataCallback,
memory,
_initialize
} = exports


