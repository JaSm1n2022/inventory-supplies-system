import { LIMIT_ITEM_PRINT } from "../../utils/constants";

class DocumentHandler {

    static unitDistributionHandler(qty, unit) {
        if (unit && unit === 'Pcs' && qty < 2) {
            return `${qty} Pc`;
        }
        return `${qty} ${unit}`;

    }
    static vendorHandler(vendor) {
        if (vendor && vendor.toLowerCase() === 'amazon') {
            return 'AMZ';
        } else if (vendor && vendor.toLowerCase() === 'medline') {
            return 'MDL';
        } else if (vendor && vendor.toLowerCase() === 'mckesson') {
            return 'MKS';
        } else if (vendor && vendor.toLowerCase() === 'walmart') {
            return 'WLM';
        } else {
            return 'OTH';
        }


    }
    static cnaColumns() {
        return [
            { width: 60, name: 'cnt', header: '#' },
            { width: 580, name: 'description', header: 'Description' },
            { defaultFlex: 1, name: 'units', header: 'Units' },

        ]
    }
    static adminColumns() {
        return [
            { width: 60, name: 'cnt', header: '#' },
            { width: 100, name: 'category', header: 'Category' },
            { width: 340, name: 'description', header: 'Description' },
            { width: 100, name: 'units', header: 'Units' },
            { width: 80, name: 'size', header: 'Size' },
            { width: 100, name: 'vendor', header: 'Vendor' },


        ]
    }
    static productItems(details, mode) {
        const finalData = [];

        for (let item = 0; item < LIMIT_ITEM_PRINT; item++) {
            const record =
            {
                cnt: item + 1,
                category: details[item] && details[item].search ? details[item].search.category || details[item].search.category : '',
                description: details[item] && details[item].search ? details[item].search.shortDescription || details[item].search.short_description : '',
                units: details[item] ? this.unitDistributionHandler(details[item].orderQty, details[item].search.unitDistribution || details[item].search.unit_distribution || details[item].unit_distribution) : '',
                size: details[item] && details[item].search ? details[item].search.size || details[item].search.size : '',
                vendor: details[item] && details[item].vendor ? this.vendorHandler(details[item].search.vendor || details[item].search.vendor) : '',
            };
            if (details[item] && details[item].comments && mode && mode === 'admin') {
                record.description += `(note : ${details[item].comments})`;
            }
            finalData.push(record);

        }
        return finalData;
    }
}

export default DocumentHandler;
