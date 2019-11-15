import { toJalaali, jalaaliMonthLength, toGregorian } from '../_lib/jalali'

const jMonths = 'فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند'.split(
  '_'
)
const jWeekDays = 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split(
  '_'
)
const jWeekDaysShort = 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split(
  '_'
)
const jWeekDaysMin = 'ی_د_س_چ_پ_ج_ش'.split('_')

export default class JDate extends Date {
  constructor() {
    super()
    const argStr = Object.prototype.toString.call(arguments[0])

    if (arguments.length === 0) {
      this._gDate = new Date()
    } else if (arguments.length > 1) {
      this._gDate = new Date(...arguments)
    } else if (
      arguments[0] instanceof Date ||
      (typeof argument === 'object' && argStr === '[object Date]')
    ) {
      // Prevent the date to lose the milliseconds when passed to new Date() in IE10
      this._gDate = new Date(arguments[0].getTime())
    } else if (
      typeof arguments[0] === 'number' ||
      argStr === '[object Number]'
    ) {
      this._gDate = new Date(arguments[0])
    } else {
      if (
        (typeof argument === 'string' || argStr === '[object String]') &&
        typeof console !== 'undefined'
      ) {
        // eslint-disable-next-line no-console
        console.warn(
          "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"
        )
        // eslint-disable-next-line no-console
        console.warn(new Error().stack)
      }
      this._gDate = new Date(NaN)
    }

    this.syncJalali()
  }

  syncJalali() {
    const { jy, jd, jm } = toJalaali(
      this._gDate.getFullYear(),
      this._gDate.getMonth() + 1,
      this._gDate.getDate()
    )

    this._jDate = {
      year: jy,
      month: jm - 1,
      day: jd
    }
  }

  /** Returns a string representation of a date. The format of the string depends on the locale. */
  toString() {
    return this.toDateString() + ' ' + this.toTimeString()
  }

  /** Returns a date as a string value. */
  toDateString() {
    return (
      jWeekDaysShort[this.getDay()] +
      ' ' +
      this.getDate() +
      ' ' +
      jMonths[this.getMonth()] +
      ' ' +
      this.getFullYear()
    )
  }

  /** Returns a time as a string value. */
  toTimeString() {
    return this._gDate.toTimeString()
  }

  /** Returns a value as a string value appropriate to the host environment's current locale. */
  toLocaleString() {
    return `${this.toLocaleDateString()}, ${this.toLocaleTimeString()}`
  }

  /** Returns a date as a string value appropriate to the host environment's current locale. */
  toLocaleDateString() {
    return `${this.getFullYear()}/${this.getMonth() + 1}/${this.getDate()}`
  }

  /** Returns a time as a string value appropriate to the host environment's current locale. */
  toLocaleTimeString() {
    return this._gDate.toLocaleTimeString()
  }

  /** Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC. */
  valueOf() {
    return this._gDate.valueOf()
  }

  /** Gets the time value in milliseconds. */
  getTime() {
    return this._gDate.getTime()
  }

  /** Gets the jalali year, using local time. */
  getFullYear() {
    return this._jDate.year
  }

  /** Gets the year using Universal Coordinated Time (UTC). */
  getUTCFullYear() {
    return this._gDate.getUTCFullYear()
  }

  /** Gets the jalali month index (0 - 11), using local time. */
  getMonth() {
    return this._jDate.month
  }

  /** Gets the month of a Date object using Universal Coordinated Time (UTC). */
  getUTCMonth() {
    return this._gDate.getUTCMonth()
  }

  /** Gets the jalali day-of-the-month (1 - 29/30/31), using local time. */
  getDate() {
    return this._jDate.day
  }

  /** Gets the day-of-the-month, using Universal Coordinated Time (UTC). */
  getUTCDate() {
    return this._gDate.getUTCDate()
  }

  /** Gets the day of the week, using local time. */
  getDay() {
    return this._gDate.getDay()
  }

  /** Gets the day of the week using Universal Coordinated Time (UTC). */
  getUTCDay() {
    return this._gDate.getUTCDay()
  }

  /** Gets the hours in a date, using local time. */
  getHours() {
    return this._gDate.getHours()
  }

  /** Gets the hours value in a Date object using Universal Coordinated Time (UTC). */
  getUTCHours() {
    return this._gDate.getUTCHours()
  }

  /** Gets the minutes of a Date object, using local time. */
  getMinutes() {
    return this._gDate.getMinutes()
  }

  /** Gets the minutes of a Date object using Universal Coordinated Time (UTC). */
  getUTCMinutes() {
    return this._gDate.getUTCMinutes()
  }

  /** Gets the seconds of a Date object, using local time. */
  getSeconds() {
    return this._gDate.getSeconds()
  }

  /** Gets the seconds of a Date object using Universal Coordinated Time (UTC). */
  getUTCSeconds() {
    return this._gDate.getUTCSeconds()
  }

  /** Gets the milliseconds of a Date, using local time. */
  getMilliseconds() {
    return this._gDate.getMilliseconds()
  }

  /** Gets the milliseconds of a Date object using Universal Coordinated Time (UTC). */
  getUTCMilliseconds() {
    return this._gDate.getUTCMilliseconds()
  }

  /** Gets the difference in minutes between the time on the local computer and Universal Coordinated Time (UTC). */
  getTimezoneOffset() {
    return this._gDate.getTimezoneOffset()
  }

  /**
   * Sets the date and time value in the Date object.
   * @param time A numeric value representing the number of elapsed milliseconds since midnight, January 1, 1970 GMT.
   */
  setTime(time) {
    const res = this._gDate.setTime(time)
    this.syncJalali()
    return res
  }

  /**
   * Sets the milliseconds value in the Date object using local time.
   * @param ms A numeric value equal to the millisecond value.
   */
  setMilliseconds(ms) {
    const res = this._gDate.setMilliseconds(ms)
    this.syncJalali()
    return res
  }

  /**
   * Sets the milliseconds value in the Date object using Universal Coordinated Time (UTC).
   * @param ms A numeric value equal to the millisecond value.
   */
  setUTCMilliseconds(ms) {
    const res = this._gDate.setUTCMilliseconds(ms)
    this.syncJalali()
    return res
  }

  /**
   * Sets the seconds value in the Date object using local time.
   * @param sec A numeric value equal to the seconds value.
   * @param ms A numeric value equal to the milliseconds value.
   */
  setSeconds(sec, ms) {
    const res = this._gDate.setSeconds(sec, ms)
    this.syncJalali()
    return res
  }

  /**
   * Sets the seconds value in the Date object using Universal Coordinated Time (UTC).
   * @param sec A numeric value equal to the seconds value.
   * @param ms A numeric value equal to the milliseconds value.
   */
  setUTCSeconds(sec, ms) {
    const res = this._gDate.setUTCSeconds(sec, ms)
    this.syncJalali()
    return res
  }

  /**
   * Sets the minutes value in the Date object using local time.
   * @param min A numeric value equal to the minutes value.
   * @param sec A numeric value equal to the seconds value.
   * @param ms A numeric value equal to the milliseconds value.
   */
  setMinutes(min, sec, ms) {
    const res = this._gDate.setMinutes(min, sec, ms)
    this.syncJalali()
    return res
  }

  /**
   * Sets the minutes value in the Date object using Universal Coordinated Time (UTC).
   * @param min A numeric value equal to the minutes value.
   * @param sec A numeric value equal to the seconds value.
   * @param ms A numeric value equal to the milliseconds value.
   */
  setUTCMinutes(min, sec, ms) {
    const res = this._gDate.setUTCMinutes(min, sec, ms)
    this.syncJalali()
    return res
  }

  /**
   * Sets the hour value in the Date object using local time.
   * @param hours A numeric value equal to the hours value.
   * @param min A numeric value equal to the minutes value.
   * @param sec A numeric value equal to the seconds value.
   * @param ms A numeric value equal to the milliseconds value.
   */
  setHours(hours, min, sec, ms) {
    const res = this._gDate.setHours(hours, min, sec, ms)
    this.syncJalali()
    return res
  }

  /**
   * Sets the hours value in the Date object using Universal Coordinated Time (UTC).
   * @param hours A numeric value equal to the hours value.
   * @param min A numeric value equal to the minutes value.
   * @param sec A numeric value equal to the seconds value.
   * @param ms A numeric value equal to the milliseconds value.
   */
  setUTCHours(hours, min, sec, ms) {
    const res = this._gDate.setUTCHours(hours, min, sec, ms)
    this.syncJalali()
    return res
  }

  /**
   * Sets the numeric day-of-the-month value of the Date object using local time.
   * @param date A numeric value equal to the day of the month.
   */
  setDate(date) {
    return this.setJalaliParameters(null, null, date)
  }

  /**
   * Sets the numeric day of the month in the Date object using Universal Coordinated Time (UTC).
   * @param date A numeric value equal to the day of the month.
   */
  setUTCDate(date) {
    return this.setJalaliParameters(null, null, date)
  }

  /**
   * Sets the month value in the Date object using local time.
   * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively.
   * @param date A numeric value representing the day of the month. If this value is not supplied, the value from a call to the getDate method is used.
   */
  setMonth(month, date) {
    return this.setJalaliParameters(null, month, date)
  }

  /**
   * Sets the month value in the Date object using Universal Coordinated Time (UTC).
   * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively.
   * @param date A numeric value representing the day of the month. If it is not supplied, the value from a call to the getUTCDate method is used.
   */
  setUTCMonth(month, date) {
    return this.setJalaliParameters(null, month, date)
  }

  /**
   * Sets the year of the Date object using local time.
   * @param year A numeric value for the year.
   * @param month A zero-based numeric value for the month (0 for January, 11 for December). Must be specified if numDate is specified.
   * @param date A numeric value equal for the day of the month.
   */
  setFullYear(year, month, date) {
    return this.setJalaliParameters(year, month, date)
  }

  /**
   * Sets the year value in the Date object using Universal Coordinated Time (UTC).
   * @param year A numeric value equal to the year.
   * @param month A numeric value equal to the month. The value for January is 0, and other month values follow consecutively. Must be supplied if numDate is supplied.
   * @param date A numeric value equal to the day of the month.
   */
  setUTCFullYear(year, month, date) {
    return this.setJalaliParameters(year, month, date)
  }

  /** Returns a date converted to a string using Universal Coordinated Time (UTC). */
  toUTCString() {
    return this._gDate.toUTCString()
  }

  /** Returns a date as a string value in ISO format. */
  toISOString() {
    return this._gDate.toISOString()
  }

  /** Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object Notation (JSON) serialization. */
  toJSON(key) {
    return this._jDate.year + '-' + this._jDate.month
      + '-' + this._jDate.day + 'T' + this._gDate.getHours()
      + ':' + this._gDate.getMinutes() + ':' + this._gDate.getSeconds()
      + '.' + (this._gDate.getMilliseconds() / 1000).toFixed(3).slice(2, 5)
      + 'Z'
  } 

  setJalaliParameters(year, monthIndex, date) {
    year = year || year === 0 ? year : this._jDate.year
    monthIndex = monthIndex || monthIndex === 0 ? monthIndex : this._jDate.month
    date = date || date === 0 ? date : this._jDate.day

    if (date === 0) {
      date = -1
    }

    let daysInMonth,
      currentYear = year
    daysInMonth = jalaaliMonthLength(year, monthIndex + 1)

    if (date > 0) {
      while (date > daysInMonth) {
        monthIndex++
        date -= daysInMonth

        if (monthIndex % 12 === 0) {
          currentYear++
        }

        daysInMonth = jalaaliMonthLength(currentYear, monthIndex + 1)
      }
    } else {
      while (date < 0) {
        monthIndex--
        daysInMonth = jalaaliMonthLength(year, monthIndex + 1)

        if (Math.abs(date) >= daysInMonth) {
          date += daysInMonth
        } else {
          date = daysInMonth + date + 1
        }
      }

      if (date === 0) {
        date = 1
      }
    }

    if (monthIndex > 0) {
      while (monthIndex > 11) {
        year++
        monthIndex -= 12
      }
    } else {
      while (monthIndex < 0) {
        year--
        monthIndex += 12
      }
    }
    const newGregorianDate = toGregorian(
      year,
      monthIndex + 1,
      Math.min(date, daysInMonth)
    )
    this._gDate = new Date(
      newGregorianDate.gy,
      newGregorianDate.gm - 1,
      newGregorianDate.gd,
      this._gDate.getHours(),
      this._gDate.getMinutes(),
      this._gDate.getSeconds(),
      this._gDate.getMilliseconds()
    )

    this.syncJalali()

    return this._gDate.getTime()
  }
}
