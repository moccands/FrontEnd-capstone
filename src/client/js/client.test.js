import "@babel/polyfill"
import {getHistDate} from "./nameChecker";

test("check For Name", () => {
        expect(getHistDate(180)).toBe("&start_date=2019-11-28&end_date=2019-11-29");
});


