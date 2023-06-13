
//./readme.md:start
//md: # import lib
import {
    f_b_daylight_saving_time,
    f_s_isotimezone__from_s_timezone,
    f_s_ymd__from_n_ts_ms_utc,
    f_s_dmy__from_n_ts_ms_utc,
    f_s_hms__from_n_ts_ms_utc,
    f_s_ymd_hms__from_n_ts_ms_utc,
    f_n_ms_offset_from_s_timezone_n_ts_ms
} from "https://deno.land/x/date_functions/mod.js"

import {
    f_assert_equals, 
    f_deno_test, 
    f_deno_test_summary,
    f_deno_test_all_and_print_summary 
} from "./mod.js"

let n_ts_ms_utc__2023_06_06_13_14_32 = 1686057272545;
await f_deno_test_all_and_print_summary(
    [
        //md: # search a timezone and get iso string
        f_deno_test("f_s_isotimezone__from_s_timezone", () => {
            f_assert_equals(
                f_s_isotimezone__from_s_timezone('Zurich'),
                'Europe/Zurich'
            );
        }),
        //md: # check if daylight saving time is on (check if 'summertime' is on)
        f_deno_test("f_b_daylight_saving_time", () => {
            f_assert_equals(
                f_b_daylight_saving_time(new Date("2023-06-01 10:20:20")),
                true
            );

        }),
        //md: # get the timeoffset from a timezone 
        f_deno_test("f_n_ms_offset_from_s_timezone_n_ts_ms__daylight_saving_time", () => {

            f_assert_equals(
                f_n_ms_offset_from_s_timezone_n_ts_ms(
                    'Europe/Zurich', 
                    new Date("2023-06-02 00:00:00").getTime()
                ),
                2*60*60*1000
            );

        }),
        //md: # get the timeoffset from a timezone (in winter it is one hour less)
        f_deno_test("f_n_ms_offset_from_s_timezone_n_ts_ms", () => {

            f_assert_equals(
                f_n_ms_offset_from_s_timezone_n_ts_ms(
                    'Europe/Zurich', 
                    new Date("2023-01-02 00:00:00").getTime()
                ),
                1*60*60*1000
            );

        }),
        //md: # convert a date to YYYY-MM-DD HH:II:SS (by providing a timezone)


        f_deno_test("f_s_ymd__utc", () => {
            f_assert_equals(
                f_s_ymd__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'UTC'
                ),
                '2023-06-06'
            );
        }),
        f_deno_test("f_s_hms__utc", () => {
            f_assert_equals(
                f_s_hms__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'UTC'
                ),
                '13:14:32'
            );
        }),
        f_deno_test("f_s_ymd_hms__utc", () => {
            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'UTC'
                ),
                '2023-06-06 13:14:32'
            );
        }),

        f_deno_test("f_s_ymd", () => {
            f_assert_equals(
                f_s_ymd__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'Europe/Zurich'
                ),
                '2023-06-06'
            );
        }),
        f_deno_test("f_s_hms", () => {
            f_assert_equals(
                f_s_hms__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'Europe/Zurich'
                ),
                '15:14:32'
            );
        }),
        f_deno_test("f_s_ymd_hms", () => {
            f_assert_equals(
                f_s_ymd_hms__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'Europe/Zurich'
                ),
                '2023-06-06 15:14:32'
            );
        }),

        f_deno_test("f_s_dmy", () => {
            f_assert_equals(
                f_s_dmy__from_n_ts_ms_utc(
                    n_ts_ms_utc__2023_06_06_13_14_32, 
                    'Europe/Zurich'
                ),
                '06-06-2023'
            );
        }),

    ]
)


//./readme.md:end


console.log("done")
console.log("run this script with 'deno test myscript.js' if you see no test output")