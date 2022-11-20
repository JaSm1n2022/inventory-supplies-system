/* eslint-disable no-underscore-dangle */

class SortUtil {
    /**
     * @param {String | Date} date -
     * @param {Boolean} withDay -
     * @returns {String} -  Aug 6, 2007
     */
    static sortIdentifiers() {
      const sortIdentifiers = new Map([
        ["shipmentNbr", true],
        ["eta", true],
        ["etaSeverityHr", true],
        ["fclSeverityDay", true],
        ["detentionSeverityDay", true],
        ["lfd", true],
        ["lfdSeverityDay", true],
        ["fclAvailableDt", true],
        ["detentionStartDt", true],
        ["etd", true],
        ["etdSeverityHr", true],
        ["actualDelvDt", true],
        ["actPickTime", true],
        ["shipmentRef", true],
        ["status", true],
        ["deliverLoc", true],
        ["doorAssign", true],
        ["priority", true],
        ["pickupLoc", true],
        ["etd", true],
        ["schDeliveryTime", true],
        ["schPickupTime", true],
        ["driver", true],
        ["carrierName", true],
        ["portAvailable", true],
        ["portEta", true],
        ["portAta", true],
        ["railAvailable", true],
        ["railEta", true],
        ["railAta", true],
        ["oceanCarrier", true],
        ["equipmentNbr", true],
        ["transportMode", true],
        ["importReleaseNbr", true],
        ["portApptPickupTime", true],
        ["portApptEmptyReturnTime", true],
        ["portApptPickupReference", true],
        ["portApptEmptyReturnReference", true],
        ["chassisNumber", true],
        ["sealNumber", true],
        ["bobtail", true],
        ["qty", true],
        ["qtyUom", true],
        ["wt", true],
        ["wtUom", true],
        ["vol", true],
        ["volUom", true],
        ["innerQty", true],
        ["outerQty", true],
        ["loadReference", true],
        ["waitTimeAtDelivery", true],
        ["waitTimeAtPickup", true],
        ["receiveDt", true],
        ["created", true],
        ["freightClass", true],
        ["custAppointmentNumber", true],
        ["destState", true],
        ["destCity", true],
        ["etaDate", true],
        ["poNbr", true],
        ["contractualDueDate", true],
        ["importReleaseStatus", true],
        ["portAppointmentDate", true],
        ["appointmentStatus", true],
        ["gateAppointmentNumber", true],
      ]);
      return sortIdentifiers;
    }
  
    static setSortOrder(mode, myMap) {
      const isSort = myMap.get(mode);
      const sortIdentifiers = new Map();
      myMap.forEach(function (value, key) {
        if (key === mode) {
          sortIdentifiers.set(key, !isSort);
        } else {
          sortIdentifiers.set(key, true);
        }
      });
      return sortIdentifiers;
    }
  
    static formatSortObject(a, b, mode, page) {
      const lowerAlphaList = [
        "shipmentNbr",
        "shipmentRef",
        "status",
        "carrierName",
        "equipmentNbr",
        "transportMode",
        "portApptPickupReference",
        "portApptEmptyReturnReference",
        "sealNumber",
        "bobtail",
        "qtyUom",
        "wtUom",
        "volUom",
        "loadReference",
        "freightClass",
        "doorAssign",
        "custAppointmentNumber",
        "destState",
        "destCity",
        "poNbr",
      ];
      const dateList = [
        "portAvailable",
        "portEta",
        "portAta",
        "railAvailable",
        "railEta",
        "railAta",
        "created",
        "fclAvailableDt",
        "etaDate",
        "contractualDueDate",
        "actualDelvDt",
      ];
      const intlist = [
        "qty",
        "wt",
        "vol",
        "etaSeverityHr",
        "fclSeverityDay",
        "detentionSeverityDay",
        "lfd",
        "lfdSeverityDay",
        "etdSeverityHr",
        "innerQty",
        "outerQty",
      ];
      const priorityNumber = (priority) => {
        if (priority === "High") {
          return 3;
        } else if (priority === "Medium") {
          return 2;
        } else if (priority === "Low") {
          return 1;
        } else {
          return 0;
        }
      };
      if (page === "userPage") {
        if (mode === "name") {
          this._a = a.name;
          this._b = b.name;
        } else if (mode === "role") {
          this._a = a.role;
          this._b = b.role;
        } else if (mode === "account") {
          this._a = a.account;
          this._b = b.account;
        } else if (mode === "workTitle") {
          this._a = a.workTitle;
          this._b = b.workTitle;
        } else if (mode === "status") {
          this._a = a.active;
          this._b = b.active;
        } else if (mode === "phone") {
          this._a = a.phone;
          this._b = b.phone;
        }
      } else if (page === "locationPage") {
        if (mode === "name") {
          this._a = a.name;
          this._b = b.name;
        } else if (mode === "locType") {
          this._a = a.locType;
          this._b = b.locType;
        } else if (mode === "address") {
          this._a = a.address;
          this._b = b.address;
        } else if (mode === "parent") {
          this._a = a.parent;
          this._b = b.parent;
        } else if (mode === "control") {
          this._a = a.control;
          this._b = b.control;
        } else if (mode === "status") {
          this._a = a.status;
          this._b = b.status;
        } else if (mode === "update") {
          this._a = a.update ? new Date(a.update) : "";
          this._b = b.update ? new Date(b.update) : "";
        }
      } else {
        // if (page === 'shipmentPage') {
        if (lowerAlphaList.includes(mode)) {
          this._a = (a.data[mode] || "").toLowerCase();
          this._b = (b.data[mode] || "").toLowerCase();
        } else if (dateList.includes(mode)) {
          this._a = a.data[mode] ? new Date(a.data[mode]) : "";
          this._b = b.data[mode] ? new Date(b.data[mode]) : "";
        } else if (intlist.includes(mode)) {
          this._a = parseInt(a.data[mode]) || 0;
          this._b = parseInt(b.data[mode]) || 0;
        } else if (mode === "deliverLoc") {
          this._a = (a.data["delLocation.name"] || "").toLowerCase();
          this._b = (b.data["delLocation.name"] || "").toLowerCase();
        } else if (mode === "pickupLoc") {
          this._a =
            a.data.pickupLocation && a.data.pickupLocation.name
              ? a.data.pickupLocation.name.toLowerCase()
              : "";
          this._b =
            b.data.pickupLocation && b.data.pickupLocation.name
              ? b.data.pickupLocation.name.toLowerCase()
              : "";
        } else if (mode === "driver") {
          this._a =
            a.data.driver.name && a.data.driver.name
              ? a.data.driver.name.toLowerCase()
              : "";
          this._b =
            b.data.driver.name && b.data.driver.name
              ? b.data.driver.name.toLowerCase()
              : "";
        } else if (mode === "oceanCarrier") {
          this._a = a.data.oceanCarrierName.toLowerCase();
          this._b = b.data.oceanCarrierName.toLowerCase();
        } else if (mode === "importReleaseNbr") {
          this._a = a.data.importReleaseNumber.toLowerCase();
          this._b = b.data.importReleaseNumber.toLowerCase();
        } else if (mode === "portApptPickupTime") {
          this._a = a.data.apptPortPickupFromSortValue
            ? new Date(a.data.apptPortPickupFromSortValue)
            : "";
          this._b = b.data.apptPortPickupFromSortValue
            ? new Date(b.data.apptPortPickupFromSortValue)
            : "";
        } else if (mode === "portApptEmptyReturnTime") {
          this._a = a.data.apptPortEmptyReturnFromSortValue
            ? new Date(a.data.apptPortEmptyReturnFromSortValue)
            : "";
          this._b = b.data.apptPortEmptyReturnFromSortValue
            ? new Date(b.data.apptPortEmptyReturnFromSortValue)
            : "";
        } else if (mode === "chassisNumber") {
          this._a =
            a.data.chassisNumber === "-"
              ? "ZZZZZZ"
              : a.data.chassisNumber.toLowerCase();
          this._b =
            b.data.chassisNumber === "-"
              ? "ZZZZZZ"
              : b.data.chassisNumber.toLowerCase();
        } else if (mode === "waitTimeAtDelivery") {
          this._a = a.data.waitTimeAtDeliverySortValue || "";
          this._b = b.data.waitTimeAtDeliverySortValue || "";
        } else if (mode === "waitTimeAtPickup") {
          this._a = a.data.waitTimeAtPickupSortValue || 0;
          this._b = b.data.waitTimeAtPickupSortValue || 0;
        } else if (mode === "receiveDt") {
          this._a = a.data.receiveDtSortValue
            ? new Date(a.data.receiveDtSortValue)
            : "";
          this._b = b.data.receiveDtSortValue
            ? new Date(b.data.receiveDtSortValue)
            : "";
        } else if (mode === "eta") {
          this._a = a.data.etaSortValue ? new Date(a.data.etaSortValue) : "";
          this._b = b.data.etaSortValue ? new Date(b.data.etaSortValue) : "";
        } else if (mode === "detentionStartDt") {
          this._a = a.data.contrDetentionDt
            ? new Date(a.data.contrDetentionDt)
            : "";
          this._b = b.data.contrDetentionDt
            ? new Date(b.data.contrDetentionDt)
            : "";
        } else if (mode === "etd") {
          this._a = a.data.etdSortValue ? new Date(a.data.etaSortValue) : "";
          this._b = b.data.etdSortValue ? new Date(b.data.etaSortValue) : "";
        } else if (mode === "actPickTime") {
          this._a = a.data.actualPickupDt ? new Date(a.data.actualPickupDt) : "";
          this._b = b.data.actualPickupDt ? new Date(b.data.actualPickupDt) : "";
        } else if (mode === "schPickupTime") {
          this._a = a.data.schedPickupDtFromSortValue
            ? new Date(a.data.schedPickupDtFromSortValue)
            : "";
          this._b = b.data.schedPickupDtFromSortValue
            ? new Date(b.data.schedPickupDtFromSortValue)
            : "";
        } else if (mode === "schDeliveryTime") {
          this._a = a.data.schedDelvFullDtFromSortValue
            ? new Date(a.data.schedDelvFullDtFromSortValue)
            : "";
          this._b = b.data.schedDelvFullDtFromSortValue
            ? new Date(b.data.schedDelvFullDtFromSortValue)
            : "";
        } else if (mode === "priority") {
          this._a = priorityNumber(a.data.priority);
          this._b = priorityNumber(b.data.priority);
        }
      }
    }
  
    static sortColumnFilter(items) {
      items.sort((a, b) => {
        const a1 = a.col;
        const a2 = b.col;
        if (a1 < a2) {
          return -1;
        } else if (a1 > a2) {
          return 1;
        } else {
          return 0;
        }
      });
      return items;
    }
  
    static sortCarrierType(items, mode) {
      items.sort((a, b) => {
        let a1 = a.id;
        let a2 = b.id;
        if (mode === "value") {
          a1 = a.value;
          a2 = b.value;
        }
        if (a1 < a2) {
          return -1;
        } else if (a1 > a2) {
          return 1;
        } else {
          return 0;
        }
      });
      return items;
    }
  
    static sortHistoryByEventDt(items) {
      items.sort((a, b) => {
        let a1 = new Date(a.eventDt);
        let a2 = new Date(b.eventDt);
  
        if (a1 > a2) {
          return -1;
        } else if (a1 < a2) {
          return 1;
        } else {
          return 0;
        }
      });
      return items;
    }
  
    static sortByColumn(mode, isAsc, items, page) {
      if (!isAsc) {
        items.sort((a, b) => {
          this.formatSortObject(a, b, mode, page);
          if (this._a < this._b) {
            return -1;
          } else if (this._a > this._b) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (isAsc) {
        items.sort((a, b) => {
          this.formatSortObject(a, b, mode, page);
          if (this._a > this._b) {
            return -1;
          } else if (this._a < this._b) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      return items;
    }
  
    static sortBySelectedAndName(data) {
      data.sort((a, b) => {
        this._a = a.selected
          ? `0${a.name.replace(/[^0-9a-z]/gi, "").toLowerCase()}`
          : `1${a.name.replace(/[^0-9a-z]/gi, "").toLowerCase()}`;
        this._b = b.selected
          ? `0${b.name.replace(/[^0-9a-z]/gi, "").toLowerCase()}`
          : `1${b.name.replace(/[^0-9a-z]/gi, "").toLowerCase()}`;
        if (this._a < this._b) {
          return -1;
        } else if (this._a > this._b) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  
    static sortByRate(data, attr) {
      data.sort((a, b) => {
        this._a = a[attr] ? parseFloat(a[attr]) : 0.0;
        this._b = b[attr] ? parseFloat(b[attr]) : 0.0;
        if (this._a < this._b) {
          return -1;
        } else if (this._a > this._b) {
          return 1;
        } else {
          return 0;
        }
      });
      return data;
    }
    static sortByAsc(data, attr, isAsc) {
      if (!isAsc) {
        data.sort((a, b) => {
          this._a = a[attr].toLowerCase();
          this._b = b[attr].toLowerCase();
          if (this._a < this._b) {
            return -1;
          } else if (this._a > this._b) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (isAsc) {
        data.sort((a, b) => {
          this._a = a[attr].toLowerCase();
          this._b = b[attr].toLowerCase();
          if (this._a > this._b) {
            return -1;
          } else if (this._a < this._b) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      return data;
    }
    static sortByIndx(data, attr, isAsc) {
      if (!isAsc) {
        data.sort((a, b) => {
          this._a = a[attr];
          this._b = b[attr];
          if (this._a < this._b) {
            return -1;
          } else if (this._a > this._b) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (isAsc) {
        data.sort((a, b) => {
          this._a = a[attr];
          this._b = b[attr];
          if (this._a > this._b) {
            return -1;
          } else if (this._a < this._b) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      return data;
    }

    static sortByPatientStatus = async (items) => {
      console.log('[items to sort]',items);
      items.sort((a, b) => {
        const tempA = !a.status ? 'ACTIVE' : a.status.toUpperCase();
        const tempB = !b.status ? 'ACTIVE' : b.status.toUpperCase();
        if (tempA < tempB) {
          return -1;
        } if (tempA > tempB) {
          return 1;
        }
        return 0;
      });
      console.log('[return me]',items);
      return items;
    };
  
    static sortLocalCompare(data) {
      data.sort(function (a, b) {
        if (a.selected && b.selected) {
          // Price is only important when cities are the same
          this._a = a.name;
          this._b = b.name;
          if (this._a > this._b) {
            return -1;
          } else if (this._a < this._b) {
            return 1;
          } else {
            return 0;
          }
        }
        return a.name > b.name ? 1 : -1;
      });
    }
  }
  export default SortUtil;
  