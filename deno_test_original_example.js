import { assertEquals } from "https://deno.land/std@0.191.0/testing/asserts.ts";

// let a_o = await Promise.all(
//     [
//         Deno.test("url test", () => {
//             const url = new URL("./foo.js", "https://deno.land/");
//             assertEquals(url.href, "https://deno.land/foo.js");
//           }), 
//           Deno.test("url test", () => {
//             const url = new URL("./foo.js", "https://deno.land/");
//             assertEquals(url.href, "https://deno.land/foo.js");
//           }), 
//     ]
// )
// console.log(a_o)
// import {assertEquals} from "https://deno.land/std@0.190.0/testing/asserts.ts"
// assertEquals(1,2)
// Deno.test('no_promise_return', async function(){
//     new Promise((f_res)=>{
//         globalThis.setTimeout(function(){
//             console.log("done")
//         },2000)
//     })
// })
// Deno.test('promise_return', async function(){
//     return new Promise((f_res)=>{
//         globalThis.setTimeout(function(){
//             console.log("done")
//         },2000)
//     })
// })
// let f = async function(){
//     return fetch("http://google.com")//"nonexistingdomain")
// }

// let f2 = async function(){
//     fetch("http://google.com")//"nonexistingdomain")

// }
// let p1 = f().catch(()=>{}).then(rf=>{console.log(typeof rf)})//.finally((rf1)=>{console.log(p1, rf1)});
// let p2 = f2().catch(()=>{}).then(rf=>{console.log(typeof rf)})//.finally((rf2)=>{console.log(p2, rf2)});
// console.log(rf1)
// console.log(rf2)

// try {
//     await f()
// } catch (error) {
//     console.log("error happened")
//     console.log(error)
// }
// try {
//     await f2()
// } catch (error) {
//     console.log("error happened")
//     console.log(error)
// }