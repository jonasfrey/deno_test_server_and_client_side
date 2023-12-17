
//./readme.md:start
//md: # import lib
import {
    f_assert_equals, 
    f_deno_test, 
    f_deno_test_summary,
    f_deno_test_all_and_print_summary , 
    f_o_test, 
    f_display_test_selection_or_run_selected_test_and_print_summary
} from "./mod.js"

let a_o_test = [
    f_o_test(
        "number_and_string", 
        ()=>{
            f_assert_equals(1, '1');
        }
    ),
    f_o_test(
        "loop_1", 
        async ()=>{
            return new Promise((f_resolve)=>{
                for(let n = 0; n< 999999999; n+=1){
                }
                console.log('finish loop_1')
                return f_resolve()
            })
        }
    ), 
    f_o_test(
        "loop_2", 
        async ()=>{
            return new Promise((f_resolve)=>{
                for(let n = 0; n< 111; n+=1){
                }
                console.log('finish loop_2')
                return f_resolve()
            })
        }
    ), 
    f_o_test(
        "fetch", 
        async ()=>{
            return fetch("1.1.1.1")
            .then(o_resp=>{f_assert_equals(o_resp.status, 200)})
        }
    ), 
    f_o_test("fetch_1.1.1.1", async () => {
        return fetch("https://1.1.1.1")
            .then(o_resp=>{f_assert_equals(o_resp.status, 200)})
    }),
    f_o_test("fetch_nonexstingdomain", async () => {
        return fetch("https://123jasdlfj123u4kljsdf_nonexistingdomain.com")
            .then(o_resp=>{f_assert_equals(o_resp.status, 404)})
    }),
    ...new Array(100).fill(0).map((v, n_idx)=>{
        return f_o_test(
            `auto_gen_test_${n_idx}`, 
            ()=>{
                f_assert_equals(1+1, 2);
            }
        )
    })
]
await f_display_test_selection_or_run_selected_test_and_print_summary(a_o_test);
//./readme.md:end