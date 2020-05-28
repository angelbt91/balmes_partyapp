import moment from "moment";
import 'moment-timezone';

function convertToSpanishTimeZone(original) {
    let serverTimeZone = moment.tz(original, "Atlantic/Azores"); // server's timezone, UTC +0
    return serverTimeZone.clone().tz("Europe/Madrid"); // transform to Spain timezone and return
}

export default convertToSpanishTimeZone;