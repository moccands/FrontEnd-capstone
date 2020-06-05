import "@babel/polyfill"
import {getHistDate} from "./nameChecker";

Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
}
    
    

test("get Historical date forecast dates for url", () => {
        let date = new Date();
        let histdate1 = date.addDays(2);
        let month = histdate1.getMonth();
        month = month + 1;
        let day = histdate1.getDate();
        let nextday = day+1;
        expect(getHistDate(1)).toBe("&start_date=2019-"+month+"-"+day+"&end_date=2019-"+month+"-"+nextday);
});

