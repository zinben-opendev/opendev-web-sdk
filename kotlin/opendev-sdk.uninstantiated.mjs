
export async function instantiate(imports={}, runInitializer=true) {
    imports['_cachedJsObjects_'] = imports['_cachedJsObjects_'] ?? new WeakMap();
    const cachedJsObjects = imports['_cachedJsObjects_'];

    // ref must be non-null
    function getCachedJsObject(ref, ifNotCached) {
        if (typeof ref !== 'object' && typeof ref !== 'function') return ifNotCached;
        const cached = cachedJsObjects.get(ref);
        if (cached !== void 0) return cached;
        cachedJsObjects.set(ref, ifNotCached);
        return ifNotCached;
    }






    const wasmJsTag = WebAssembly.JSTag;
    const wasmTag = wasmJsTag ?? new WebAssembly.Tag({ parameters: ['externref'] });

    const js_code = {
        'kotlin.createJsError' : (message, cause) => new Error(message, { cause }),
        'kotlin.wasm.internal.jsThrow' : wasmTag === wasmJsTag ? (e) => { throw e; } : () => {},
        'kotlin.wasm.internal.stringLength' : (x) => x.length,
        'kotlin.wasm.internal.jsExportStringToWasm' : (src, srcOffset, srcLength, dstAddr) => { 
            const mem16 = new Uint16Array(wasmExports.memory.buffer, dstAddr, srcLength);
            let arrayIndex = 0;
            let srcIndex = srcOffset;
            while (arrayIndex < srcLength) {
                mem16.set([src.charCodeAt(srcIndex)], arrayIndex);
                srcIndex++;
                arrayIndex++;
            }     
             },
        'kotlin.wasm.internal.importStringFromWasm' : (address, length, prefix) => { 
            const mem16 = new Uint16Array(wasmExports.memory.buffer, address, length);
            const str = String.fromCharCode.apply(null, mem16);
            return (prefix == null) ? str : prefix + str;
             },
        'kotlin.wasm.internal.getJsEmptyString' : () => '',
        'kotlin.wasm.internal.externrefToString' : (ref) => String(ref),
        'kotlin.wasm.internal.externrefEquals' : (lhs, rhs) => lhs === rhs,
        'kotlin.wasm.internal.externrefHashCode' : 
        (() => {
        const dataView = new DataView(new ArrayBuffer(8));
        function numberHashCode(obj) {
            if ((obj | 0) === obj) {
                return obj | 0;
            } else {
                dataView.setFloat64(0, obj, true);
                return (dataView.getInt32(0, true) * 31 | 0) + dataView.getInt32(4, true) | 0;
            }
        }
        
        const hashCodes = new WeakMap();
        function getObjectHashCode(obj) {
            const res = hashCodes.get(obj);
            if (res === undefined) {
                const POW_2_32 = 4294967296;
                const hash = (Math.random() * POW_2_32) | 0;
                hashCodes.set(obj, hash);
                return hash;
            }
            return res;
        }
        
        function getStringHashCode(str) {
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                var code  = str.charCodeAt(i);
                hash  = (hash * 31 + code) | 0;
            }
            return hash;
        }
        
        return (obj) => {
            if (obj == null) {
                return 0;
            }
            switch (typeof obj) {
                case "object":
                case "function":
                    return getObjectHashCode(obj);
                case "number":
                    return numberHashCode(obj);
                case "boolean":
                    return obj ? 1231 : 1237;
                default:
                    return getStringHashCode(String(obj)); 
            }
        }
        })(),
        'kotlin.wasm.internal.isNullish' : (ref) => ref == null,
        'kotlin.wasm.internal.intToExternref' : (x) => x,
        'kotlin.wasm.internal.getJsTrue' : () => true,
        'kotlin.wasm.internal.getJsFalse' : () => false,
        'kotlin.wasm.internal.newJsArray' : () => [],
        'kotlin.wasm.internal.jsArrayPush' : (array, element) => { array.push(element); },
        'kotlin.wasm.internal.getCachedJsObject_$external_fun' : (p0, p1) => getCachedJsObject(p0, p1),
        'kotlin.js.jsCatch' : (f) => { 
            let result = null;
            try { 
                f();
            } catch (e) {
               result = e;
            }
            return result;
             },
        'kotlin.js.__convertKotlinClosureToJsClosure_(()->Unit)' : (f) => getCachedJsObject(f, () => wasmExports['__callFunction_(()->Unit)'](f, )),
        'kotlin.js.jsThrow' : (e) => { throw e; },
        'kotlin.io.printlnImpl' : (message) => console.log(message),
        'kotlin.io.printError' : (error) => console.error(error),
        'kotlin.js.jsArrayGet' : (array, index) => array[index],
        'kotlin.js.length_$external_prop_getter' : (_this) => _this.length,
        'kotlin.js.stackPlaceHolder_js_code' : () => (''),
        'kotlin.js.message_$external_prop_getter' : (_this) => _this.message,
        'kotlin.js.name_$external_prop_setter' : (_this, v) => _this.name = v,
        'kotlin.js.stack_$external_prop_getter' : (_this) => _this.stack,
        'kotlin.js.kotlinException_$external_prop_getter' : (_this) => _this.kotlinException,
        'kotlin.js.kotlinException_$external_prop_setter' : (_this, v) => _this.kotlinException = v,
        'kotlin.js.JsError_$external_class_instanceof' : (x) => x instanceof Error,
        'kotlin.js.JsString_$external_class_instanceof' : (x) => typeof x === 'string',
        'kotlin.js.JsString_$external_class_get' : () => JsString,
        'kotlin.js.then_$external_fun' : (_this, p0) => _this.then(p0),
        'kotlin.js.__convertKotlinClosureToJsClosure_((Js?)->Js?)' : (f) => getCachedJsObject(f, (p0) => wasmExports['__callFunction_((Js?)->Js?)'](f, p0)),
        'kotlin.js.then_$external_fun_1' : (_this, p0, p1) => _this.then(p0, p1),
        'kotlin.js.__convertKotlinClosureToJsClosure_((Js)->Js?)' : (f) => getCachedJsObject(f, (p0) => wasmExports['__callFunction_((Js)->Js?)'](f, p0)),
        'kotlin.js.catch_$external_fun' : (_this, p0) => _this.catch(p0),
        'kotlin.random.initialSeed' : () => ((Math.random() * Math.pow(2, 32)) | 0),
        'kotlin.wasm.internal.getJsClassName' : (jsKlass) => jsKlass.name,
        'kotlin.wasm.internal.instanceOf' : (ref, jsKlass) => ref instanceof jsKlass,
        'kotlin.wasm.internal.getConstructor' : (obj) => obj.constructor,
        'kotlinx.io.node.sep_$external_prop_getter' : (_this) => _this.sep,
        'kotlinx.io.node.persistModule' : 
            (globalThis.module = (typeof process !== 'undefined') && (process.release.name === 'node') ?
                await import(/* webpackIgnore: true */'node:module') : void 0, () => {})
        ,
        'kotlinx.io.node.getRequire' : () => { 
            const importMeta = import.meta;
            return globalThis.module.default.createRequire(importMeta.url);
        }
        ,
        'kotlinx.io.node.requireModule' : 
            (require, mod) => {
                 try {
                     let m = require(mod);
                     if (m) return m;
                     return null;
                 } catch (e) {
                     return null;
                 }
            }
        ,
        'kotlinx.coroutines.tryGetProcess' : () => (typeof(process) !== 'undefined' && typeof(process.nextTick) === 'function') ? process : null,
        'kotlinx.coroutines.tryGetWindow' : () => (typeof(window) !== 'undefined' && window != null && typeof(window.addEventListener) === 'function') ? window : null,
        'kotlinx.coroutines.nextTick_$external_fun' : (_this, p0) => _this.nextTick(p0),
        'kotlinx.coroutines.error_$external_fun' : (_this, p0) => _this.error(p0),
        'kotlinx.coroutines.console_$external_prop_getter' : () => console,
        'kotlinx.coroutines.createScheduleMessagePoster' : (process) => () => Promise.resolve(0).then(process),
        'kotlinx.coroutines.__callJsClosure_(()->Unit)' : (f, ) => f(),
        'kotlinx.coroutines.createRescheduleMessagePoster' : (window) => () => window.postMessage('dispatchCoroutine', '*'),
        'kotlinx.coroutines.subscribeToWindowMessages' : (window, process) => {
            const handler = (event) => {
                if (event.source == window && event.data == 'dispatchCoroutine') {
                    event.stopPropagation();
                    process();
                }
            }
            window.addEventListener('message', handler, true);
        },
        'kotlinx.coroutines.setTimeout' : (window, handler, timeout) => window.setTimeout(handler, timeout),
        'kotlinx.coroutines.clearTimeout' : (handle) => { if (typeof clearTimeout !== 'undefined') clearTimeout(handle); },
        'kotlinx.coroutines.clearTimeout_$external_fun' : (_this, p0) => _this.clearTimeout(p0),
        'kotlinx.coroutines.setTimeout_$external_fun' : (p0, p1) => setTimeout(p0, p1),
        'org.khronos.webgl.getMethodImplForUint8Array' : (obj, index) => obj[index],
        'org.khronos.webgl.setMethodImplForInt8Array' : (obj, index, value) => { obj[index] = value; },
        'org.khronos.webgl.slice_$external_fun' : (_this, p0, p1, isDefault0) => _this.slice(p0, isDefault0 ? undefined : p1, ),
        'org.khronos.webgl.Uint8Array_$external_fun' : (p0, p1, p2, isDefault0, isDefault1) => new Uint8Array(p0, isDefault0 ? undefined : p1, isDefault1 ? undefined : p2, ),
        'org.khronos.webgl.length_$external_prop_getter' : (_this) => _this.length,
        'org.khronos.webgl.buffer_$external_prop_getter' : (_this) => _this.buffer,
        'org.khronos.webgl.byteOffset_$external_prop_getter' : (_this) => _this.byteOffset,
        'org.khronos.webgl.byteLength_$external_prop_getter' : (_this) => _this.byteLength,
        'org.khronos.webgl.Uint8Array_$external_class_instanceof' : (x) => x instanceof Uint8Array,
        'org.khronos.webgl.Uint8Array_$external_class_get' : () => Uint8Array,
        'org.khronos.webgl.Int8Array_$external_fun' : (p0) => new Int8Array(p0),
        'org.khronos.webgl.length_$external_prop_getter_1' : (_this) => _this.length,
        'org.w3c.dom.events.type_$external_prop_getter' : (_this) => _this.type,
        'org.w3c.dom.events.__convertKotlinClosureToJsClosure_((Js)->Unit)' : (f) => getCachedJsObject(f, (p0) => wasmExports['__callFunction_((Js)->Unit)'](f, p0)),
        'org.w3c.dom.events.addEventListener_$external_fun' : (_this, p0, p1) => _this.addEventListener(p0, p1),
        'org.w3c.dom.events.removeEventListener_$external_fun' : (_this, p0, p1) => _this.removeEventListener(p0, p1),
        'org.w3c.dom.readyState_$external_prop_getter' : (_this) => _this.readyState,
        'org.w3c.dom.protocol_$external_prop_getter' : (_this) => _this.protocol,
        'org.w3c.dom.binaryType_$external_prop_setter' : (_this, v) => _this.binaryType = v,
        'org.w3c.dom.close_$external_fun' : (_this, p0, p1, isDefault0, isDefault1) => _this.close(isDefault0 ? undefined : p0, isDefault1 ? undefined : p1, ),
        'org.w3c.dom.send_$external_fun' : (_this, p0) => _this.send(p0),
        'org.w3c.dom.send_$external_fun_1' : (_this, p0) => _this.send(p0),
        'org.w3c.dom.OPEN_$external_prop_getter' : (_this) => _this.OPEN,
        'org.w3c.dom.Companion_$external_object_getInstance' : () => WebSocket,
        'org.w3c.dom.data_$external_prop_getter' : (_this) => _this.data,
        'org.w3c.dom.code_$external_prop_getter' : (_this) => _this.code,
        'org.w3c.dom.reason_$external_prop_getter' : (_this) => _this.reason,
        'org.w3c.dom.Companion_$external_object_getInstance_1' : () => ({}),
        'org.w3c.fetch.status_$external_prop_getter' : (_this) => _this.status,
        'org.w3c.fetch.statusText_$external_prop_getter' : (_this) => _this.statusText,
        'org.w3c.fetch.headers_$external_prop_getter' : (_this) => _this.headers,
        'org.w3c.fetch.body_$external_prop_getter' : (_this) => _this.body,
        'org.w3c.fetch.get_$external_fun' : (_this, p0) => _this.get(p0),
        'org.w3c.fetch.Companion_$external_object_getInstance' : () => ({}),
        'io.ktor.utils.io.js.decode' : (decoder, buffer) => { try { return decoder.decode(buffer) } catch(e) { return null } },
        'io.ktor.utils.io.js.tryCreateTextDecoder' : (encoding, fatal) => { try { return new TextDecoder(encoding, { fatal: fatal }) } catch(e) { return null } },
        'io.ktor.utils.io.charsets.toJsArrayImpl' : (x) => new Int8Array(x),
        'io.ktor.util.date.Date_$external_fun' : () => new Date(),
        'io.ktor.util.date.Date_$external_fun_1' : (p0) => new Date(p0),
        'io.ktor.util.date.getTime_$external_fun' : (_this, ) => _this.getTime(),
        'io.ktor.util.date.getUTCDate_$external_fun' : (_this, ) => _this.getUTCDate(),
        'io.ktor.util.date.getUTCDay_$external_fun' : (_this, ) => _this.getUTCDay(),
        'io.ktor.util.date.getUTCFullYear_$external_fun' : (_this, ) => _this.getUTCFullYear(),
        'io.ktor.util.date.getUTCHours_$external_fun' : (_this, ) => _this.getUTCHours(),
        'io.ktor.util.date.getUTCMinutes_$external_fun' : (_this, ) => _this.getUTCMinutes(),
        'io.ktor.util.date.getUTCMonth_$external_fun' : (_this, ) => _this.getUTCMonth(),
        'io.ktor.util.date.getUTCSeconds_$external_fun' : (_this, ) => _this.getUTCSeconds(),
        'io.ktor.util.date.UTC_$external_fun' : (_this, p0, p1, p2, p3, p4, p5) => _this.UTC(p0, p1, p2, p3, p4, p5),
        'io.ktor.util.date.Companion_$external_object_getInstance' : () => Date,
        'io.ktor.util.hasNodeApi' : () => 
        (typeof process !== 'undefined' 
            && process.versions != null 
            && process.versions.node != null) ||
        (typeof window !== 'undefined' 
            && typeof window.process !== 'undefined' 
            && window.process.versions != null 
            && window.process.versions.node != null)
        ,
        'io.ktor.util.logging.getKtorLogLevel' : () => process ? process.env.KTOR_LOG_LEVEL : null,
        'io.ktor.util.logging.warn_$external_fun' : (_this, p0) => _this.warn(p0),
        'io.ktor.util.logging.debug_$external_fun' : (_this, p0) => _this.debug(p0),
        'io.ktor.util.logging.console_$external_prop_getter' : () => console,
        'io.ktor.http.locationOrigin' : () => function() {
            var tmpLocation = null
            if (typeof window !== 'undefined') {
              tmpLocation = window.location
            } else if (typeof self !== 'undefined') {
              tmpLocation = self.location
            }
            var origin = ""
            if (tmpLocation) {
              origin = tmpLocation.origin
            }
            return origin && origin != "null" ? origin : "http://localhost"    
        }(),
        'io.ktor.client.engine.js.createBrowserWebSocket' : (urlString_capturingHack, protocols) => new WebSocket(urlString_capturingHack, protocols),
        'io.ktor.client.engine.js.createWebSocketNodeJs' : (socketCtor, urlString_capturingHack, headers_capturingHack, protocols) => new socketCtor(urlString_capturingHack, protocols, { headers: headers_capturingHack }),
        'io.ktor.client.engine.js.getKeys' : (headers) => Array.from(headers.keys()),
        'io.ktor.client.engine.js.eventAsString' : (event) => JSON.stringify(event, ['message', 'target', 'type', 'isTrusted']),
        'io.ktor.client.engine.js.compatibility.abortControllerCtorBrowser' : () => AbortController,
        'io.ktor.client.fetch.body_$external_prop_setter' : (_this, v) => _this.body = v,
        'io.ktor.client.fetch.headers_$external_prop_setter' : (_this, v) => _this.headers = v,
        'io.ktor.client.fetch.method_$external_prop_setter' : (_this, v) => _this.method = v,
        'io.ktor.client.fetch.redirect_$external_prop_setter' : (_this, v) => _this.redirect = v,
        'io.ktor.client.fetch.signal_$external_prop_setter' : (_this, v) => _this.signal = v,
        'io.ktor.client.fetch.signal_$external_prop_getter' : (_this) => _this.signal,
        'io.ktor.client.fetch.abort_$external_fun' : (_this, ) => _this.abort(),
        'io.ktor.client.fetch.fetch_$external_fun' : (p0, p1, isDefault0) => fetch(p0, isDefault0 ? undefined : p1, ),
        'io.ktor.client.fetch.getReader_$external_fun' : (_this, ) => _this.getReader(),
        'io.ktor.client.fetch.cancel_$external_fun' : (_this, p0, isDefault0) => _this.cancel(isDefault0 ? undefined : p0, ),
        'io.ktor.client.fetch.read_$external_fun' : (_this, ) => _this.read(),
        'io.ktor.client.fetch.done_$external_prop_getter' : (_this) => _this.done,
        'io.ktor.client.fetch.value_$external_prop_getter' : (_this) => _this.value,
        'io.ktor.client.plugins.websocket.tryGetEventDataAsString' : (data) => typeof(data) === 'string' ? data : null,
        'io.ktor.client.plugins.websocket.tryGetEventDataAsArrayBuffer' : (data) => data instanceof ArrayBuffer ? data : null,
        'io.ktor.client.utils.makeJsObject' : () => { return {}; },
        'io.ktor.client.utils.makeImport' : (name) => import(name),
        'io.ktor.client.utils.makeJsCall' : (func, arg) => func.apply(null, arg),
        'io.ktor.client.utils.jsObjectAssign' : () => Object.assign,
        'io.ktor.client.utils.makeJsNew' : (ctor) => new ctor(),
        'io.ktor.client.utils.getObjectField' : (obj, name) => obj[name],
        'io.ktor.client.utils.setObjectField' : (obj, name, value) => obj[name]=value,
        'io.ktor.client.utils.toJsArrayImpl' : (x) => new Uint8Array(x),
        'io.ktor.network.sockets.nodejs.nodeNet' : () => eval('require')('node:net'),
        'io.ktor.network.sockets.nodejs.jsError' : (message) => (new Error(message)),
        'io.ktor.network.sockets.nodejs.createJsObject' : () => ({}),
        'io.ktor.network.sockets.nodejs.localAddress_$external_prop_getter' : (_this) => _this.localAddress,
        'io.ktor.network.sockets.nodejs.localPort_$external_prop_getter' : (_this) => _this.localPort,
        'io.ktor.network.sockets.nodejs.remoteAddress_$external_prop_getter' : (_this) => _this.remoteAddress,
        'io.ktor.network.sockets.nodejs.remotePort_$external_prop_getter' : (_this) => _this.remotePort,
        'io.ktor.network.sockets.nodejs.write_$external_fun' : (_this, p0) => _this.write(p0),
        'io.ktor.network.sockets.nodejs.destroy_$external_fun' : (_this, p0) => _this.destroy(p0),
        'io.ktor.network.sockets.nodejs.end_$external_fun' : (_this, p0) => _this.end(p0),
        'io.ktor.network.sockets.nodejs.on_$external_fun' : (_this, p0, p1) => _this.on(p0, p1),
        'io.ktor.network.sockets.nodejs.__convertKotlinClosureToJsClosure_((Boolean)->Unit)' : (f) => getCachedJsObject(f, (p0) => wasmExports['__callFunction_((Boolean)->Unit)'](f, p0)),
        'io.ktor.network.sockets.nodejs.on_$external_fun_1' : (_this, p0, p1) => _this.on(p0, p1),
        'io.ktor.network.sockets.nodejs.on_$external_fun_2' : (_this, p0, p1) => _this.on(p0, p1),
        'io.ktor.network.sockets.nodejs.on_$external_fun_3' : (_this, p0, p1) => _this.on(p0, p1),
        'io.ktor.network.sockets.nodejs.createConnection_$external_fun' : (_this, p0) => _this.createConnection(p0),
        'io.ktor.network.sockets.nodejs.timeout_$external_prop_setter' : (_this, v) => _this.timeout = v,
        'io.ktor.network.sockets.nodejs.message_$external_prop_getter' : (_this) => _this.message,
        'io.ktor.network.sockets.nodejs.port_$external_prop_setter' : (_this, v) => _this.port = v,
        'io.ktor.network.sockets.nodejs.host_$external_prop_setter' : (_this, v) => _this.host = v,
        'io.ktor.network.sockets.nodejs.noDelay_$external_prop_setter' : (_this, v) => _this.noDelay = v,
        'io.ktor.network.sockets.nodejs.keepAlive_$external_prop_setter' : (_this, v) => _this.keepAlive = v,
        'io.ktor.network.sockets.nodejs.path_$external_prop_setter' : (_this, v) => _this.path = v
    }
    
    // Placed here to give access to it from externals (js_code)
    let wasmInstance;
    let require; 
    let wasmExports;

    const isNodeJs = (typeof process !== 'undefined') && (process.release.name === 'node');
    const isDeno = !isNodeJs && (typeof Deno !== 'undefined')
    const isStandaloneJsVM =
        !isDeno && !isNodeJs && (
            typeof d8 !== 'undefined' // V8
            || typeof inIon !== 'undefined' // SpiderMonkey
            || typeof jscOptions !== 'undefined' // JavaScriptCore
        );
    const isBrowser = !isNodeJs && !isDeno && !isStandaloneJsVM && (typeof window !== 'undefined' || typeof self !== 'undefined');
    
    if (!isNodeJs && !isDeno && !isStandaloneJsVM && !isBrowser) {
      throw "Supported JS engine not detected";
    }

    const wasmFilePath = './opendev-sdk.wasm';

    const importObject = {
        js_code,
        intrinsics: {
            tag: wasmTag
        },


    };
    
    try {
      if (isNodeJs) {
        const module = await import(/* webpackIgnore: true */'node:module');
        const importMeta = import.meta;
        require = module.default.createRequire(importMeta.url);
        const fs = require('fs');
        const url = require('url');
        const filepath = import.meta.resolve(wasmFilePath);
        const wasmBuffer = fs.readFileSync(url.fileURLToPath(filepath));
        const wasmModule = new WebAssembly.Module(wasmBuffer);
        wasmInstance = new WebAssembly.Instance(wasmModule, importObject, { builtins: [''] });
      }
      
      if (isDeno) {
        const path = await import(/* webpackIgnore: true */'https://deno.land/std/path/mod.ts');
        const binary = Deno.readFileSync(path.fromFileUrl(import.meta.resolve(wasmFilePath)));
        const module = await WebAssembly.compile(binary);
        wasmInstance = await WebAssembly.instantiate(module, importObject, { builtins: [''] });
      }
      
      if (isStandaloneJsVM) {
        const wasmBuffer = read(wasmFilePath, 'binary');
        const wasmModule = new WebAssembly.Module(wasmBuffer);
        wasmInstance = new WebAssembly.Instance(wasmModule, importObject, { builtins: [''] });
      }
      
      if (isBrowser) {
        wasmInstance = (await WebAssembly.instantiateStreaming(fetch(new URL('./opendev-sdk.wasm',import.meta.url).href), importObject, { builtins: [''] })).instance;
      }
    } catch (e) {
      if (e instanceof WebAssembly.CompileError) {
        let text = `Please make sure that your runtime environment supports the latest version of Wasm GC and Exception-Handling proposals.
For more information, see https://kotl.in/wasm-help
`;
        if (isBrowser) {
          console.error(text);
        } else {
          const t = "\n" + text;
          if (typeof console !== "undefined" && console.log !== void 0) 
            console.log(t);
          else 
            print(t);
        }
      }
      throw e;
    }
    
    wasmExports = wasmInstance.exports;
    if (runInitializer) {
        wasmExports._initialize();
    }

    return { instance: wasmInstance,  exports: wasmExports };
}
