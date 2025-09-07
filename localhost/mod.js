import { 
    f_b_denojs
} from "https://deno.land/x/handyhelpers@5.0.0/mod.js"

let b_deno = f_b_denojs();
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
            return f_resolve(Deno.test(s_name_test, f_fun))
        }
        let o_test = new O_test(
            s_name_test, 
            f_fun
        );
        
        try {
            o_test.n_ms_start = globalThis.performance.now();
            let v_promise_return = await o_test.f_fun()
            // if(
            //     o_test.f_fun.constructor.name == "AsyncFunction" 
            //     && v_promise_return == undefined
            //     ){
            //     throw new Error("the async function of f_deno_test might be leaking async ops, this can be fixed by returning a value from it")
            // }

        } catch (error) {
            console.error(error)
            // throw Error(error)
            o_test.o_error = error
        }
        o_test.n_ms_end = globalThis.performance.now();
        o_test.s_output_summary = `${o_test.s_name} ... ${(!o_test.o_error) ? f_s_ansi_clrd('ok', o.n_color_green) : f_s_ansi_clrd('FAILED', o.n_color_red, o.n_font_bold)} ${f_s_ansi_clrd(`(${f_n_ms_delta__from_o_test(o_test).toFixed(0)}ms)`, o.n_color_white)}`
        console.info(o_test.s_output_summary)
        
        if(o_test.o_error){
            o_test.s_output_error = `
testname:'${o_test.s_name}'
${o_test.o_error.name}
${o_test.o_error.message}
${o_test.o_error.stack}
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
    if(b_deno){
        // there is no way to detect if 'deno run ... ' or 'deno test ... ' was called!?!?!
        console.log('remember to call this script with: deno test script.js')
    }
    return new Promise(async (f_res, f_rej)=>{
        if(b_deno){
            f_res()
        }
        let a_o_test = await Promise.all(a_o_promise)
        f_deno_test_summary(a_o_test)
        f_res();
    })

}
let f_o_test = function(){
    return {a_v_arg: arguments}
}

let f_display_test_selection_or_run_selected_test_and_print_summary = async function(
    a_o_test
){
    let s_token_run_all_tests = 'all';
    let s_class_console =`console_output`

    let b_run_all = false;
    let b_deno = f_b_denojs();
    let a_s_arg = [];
    let a_o_test__to_run = []
    if(b_deno){
        a_s_arg = Deno.args; 
    }else{
        let o_mod_ansiup = await import('https://cdn.jsdelivr.net/npm/ansi-up@1.0.0/dist/ansi-up.min.js')
        // console.log(o_mod_ansiup)
        var ansi_up = new o_mod_ansiup.AnsiUp();

        let f_console_log__original = console.log; 
        console.log = function(){
            let o = document.createElement('div');
            let s = Array.from(arguments).join(',')
            
            o.innerHTML = s.split('\n').map(s=>ansi_up.ansi_to_html(s)).join('<br>')  

            document?.querySelector(`.${s_class_console}`)?.appendChild(
                o
            )
            o.scrollIntoView()
            f_console_log__original(...arguments)
        }

        a_s_arg = globalThis.location.hash.substring(1).split(':').filter(s=>s.trim()!='')
        

    }
    globalThis.addEventListener('hashchange', function() {
        // Check if the hash is empty
        if (!location.hash) {
            // Reload the page
            location.reload();
        }
    });

    console.log('---')
    console.log(`${(b_deno) ? `'-- ${s_token_run_all_tests}'`: `'url#${s_token_run_all_tests}'`} to run all tests`)
    console.log(`${(b_deno) ? `'-- s_name_test s_name_test2'`: `'url#s_name_test:s_name_test2'`} to run specific tests`)
    console.log('---')

    a_o_test__to_run = a_o_test.filter(o=>a_s_arg.includes(o.a_v_arg[0]));
    console.log(`arguments present: ${a_s_arg}`)
    if(a_s_arg.length == 0){
        console.log('running last test'); 
        console.log('---'); 
        a_o_test__to_run = [a_o_test.at(-1)];
    }
    if(a_s_arg.includes(s_token_run_all_tests)){
        console.log('running all tests')
        console.log('---')
        a_o_test__to_run = a_o_test
    }

    if(!b_deno){
        document.documentElement.style.margin = '0'
        document.documentElement.style.padding = '0'
        let o_mod__html_from_js = await import('https://deno.land/x/f_o_html_from_o_js@5.0.1/mod.js');
        let o_html = await o_mod__html_from_js.f_o_html__and_make_renderable({
            style: `
            font-family:monospace, sans-serif;
            white-space: pre;
            white-space: -moz-pre-wrap; /* Firefox */
            white-space: -pre-wrap; /* ancient Opera */
            white-space: -o-pre-wrap; /* newer Opera */
            white-space: pre-wrap; /* Chrome; W3C standard */
            word-wrap: break-word; /* IE */
            background: #333;
            color: #eee;
            display:flex;
            width:100vw;
            height:100vh;
            align-items: center;
            justify-content: center;
            `,
            a_o: [
                    {
                        s_tag: "style", 
                        innerHTML: `
                        *{margin:0;padding:0;box-sizing:border-box}
                        a{color:lightblue}
                        `
                    },
                    {   
                        style: `max-height:100vh;overflow-y:scroll;padding: 1rem`,

                        a_o: [
                            {
                                s_tag: 'h2',
                                // innerText: `current test(s):`, 
                                innerText: "available test(s)"
                            },
                            // a_o_test__to_run.map(o=>{
                            //     return {
                            //         s_tag: "h3", 
                            //         innerText: o.a_v_arg[0]
                            //     }
                            // }),
                            
                            ...[
                                'all',
                                ...a_o_test.map(o=>o.a_v_arg[0])
                            ].map(
                                s=>{
                                    return {
                                        a_o: [
                                            {
                                                s_tag: "a", 
                                                href: `#${s}`,
                                                onclick : function(){
                                                    globalThis.location.href = globalThis.location.href.split('#').shift()+`#${s}`
                                                    globalThis.location.reload()
                                                }, 
                                                innerText: `run test: '${s}'`
                                            }, 
            
                                            {
                                                s_tag: "br"
                                            }
                                        ]
                                    }
                                }
                            ), 
                            {
                                s_tag: "a", 
                                href: `#`,
                                onclick : function(){
                                    location.href.replace(location.hash,"")
                                    globalThis.location.reload()
                                }, 
                                innerText: `list all available tests'`
                            }, 
                        ]
                    }, 
                    {

                        style: `max-height:100vh;overflow-y:scroll;padding: 1rem`,
                        a_o: [
                            {
                                s_tag: 'h2', 
                                innerText: `console output`
                            },
                            {
                                class: s_class_console
                            }
                        ]
                    }
                ]
        })
        document.body.appendChild(o_html);

    }
    return f_deno_test_all_and_print_summary(
        a_o_test__to_run.map(o=>{
            return f_deno_test(...o.a_v_arg)
        })
    )
}
export {
    f_assert_equals, 
    f_deno_test, 
    f_deno_test_summary,
    f_deno_test_all_and_print_summary, 
    f_o_test, 
    f_display_test_selection_or_run_selected_test_and_print_summary
}

