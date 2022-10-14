/* eslint-disable no-underscore-dangle */

import moment from 'moment';
class Helper {
  /**
   * @param {String | Date} date -
   * @param {Boolean} withDay -
   * @returns {String} -  Aug 6, 2007
   */
  

   static getCurrentDateInYYYYMMDD() {
    const currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  }
   static formatDateRangeByCriteriaV2(selectedMenu) {
    let dateFrom = this.getCurrentDateInYYYYMMDD();
    let dateTo = this.getCurrentDateInYYYYMMDD();
    
    dateFrom = moment(`${dateFrom}T00:00:00.000Z`);
    dateTo = moment(`${dateTo}T00:00:00.000Z`);
    const fmt = "YYYY-MM-DD"; // do not change as backend accepts this format
    let date1 = null;
    let date2 = null;
    switch (selectedMenu) {
      case "Today":
      case "today":
        date1 = dateFrom.utc().format(fmt);

        date2 = date1;
        break;
      case "Tomorrow":
      case "tomorrow":
        date2 = dateFrom.add(1, "days").utc().format(fmt);
        date1 = dateTo.add(1, "days").utc().format(fmt);
        break;
      case "Yesterday":
      case "yesterday":
        date1 = dateFrom.subtract(1, "days").utc().format(fmt);
        date2 = dateTo.subtract(1, "days").utc().format(fmt);
        break;
      case "This week":
      case "thisWeek":
        date1 = dateFrom.startOf("week").add(1,"days").format(fmt);
        
        date2 = dateTo.endOf("week").add(1,"days").format(fmt);
        break;
      case "Last week":
      case "lastWeek":
        date1 = dateFrom
          .subtract(1, "week")
          .startOf("week").add(1,"days")
          .format(fmt);
        date2 = dateTo
          .subtract(1, "week")
          .endOf("week").add(1,"days")
          .format(fmt);
        break;
      case "Last month":
      case "lastMonth":
        date1 = dateFrom
        
        .subtract(1, "month")
        .startOf("month")
        .format(fmt);
        date2 = dateTo.utc().format(fmt);
        break;
      case "This month":
      case "thisMonth":
        date1 = dateFrom.startOf("month").format(fmt);
        date2 = dateTo.endOf("month").format(fmt);
        break;
        case "ytd":
          case "YTD":
          date1 = dateFrom.startOf("year").format(fmt);
          date2 = dateTo.utc().format(fmt);
          break;  
      case "Last 90 days":
      case "last90Days":
        date1 = dateFrom.subtract(90, "days").utc().format(fmt);
        date2 = dateTo.utc().format(fmt);
        break;
      case "Last 30 days":
      case "last30Days":
        date1 = dateFrom.subtract(30, "days").utc().format(fmt);
        date2 = dateTo.utc().format(fmt);
        break;
      case "Last 7 days":
      case "last7Days":
        date1 = dateFrom.subtract(7, "days").utc().format(fmt);
        date2 = dateTo.utc().format(fmt);
        break;
      case "Next 90 days":
      case "next90Days":
        date2 = dateTo.add(90, "days").utc().format(fmt);
        date1 = dateFrom.utc().format(fmt);
        break;
      case "Next 30 days":
      case "next30Days":
        date2 = dateTo.add(30, "days").utc().format(fmt);
        date1 = dateFrom.utc().format(fmt);
        break;
      case "Next 7 days":
      case "next7Days":
        date2 = dateTo.add(7, "days").utc().format(fmt);
        date1 = dateFrom.utc().format(fmt);
        break;

      case "custom":
        // do nothing
        // for custom, check onClickApplyDate()
        break;
      default:
        break;
    }

    return { from: date1, to: date2 };
  }


static formatExcelReport(availableCols, data) {

  let results = [];
  for (const rec of data) {
    const jsonObj = {};
    for (const col of availableCols) {
      if (col.header && (!['actions'].includes(col.name))) {
        jsonObj[col.header] = rec[col.name];
      }
    }
    results.push(jsonObj);//
  }
  return results;
}
}
export default Helper;
