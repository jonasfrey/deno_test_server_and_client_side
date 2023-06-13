let b_deno = "Deno" in window;
let o_mod__asserts = null;

class AssertionError extends Error {
    constructor(s_msg, s_ansi_colored_message) {
      super(s_msg);
      this.s_ansi_colored_message = s_ansi_colored_message;
    }
  };

if(b_deno){
    o_mod__asserts = await import('https://deno.land/std@0.190.0/testing/asserts.ts');
}
let o = {
    
    n_color_black: 30,
    n_color_red: 31,
    n_color_green: 32,
    n_color_yellow: 33,
    n_color_blue: 34,
    n_color_magenta: 35,
    n_color_cyan: 36,
    n_color_white: 37,

    n_background_black: 40,
    n_background_red: 41,
    n_background_green: 42,
    n_background_yellow: 43,
    n_background_blue: 44,
    n_background_magenta: 45,
    n_background_cyan: 46,
    n_background_white: 47,

    n_font_bold: 1, 
    n_font_italic: 3, 
    n_font_underline: 4, 
    n_color_reset: 0
}
let f_s_ansi_clrd = function(
    s, 
){
    let a_n = Object.values(Array.prototype.slice.call(arguments).slice(1));
    
    if(a_n.length == 0){
        return s
    }

    return `\u001b[${a_n.join(';')}m${s}\u001b[${o.n_color_reset}m`
}
// console.log(f_s_ansi_clrd("hello",o.n_color_black, o.n_background_black, o.n_font_underline));
// console.log(f_s_ansi_clrd("hello",o.n_color_red, o.n_background_black, o.n_font_underline));
class O_console_log_value_colored{
    constructor(
        s_text, 
        s_css = ''
    ){
        this.s_text = s_text
        this.s_css  = s_css
    }
}
let f_a_s_console_log_arg__from_a_o_console_log_value_colored = function(
    a_o_console_log_value_colored
){
    return [a_o_console_log_value_colored.map(o=>`%c${o.s_text}`).join(''), ...a_o_console_log_value_colored.map(o=>o.s_css)]
}
let f_console_log__from_a_o_console_log_value_colored = function(
    a_o_console_log_value_colored
){

    console.log(...f_a_s_console_log_arg__from_a_o_console_log_value_colored(a_o_console_log_value_colored))
}
// test
// f_console_log__from_a_o_console_log_value_colored(
//     [
//         new O_console_log_value_colored('As fast as you can, read out lout the actual color, not the text!', 'font-size:20px;font-weight:bold'),
//         ...new Array(100).fill(0).map((n, n_idx) =>{
//             let a_s_color = ['green', 'red', 'blue', 'yellow', 'orange', 'brown', 'black']
//             let s_color_rnd1 = a_s_color[parseInt(Math.random()*(a_s_color.length-1))]
//             let s_color_rnd2 = a_s_color[parseInt(Math.random()*(a_s_color.length-1))]
//             return new O_console_log_value_colored(` ${s_color_rnd1} `, `color:${s_color_rnd2};font-size:inherit;`)
//         }),
//         new O_console_log_value_colored('... that is pretty difficult, isnt it ?')
//     ]
// )
let f_s_equals = function(
    v1, 
    v2, 
){
    let s = ``
    if(typeof v1 == 'object'){
        v1 = JSON.stringify(v1)
        v2 = JSON.stringify(v2)
    }
    
    let b = v1 === v2;
    let s_v1 = (typeof v1 == "string") ? `'${v1}'` : v1;
    let s_v2 = (typeof v2 == "string") ? `'${v2}'` : v2;

    if(!b){
        s =  `
[Diff] ${f_s_ansi_clrd('Actual', o.n_color_red, o.n_font_bold)} /  ${f_s_ansi_clrd('Expected', o.n_color_green, o.n_font_bold)}

Actual     ${f_s_ansi_clrd(s_v1, o.n_color_red, o.n_font_bold)} (t: ${typeof v1})
Expected   ${f_s_ansi_clrd(s_v2, o.n_color_green, o.n_font_bold)} (t: ${typeof v2})
            ` 
        
    }
    return s 
}
let f_assert_equals = function(
    v1, 
    v2
){

    if(b_deno){

        return o_mod__asserts.assertEquals(v1,v2)
    }
    let s = f_s_equals(v1, v2); 
    if(s != ''){
        console.log(s)
        throw new AssertionError(`Values are not equal.`, s)
    };
}
let f_n_ms_delta__from_o_test = function(
    o_test
){
    return o_test.n_ms_end - o_test.n_ms_start 
}

class O_test{
    constructor(
        s_name, 
        f_fun,
    ){
        this.s_name = s_name
        this.f_fun = f_fun
        this.o_error = false,
        this.n_ms_start = new Date();
        this.n_ms_end = null;
        this.s_output = ``
    }
}
let a_o_test__global = []
let f_deno_test = async function(
    s_name_test,
    f_fun, 
    a_o_test
){
    return new Promise(async (f_resolve) => {

        if(b_deno){
            return Deno.test(s_name_test, f_fun)
        }
        let o_test = new O_test(
            s_name_test, 
            f_fun
        );
        
        try {
            o_test.n_ms_start = window.performance.now();
            let v_promise_return = await o_test.f_fun()
            // if(
            //     o_test.f_fun.constructor.name == "AsyncFunction" 
            //     && v_promise_return == undefined
            //     ){
            //     throw new Error("the async function of f_deno_test might be leaking async ops, this can be fixed by returning a value from it")
            // }

        } catch (error) {
            o_test.o_error = error

        }
        o_test.n_ms_end = window.performance.now();
        o_test.s_output_summary = `${o_test.s_name} ... ${(!o_test.o_error) ? f_s_ansi_clrd('ok', o.n_color_green) : f_s_ansi_clrd('FAILED', o.n_color_red, o.n_font_bold)} ${f_s_ansi_clrd(`(${f_n_ms_delta__from_o_test(o_test).toFixed(0)}ms)`, o.n_color_white)}`
        console.info(o_test.s_output_summary)
        
        if(o_test.o_error){
            o_test.s_output_error = `
testname:'${o_test.s_name}'
${o_test.o_error.toString()}
${o_test.o_error.s_ansi_colored_message}
                `
            console.log(o_test.s_output_error)
        }
    
        a_o_test__global.push(o_test)
        return f_resolve(o_test)
        
    })
}

let f_deno_test_summary = function(a_o_test){
    if(!a_o_test){
        a_o_test = a_o_test__global
    }
    if(!b_deno){

        let a_o_test__failed = a_o_test.filter(o=>o.o_error);
        let a_o_test__passed = a_o_test.filter(o=>!o.o_error);
        let n_ms_total = a_o_test.reduce((n, o)=>{return n+o.n_ms_end-o.n_ms_start}, 0);

        let s_errors_and_failures = `
${f_s_ansi_clrd('ERRORS', o.n_color_white, o.n_background_red, o.n_font_bold)}
${a_o_test__failed.map(o=>o.s_output_error).join("\n")}

${f_s_ansi_clrd('FAILURES', o.n_color_white, o.n_background_red, o.n_font_bold)}
${a_o_test__failed.map(o=>o.s_output_summary).join("\n")}
        `
        let s = `
TEST SUMMARY: 
${a_o_test__failed.length}/${a_o_test.length} tests failed 
${a_o_test.map(o=>o.s_output_summary).join("\n")}

${(a_o_test__failed.length > 0) ? s_errors_and_failures : ''}

${(a_o_test__failed.length > 0) ? f_s_ansi_clrd('FAILED', o.n_color_red, o.n_font_bold) : f_s_ansi_clrd('ok', o.n_color_green)} ${a_o_test__passed.length} passed | ${ a_o_test__failed.length} failed | ${f_s_ansi_clrd(`(${n_ms_total.toFixed(0)}ms)`, o.n_color_white)}
`
        console.log(s)
    }

}

let f_deno_test_all_and_print_summary = async function(
    a_o_promise
){
    
    return new Promise(async (f_res, f_rej)=>{
        if(b_deno){
            f_res()
        }
        let a_o_test = await Promise.all(a_o_promise)
        f_deno_test_summary(a_o_test)
        f_res();
    })

}
export {
    f_assert_equals, 
    f_deno_test, 
    f_deno_test_summary,
    f_deno_test_all_and_print_summary
}

