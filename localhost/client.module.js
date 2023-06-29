
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
//md: # running tests in parallel
console.log("# running tests in parallel")
let t1 = undefined
let t2 = undefined
let t3 = undefined
let a_o_test = [];
a_o_test.push(f_deno_test("t1", async () => {
    return new Promise((f_res)=>{
        window.setTimeout(function(){
            t1 = 1
            console.log(`t1:${t1}`)
            f_res(t1)
        }, 1000)
    })
}))
a_o_test.push(
    await f_deno_test("t2",                             //< here
    async () => {                                       //
        return new Promise((f_res)=>{                   //
            window.setTimeout(function(){               //    
                t2 = 2                                  //
                console.log(`t2:${t2}`)                 //           
                f_res(t2)                               //
            }, 1000)                                    //
        })                                              //    
    }                                                   //
))                                                      //        
a_o_test.push(f_deno_test("t3", async () => {           //
    // since t3 is depending on t2, we need to          // < await f_deno_test t2
    t3 = t2+t2
    console.log(`t3:${t3}`)
    f_assert_equals(t3, 4)
}))
f_deno_test_all_and_print_summary(a_o_test);

//./readme.md:end