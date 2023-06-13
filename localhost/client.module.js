
//./readme.md:start
//md: # import lib
import {
    f_assert_equals, 
    f_deno_test, 
    f_deno_test_summary,
    f_deno_test_all_and_print_summary 
} from "./mod.js"
// } from "https://deno.land/x/deno_test_server_and_client_side@[version]/mod.js"

//md: # compare a number to a string wich should fail
f_deno_test("number and string", () => {
    f_assert_equals(1, '1');
})
//md: # async testing
//md: to be able to run tests in parallel , each test function has to be async and has to return a Promise 
f_deno_test("loop_1", async () => {
    return new Promise((f_resolve)=>{
        for(let n = 0; n< 999999999; n+=1){
        }
        console.log('finish loop_1')
        return f_resolve()
    })
});
f_deno_test("loop_2", async () => {
    return new Promise((f_resolve)=>{
        for(let n = 0; n< 111; n+=1){
        }
        console.log('finish loop_2')
        return f_resolve()
    })

});
f_deno_test("fetch", async () => {
    return fetch("1.1.1.1")
        .then(o_resp=>{f_assert_equals(o_resp.status, 200)})
});

//md: # test summary 
//md: we can also get a test summary, but if we have some async test we should wait for all tests to be finished 
//md: before we print the summary, note that every f_deno_test returns a promise wich returns a test object with the test results
//md: and gets pushed to a global test array, when running f_deno_test_summary() it prints all tests ever done and finished with `f_deno_test` so far

Promise.all([
    f_deno_test("fetch 1.1.1.1", async () => {
        return fetch("https://1.1.1.1")
            .then(o_resp=>{f_assert_equals(o_resp.status, 200)})
    }),
    f_deno_test("fetch nonexstingdomain", async () => {
        return fetch("https://123jasdlfj123u4kljsdf_nonexistingdomain.com")
            .then(o_resp=>{f_assert_equals(o_resp.status, 404)})
    }),
]).then(function(){
    // 
    f_deno_test_summary()
})
 
//md: # custom summary
//md: we can create a custom summary
let o_test1 = f_deno_test("1+1", async () => {
    return f_assert_equals(2, 1+1)
})
let o_test2 = f_deno_test("2+2", async () => {
    return f_assert_equals(5, 2+2)
})
let a_o_promise = [o_test1, o_test2]
Promise.all(a_o_promise).then((a_o_test) =>{f_deno_test_summary(a_o_test)})

//md: # test summary helper

await f_deno_test_all_and_print_summary(
    [
        f_deno_test("1+1", () => {
            f_assert_equals(1+1, 2)
        }),
        f_deno_test("window.performance.now", async () => {
            let n_ms = 1000;
            return new Promise(f_res=>{
                window.setTimeout(function(){
                    f_assert_equals(window.performance.now() > n_ms, true);
                    f_res()
                },n_ms)
            })
        }),
    ]
)
//./readme.md:end