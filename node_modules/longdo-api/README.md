# longdo-api

A simple unofficial Node.js API for straightforward interfacing with [Longdo's dictionary API](https://dict.longdo.com/page/api).

# Installation

Using NPM:

```sh
$ npm install longdo-api
```

Using Yarn:

```sh
$ yarn add longdo-api
```

# Usage

### async search(query, cleanup=true)

Queries the Longdo API and returns the result (see format [below](#response-sample))

**Parameters:**

-   query: query to search (string)
-   cleanup: whether to clean up data (string trim, etc.)

**Returns:** [Promise][promise_mdn]&lt;Record&lt;string, string[][]&gt;&gt;

## Example code

```js
const longdo = require('longdo-api');

longdo.search('fandango').then((result) => {
    console.log(result);
});
```

## Response example

```json
{
    "NECTEC Lexitron Dictionary EN-TH": [
        ["fandango", "[N] การเต้นระบำสเปนแบบสามจังหวะ, See also: ดนตรีสามจังหวะสำหรับเต้นระบำสเปน"]
    ],
    "ตัวอย่างประโยคจาก Open Subtitles ** ระวัง คำแปลอาจมีข้อผิดพลาด **": [
        ["# Scaramouch, scaramouch Will you do the fandango #", "# เจ้าคนชั่ว, เจ้าคนชั่ว เจ้าเต้นรำได้มั้ย?"],
        [
            "We must do something before they fandango themselves into oblivion!",
            "เราต้องทำอะไรซักอย่าง ก่อนที่พวกเขาจะเต้นจนหายเข้าไปในป่า"
        ],
        ["- Hey. - Christ Fandango!", "เฮ้ คริสตร์ แฟนเดโก"]
    ],
    "CMU Pronouncing Dictionary": [["FANDANGO", "F AE0 N D AE1 NG G OW2"]],
    "Oxford Advanced Learners Dictionary": [
        ["fandango", "(n) fˌændˈæŋgou"],
        ["fandangos", "(n) fˌændˈæŋgouz"]
    ],
    "EDICT JP-EN Dictionary": [["ファンダンゴ", "[, fandango] (n) fandango (spa"]]
}
```

# License

[MIT](https://github.com/voidweaver/longdo-api/blob/master/LICENSE)

[promise_mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
