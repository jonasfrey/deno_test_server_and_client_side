
import {
    f_assert_equals, 
    f_deno_test, 
    f_deno_test_summary,
    f_deno_test_all_and_print_summary, 
// } from "../functions.module.js"
// } from "./tmp.js"
} from './localhost/mod.js'
import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";

let a_o_test = [];
let t1 = undefined;
let t2 = undefined;
a_o_test.push( f_deno_test("t1", async function(){
    return new Promise((f_res)=>{

        setTimeout(function(){
            t1 = 1;
            console.log('t1')
            f_res('t1')
        }, 1000)
    })

}))
a_o_test.push( f_deno_test("t2", function(){
    t2 = t1 + t1; 
    console.log(t2)
    return f_assert_equals(t2, 2)
}))

f_deno_test_all_and_print_summary(
    a_o_test
)
console.log("if you are using deno and see no output, run this script with 'deno test -A script.js'")


// it seems that Deno.test is not an async function and therefore all tests run synchronious by default
let t1 = undefined;
let t2 = undefined;
Deno.test("t1", async function(){
    return new Promise((f_res)=>{

        setTimeout(function(){
            t1 = 1;
            console.log('t1')
            f_res('t1')
        }, 2000)
    })

})
 Deno.test("t2", function(){
    t2 = t1 + t1; 
    console.log(t2)
    return assertEquals(t2, 2)
})