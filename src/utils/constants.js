import { v4 as uuidv4 } from 'uuid';
export const SEARCH_KEYWORDS = [
  'ALL',
  'Order Number',
  'Item',
  'Description',
  'Vendor'
]
export const LOCAL_STORAGE_IDS = {
  user: 'fsuser',
  headersArriveTable: 'headers_arrive-table',
  viewProfile: 'viewProfile',
  columnsHeaderProfile: 'columnsHeaderProfile',
  usedLocation: 'used-location',
  usedPerson: 'used-person',
  reference: 'reference',
  queryFilter: 'queryFilter',
  cwRangeGap: 'cwRangeGap',
  token: 'fs_token',
  expirationDate: 'expirationDate',
  userId: 'userId',
  dExists: 'd_exists'
}



export const DEFAULT_ITEM = { name: '', value: '', label: '' };
export const DATE_TYPE_SELECTION = [
  { name: "Today", value: "today", label: "Today", id: "1" },
  { name: "Yesterday", value: "yesterday", label: "Yesterday", id: "2" },
  { name: "Tomorrow", value: "tomorrow", label: "Tomorrow", id: "3" },
  { name: "Last Week", value: "lastWeek", label: "Last Week", id: "4" },
  { name: "This Week", value: "thisWeek", label: "This Week", id: "5" },
  { name: "Last Month", value: "lastMonth", label: "Last Month", id: "6" },
  { name: "This Month", value: "thisMonth", label: "This Month", id: "7" },
  { name: "Last 30 Days", value: "last30Days", label: "Last 30 Days", id: "9" },
  { name: "Last 90 Days", value: "last90Days", label: "Last 90 Days", id: "10" },
  { name: "YTD", value: "ytd", label: "YTD", id: "11" },
  { name: "Custom", value: "custom", label: "Custom", id: "12" },
]
export const ACTION_STATUSES = {
  PENDING: 'Pending',
  SUCCEED: 'Succeed',
  FAILED: 'Failed',
  UNDEFINED: undefined
};

export const INPUT_STATUSES = {
  VALID: 'valid',
  INVALID: 'invalid',
  UNDEFINED: undefined
};

export const INPUT_CLASS_NAMES = {
  [INPUT_STATUSES.VALID]: 'valid-input',
  [INPUT_STATUSES.INVALID]: 'invalid-input'
};

export const DEFAULT_ERROR = {
  debug: 'Something went wrong',
  details: 'Something went wrong'
};





export const countries =
  [
    { name: 'UNITED STATES', code: 'US' },
    { name: 'AFGHANISTAN', code: 'AF' },
    { name: 'Aland Islands', code: 'AX' },
    { name: 'ALBANIA', code: 'AL' },
    { name: 'ALGERIA', code: 'DZ' },
    { name: 'AMERICAN SAMOA', code: 'AS' },
    { name: 'ANDORRA', code: 'AD' },
    { name: 'ANGOLA', code: 'AO' },
    { name: 'ANGUILLA', code: 'AI' },
    { name: 'ANTARCTICA', code: 'AQ' },
    { name: 'ANTIGUA AND BARBUDA', code: 'AG' },
    { name: 'ARGENTINA', code: 'AR' },
    { name: 'ARMENIA', code: 'AM' },
    { name: 'ARUBA', code: 'AW' },
    { name: 'AUSTRALIA', code: 'AU' },
    { name: 'AUSTRIA', code: 'AT' },
    { name: 'AZERBAIJAN', code: 'AZ' },
    { name: 'BAHAMAS', code: 'BS' },
    { name: 'BAHRAIN', code: 'BH' },
    { name: 'BANGLADESH', code: 'BD' },
    { name: 'BARBADOS', code: 'BB' },
    { name: 'BELARUS', code: 'BY' },
    { name: 'BELGIUM', code: 'BE' },
    { name: 'BELIZE ', code: 'BZ' },
    { name: 'BENIN', code: 'BJ' },
    { name: 'BERMUDA', code: 'BM' },
    { name: 'BHUTAN', code: 'BT' },
    { name: 'BOLIVIA', code: 'BO' },
    { name: 'BOSNIA AND HERZEGOWINA', code: 'BA' },
    { name: 'BOTSWANA', code: 'BW' },
    { name: 'BOUVET ISLAND', code: 'BV' },
    { name: 'BRAZIL', code: 'BR' },
    { name: 'BRITISH INDIAN OCEAN TERRITORY', code: 'IO' },
    { name: 'BRUNEI DARUSSALAM', code: 'BN' },
    { name: 'BULGARIA', code: 'BG' },
    { name: 'BURKINA FASO', code: 'BF' },
    { name: 'BURUNDI', code: 'BI' },
    { name: 'CAMBODIA', code: 'KH' },
    { name: 'CAMEROON', code: 'CM' },
    { name: 'CANADA', code: 'CA' },
    { name: 'CAPE VERDE', code: 'CV' },
    { name: 'CAYMAN ISLANDS', code: 'KY' },
    { name: 'CENTRAL AFRICAN REPUBLIC', code: 'CF' },
    { name: 'CHAD', code: 'TD' },
    { name: 'CHILE', code: 'CL' },
    { name: 'CHINA', code: 'CN' },
    { name: 'CHRISTMAS ISLAND', code: 'CX' },
    { name: 'COCOS (KEELING) ISLANDS', code: 'CC' },
    { name: 'COLOMBIA', code: 'CO' },
    { name: 'COMOROS', code: 'KM' },
    { name: 'CONGO (Brazzaville)', code: 'CG' },
    { name: 'CONGO (Kinshasa)', code: 'CD' },
    { name: 'COOK ISLANDS', code: 'CK' },
    { name: 'COSTA RICA', code: 'CR' },
    { name: 'COTE D\'IVOIRE\'', code: 'CI' },
    { name: 'CROATIA (local name: Hrvatska)', code: 'HR' },
    { name: 'CUBA', code: 'CU' },
    { name: 'CYPRUS', code: 'CY' },
    { name: 'CZECH REPUBLIC', code: 'CZ' },
    { name: 'DENMARK', code: 'DK' },
    { name: 'DJIBOUTI', code: 'DJ' },
    { name: 'DOMINICA', code: 'DM' },
    { name: 'DOMINICAN REPUBLIC', code: 'DO' },
    { name: 'EAST TIMOR', code: 'TP' },
    { name: 'ECUADOR', code: 'EC' },
    { name: 'EGYPT', code: 'EG' },
    { name: 'EL SALVADOR', code: 'SV' },
    { name: 'EQUATORIAL GUINEA', code: 'GQ' },
    { name: 'ERITREA', code: 'ER' },
    { name: 'ESTONIA', code: 'EE' },
    { name: 'ETHIOPIA', code: 'ET' },
    { name: 'FALKLAND ISLANDS (MALVINAS)', code: 'FK' },
    { name: 'FAROE ISLANDS', code: 'FO' },
    { name: 'FIJI', code: 'FJ' },
    { name: 'FINLAND', code: 'FI' },
    { name: 'FRANCE', code: 'FR' },
    { name: 'FRANCE, METROPOLITAN', code: 'FX' },
    { name: 'FRENCH GUIANA', code: 'GF' },
    { name: 'FRENCH POLYNESIA', code: 'PF' },
    { name: 'FRENCH SOUTHERN TERRITORIES', code: 'TF' },
    { name: 'GABON', code: 'GA' },
    { name: 'GAMBIA', code: 'GM' },
    { name: 'GEORGIA', code: 'GE' },
    { name: 'GERMANY', code: 'DE' },
    { name: 'GHANA', code: 'GH' },
    { name: 'GIBRALTAR', code: 'GI' },
    { name: 'GREECE', code: 'GR' },
    { name: 'GREENLAND', code: 'GL' },
    { name: 'GRENADA', code: 'GD' },
    { name: 'GUADELOUPE', code: 'GP' },
    { name: 'GUAM', code: 'GU' },
    { name: 'GUATEMALA', code: 'GT' },
    { name: 'Guernsey, Bailiwick of', code: 'GG' },
    { name: 'GUINEA', code: 'GN' },
    { name: 'GUINEA-BISSAU', code: 'GW' },
    { name: 'GUYANA', code: 'GY' },
    { name: 'HAITI', code: 'HT' },
    { name: 'HEARD AND MC DONALD ISLANDS', code: 'HM' },
    { name: 'HOLY SEE (VATICAN CITY STATE)', code: 'VA' },
    { name: 'HONDURAS', code: 'HN' },
    { name: 'HONG KONG', code: 'HK' },
    { name: 'HUNGARY', code: 'HU' },
    { name: 'ICELAND', code: 'IS' },
    { name: 'INDIA', code: 'IN' },
    { name: 'INDONESIA', code: 'ID' },
    { name: 'IRAN (ISLAMIC REPUBLIC OF)', code: 'IR' },
    { name: 'IRAQ', code: 'IQ' },
    { name: 'IRELAND', code: 'IE' },
    { name: 'Isle of Man', code: 'IM' },
    { name: 'ISRAEL', code: 'IL' },
    { name: 'ITALY', code: 'IT' },
    { name: 'JAMAICA', code: 'JM' },
    { name: 'JAPAN', code: 'JP' },
    { name: 'Jersey, Bailiwick of', code: 'JE' },
    { name: 'JORDAN', code: 'JO' },
    { name: 'KAZAKHSTAN', code: 'KZ' },
    { name: 'KENYA', code: 'KE' },
    { name: 'KIRIBATI', code: 'KI' },
    { name: 'KOREA, D.P.R.O.', code: 'KP' },
    { name: 'KOREA, REPUBLIC OF (KR)', code: 'KR' },
    { name: 'KOREA, REPUBLIC OF (KO)', code: 'KO' },
    { name: 'KUWAIT', code: 'KW' },
    { name: 'KYRGYZSTAN', code: 'KG' },
    { name: 'LAOS', code: 'LA' },
    { name: 'LATVIA', code: 'LV' },
    { name: 'LEBANON', code: 'LB' },
    { name: 'LESOTHO', code: 'LS' },
    { name: 'LIBERIA', code: 'LR' },
    { name: 'LIBYAN ARAB JAMAHIRIYA', code: 'LY' },
    { name: 'LIECHTENSTEIN', code: 'LI' },
    { name: 'LITHUANIA', code: 'LT' },
    { name: 'LUXEMBOURG', code: 'LU' },
    { name: 'MACAU', code: 'MO' },
    { name: 'MACEDONIA', code: 'MK' },
    { name: 'MADAGASCAR', code: 'MG' },
    { name: 'MALAWI', code: 'MW' },
    { name: 'MALAYSIA', code: 'MY' },
    { name: 'MALDIVES', code: 'MV' },
    { name: 'MALI', code: 'ML' },
    { name: 'MALTA', code: 'MT' },
    { name: 'MARSHALL ISLANDS', code: 'MH' },
    { name: 'MARTINIQUE', code: 'MQ' },
    { name: 'MAURITANIA', code: 'MR' },
    { name: 'MAURITIUS', code: 'MU' },
    { name: 'MAYOTTE', code: 'YT' },
    { name: 'MEXICO', code: 'MX' },
    { name: 'MICRONESIA, FEDERATED STATES OF', code: 'FM' },
    { name: 'MOLDOVA, REPUBLIC OF', code: 'MD' },
    { name: 'MONACO', code: 'MC' },
    { name: 'MONGOLIA', code: 'MN' },
    { name: 'MONTSERRAT', code: 'MS' },
    { name: 'MOROCCO', code: 'MA' },
    { name: 'MOZAMBIQUE', code: 'MZ' },
    { name: 'MYANMAR (Burma)', code: 'MM' },
    { name: 'NAMIBIA', code: 'NA' },
    { name: 'NAURU', code: 'NR' },
    { name: 'NEPAL', code: 'NP' },
    { name: 'NETHERLANDS', code: 'NL' },
    { name: 'NETHERLANDS ANTILLES', code: 'AN' },
    { name: 'NEW CALEDONIA', code: 'NC' },
    { name: 'NEW ZEALAND', code: 'NZ' },
    { name: 'NICARAGUA', code: 'NI' },
    { name: 'NIGER', code: 'NE' },
    { name: 'NIGERIA', code: 'NG' },
    { name: 'NIUE', code: 'NU' },
    { name: 'NORFOLK ISLAND', code: 'NF' },
    { name: 'NORTHERN MARIANA ISLANDS', code: 'MP' },
    { name: 'NORWAY', code: 'NO' },
    { name: 'OMAN', code: 'OM' },
    { name: 'PAKISTAN', code: 'PK' },
    { name: 'PALAU', code: 'PW' },
    { name: 'Palestinian Territory, Occupied', code: 'PS' },
    { name: 'PANAMA', code: 'PA' },
    { name: 'PAPUA NEW GUINEA', code: 'PG' },
    { name: 'PARAGUAY', code: 'PY' },
    { name: 'PERU', code: 'PE' },
    { name: 'PHILIPPINES', code: 'PH' },
    { name: 'PITCAIRN', code: 'PN' },
    { name: 'POLAND', code: 'PL' },
    { name: 'PORTUGAL', code: 'PT' },
    { name: 'PUERTO RICO', code: 'PR' },
    { name: 'QATAR', code: 'QA' },
    { name: 'REUNION', code: 'RE' },
    { name: 'ROMANIA', code: 'RO' },
    { name: 'RUSSIAN FEDERATION', code: 'RU' },
    { name: 'RWANDA', code: 'RW' },
    { name: 'SAINT KITTS AND NEVIS', code: 'KN' },
    { name: 'SAINT LUCIA', code: 'LC' },
    { name: 'SAINT VINCENT AND THE GRENADINES', code: 'VC' },
    { name: 'SAIPAN', code: 'SS' },
    { name: 'SAMOA', code: 'WS' },
    { name: 'SAN MARINO', code: 'SM' },
    { name: 'SAO TOME AND PRINCIPE', code: 'ST' },
    { name: 'SAUDI ARABIA', code: 'SA' },
    { name: 'SENEGAL', code: 'SN' },
    { name: 'SERBIA', code: 'RS' },
    { name: 'Serbia and Montenegro', code: 'CS' },
    { name: 'SEYCHELLES', code: 'SC' },
    { name: 'SIERRA LEONE', code: 'SL' },
    { name: 'SINGAPORE', code: 'SG' },
    { name: 'SLOVAKIA (Slovak Republic)', code: 'SK' },
    { name: 'SLOVENIA', code: 'SI' },
    { name: 'SOLOMON ISLANDS', code: 'SB' },
    { name: 'SOMALIA', code: 'SO' },
    { name: 'SOUTH AFRICA', code: 'ZA' },
    { name: 'SOUTH GEORGIA AND SOUTH S.S.', code: 'GS' },
    { name: 'SPAIN', code: 'ES' },
    { name: 'SRI LANKA', code: 'LK' },
    { name: 'ST. HELENA', code: 'SH' },
    { name: 'ST. PIERRE AND MIQUELON', code: 'PM' },
    { name: 'SUDAN', code: 'SD' },
    { name: 'SURINAME', code: 'SR' },
    { name: 'SVALBARD AND JAN MAYEN ISLANDS', code: 'SJ' },
    { name: 'SWAZILAND', code: 'SZ' },
    { name: 'SWEDEN', code: 'SE' },
    { name: 'SWITZERLAND', code: 'CH' },
    { name: 'SYRIAN ARAB REPUBLIC', code: 'SY' },
    { name: 'TAIWAN', code: 'TW' },
    { name: 'TAJIKISTAN', code: 'TJ' },
    { name: 'TANZANIA, UNITED REPUBLIC OF', code: 'TZ' },
    { name: 'THAILAND', code: 'TH' },
    { name: 'Timor-Leste, Democratic Republic of', code: 'TL' },
    { name: 'TOGO', code: 'TG' },
    { name: 'TOKELAU', code: 'TK' },
    { name: 'TONGA', code: 'TO' },
    { name: 'TRINIDAD AND TOBAGO', code: 'TT' },
    { name: 'TUNISIA', code: 'TN' },
    { name: 'TURKEY', code: 'TR' },
    { name: 'TURKMENISTAN', code: 'TM' },
    { name: 'TURKS AND CAICOS ISLANDS', code: 'TC' },
    { name: 'TUVALU', code: 'TV' },
    { name: 'U.S. MINOR ISLANDS', code: 'UM' },
    { name: 'UGANDA', code: 'UG' },
    { name: 'UKRAINE', code: 'UA' },
    { name: 'UNITED ARAB EMIRATES', code: 'AE' },
    { name: 'UNITED KINGDOM', code: 'GB' },
    { name: 'URUGUAY', code: 'UY' },
    { name: 'UZBEKISTAN', code: 'UZ' },
    { name: 'VANUATU', code: 'VU' },
    { name: 'VENEZUELA', code: 'VE' },
    { name: 'VIET NAM', code: 'VN' },
    { name: 'VIRGIN ISLANDS (BRITISH)', code: 'VG' },
    { name: 'VIRGIN ISLANDS (U.S.)', code: 'VI' },
    { name: 'WALLIS AND FUTUNA ISLANDS', code: 'WF' },
    { name: 'WESTERN SAHARA', code: 'EH' },
    { name: 'YEMEN', code: 'YE' },
    { name: 'YUGOSLAVIA (Serbia and Montenegro)', code: 'YU' },
    { name: 'ZAMBIA', code: 'ZM' },
    { name: 'ZIMBABWE', code: 'ZW' }
  ]
export const QUANTITY_UOM = [
  'Carton',
  'Box',
  'Case',
  'Pack',
  'Pcs',
  'Bag'

]
export const LIMIT_ITEM_PRINT = 15;
export const SUPPLY_VENDOR = [
  'Amazon',
  'Medline',
  'Dollar Tree',
  'Costco',
  'Sams',
  'Walmart',
  'Mckesson',
  '99Only'
]
export const SUPPLY_STATUS = [

  'Order',
  'Fulfill',
  'Picked Up',
  'Delivered',
  'Return',
]
export const SUPPLY_CATEGORY = [
  'Office',
  'Diabetic Shake',
  'Underpads',
  'Brief',
  'Immnue System',
  'Thermometer',
  'Bandages',
  'Gloves',
  'Hydration Drink',
  'Shampoo',
  'Jelly',
  'Food Thickener',
  'Ointment',
  'Pill Crusher and Grinder',
  'Wipes',
  'ToothPaste',
  'Basin',
  'Towel',
  'Swabs Sponge',
  'Shave Cream',
  'Urinal',
  'Razor',
  'Clipper',
  'Cream',
  'Combs',
  'Kit',
  'Nutrition Shake',
  'Carbonless Paper',
  'Blood Oxygen Monitor',
  'Saline Solution for Inhalation',
  'Perineal Cleanser',
  'Sterile Lancets',
  'Glycerin Swabsticks',
  'Underwear/Pull-ups',
  'Other',
  'Lotion',
  'Cleanser',
  'Toothbrush',
  'Pill Crusher',
  'Sanitizer',
  'Lancet',
  'Facial Tissue',
  'Abdominal Pad',
  'Adhesive Pad',
  'Cotton',
  'Gauze',
  'Saline',
  'Lip Balm',
  'Dressing Pad',
  'Foam Dressing',
  'Syringe Sterile',
  'Steri-strip',
  'Surgical Tape',
  'Nasogastric Tube',
  'Silicone-Elastomer Latex',
  'Stamp',
  'Body Wash',
  'Band-Aid',
  'Powder Antifungal',
  'Masks',
  'Belt',
  'Pillow',
  'Gel',
  'Disposable Bag',
  'WashCloth',
  'Socks',
  'Wound Dressing',
  'Shoe',
  'Tongue Depressor',
  'Plastic',
  'Straw',
  'BP Monitor',
  'Soap',
  'Matress Pad',
  'Catheters',
  'Removal Kit',
  'Urine Drainage Bag',
  'Bed Pan',
  'Condom Catheter',
  'Injection',
  'Bed Alarm',
  'Covid-19 Test',
  'Flange',
  'Drainable Pouch',
  'Deodorant',
  'Hospital Gown',
  'Tax Fee',
  'Shipping Fee',
  'Powder',
  'Mouthwash',
  'Amazon Promotion Applied'

]

export const SUPPLY_PAYMENT_METHOD = [
  'Cash',
  'Card',
  'Check'
]
export const DIVINE_PATIENT_LIST = [
  'Nargel Velasco',
  'Jasmin Velasco'
]
export const HOSPICE_FACILITIES = [
  'Pacifica',
  'Summerlin'
]
export const DIVINE_EMPLOYEES = [
  {
    name: 'Jasmin Velasco',
    position: 'Office Manager'
  },
  {
    name: 'Nargel Velasco',
    position: 'Information Technology'
  },

]

export const STATUS_ACTIVE_OPTIONS = [
  'Active',
  'Inactive'
]

export const CARE_TYPE = [
  'Assisted Living',
  'Home',
  'Group Home'
]
export const EMPLOYMENT_STATUS = [
  'Full-Time',
  'Part-Time',
  'Per Diem',
  'End of Contract',
  'Termination',
  'Volunteer'

]
export const SAMPLE_WORKER_DATA = [
  { name: 'John Doe', position: 'CNA', status: 'Full-Time', hired: '09/02/2022', email: 'test@2131', phone: '33' },
  { name: 'John Doe2', position: 'RN', status: 'Full-Time', hired: '09/02/2022', email: 'ere2@sdsd', phone: '424' }


]
export const SAMPLE_LOCATION_DATA = [
  {
    name: 'Milan TownHomes',
    address: '875 E Silverado Ranch',
    locationType: 'Residence',
    contactPerson: 'N/A',
    phone: 'N/A',
    fax: 'N/A',

  },
  {
    name: 'Pacifica',
    address: 'XXXX',
    locationType: 'Facilities',
    contactPerson: 'N/A',
    phone: 'N/A',
    fax: 'N/A',

  },
]




export const PATIENT_DASHBOARD_CATEGORY = [
  'Underpads',
  'Brief',
  'Underwear/Pull-ups',
  'Lotion/Cleanser/Ointment',
  'Nutrition Drink',
  'Other'
]
export const YEARS = [
  { name: '2022', value: '2022', label: '2022', id: '2022' },
  { name: '2023', value: '2023', label: '2023', id: '2023' }
]
export const DCH_YEARS = [
  { from: '2022-10-01', to: '2022-10-31' },
  { from: '2022-11-01', to: '2022-11-30' },
  { from: '2022-12-01', to: '2022-12-31' },
  { from: '2023-01-01', to: '2023-01-31' },
  { from: '2023-02-01', to: '2023-02-28' }
]
export const THRESHOLD_CATEGORY = [
  { categoryType: 'thresholdCategory', category: 'brief', default: 40, name: 'brief', label: 'brief', value: 'brief' },
  { categoryType: 'thresholdCategory', category: 'underpad', name: 'underpad', label: 'underpad', value: 'underpad', default: 20 },
  { categoryType: 'thresholdCategory', category: 'underwear', name: 'underwear', label: 'underwear', value: 'underwear', default: 40 },
  { categoryType: 'thresholdCategory', category: 'gloves', name: 'gloves', label: 'gloves', value: 'gloves', default: 1 },
  { categoryType: 'thresholdCategory', category: 'wipes', name: 'wipes', label: 'wipes', value: 'wipes', default: 1 },
  { categoryType: 'thresholdCategory', category: 'ensure vanilla', name: 'ensure vanilla', label: 'ensure vanilla', value: 'ensure vanilla', default: 14 },
  { categoryType: 'thresholdCategory', category: 'ensure chocolate', name: 'ensure chocolate', label: 'ensure chocolate', value: 'ensure chocolate', default: 14 },
  { categoryType: 'thresholdCategory', category: 'ensure strawberry', name: 'ensure strawberry', label: 'ensure strawberry', value: 'ensure strawberry', default: 14 }
]

export const ORDER_FORM = [
  {
    category: 'Brief',
    fields: [
      {
        component: 'select',
        name: 'size',
        label: 'Size',
        placeholder: 'Size',
        colspan: 6,
        uom: 'BG',
        isMandatory: true,
        options: [
          { name: 'SM', value: 'SM', label: 'Small', category: 'size' },
          { name: 'MD', value: 'MD', label: 'Medium', category: 'size' },
          { name: 'LG', value: 'LG', label: 'Large', category: 'size' },
          { name: 'XLG', value: 'XLG', label: 'X-Large', category: 'size' },
          { name: '2XLG', value: '2XLG', label: '2X-Large', category: 'size' },
          { name: '3XLG', value: '3XLG', label: '3X-Large', category: 'size' },
          { name: '4XLG', value: '4XLG', label: '4X-Large', category: 'size' }
        ]
      },
      {
        component: 'textfield',
        type: 'number',
        name: 'quantity',
        isMandatory: true,
        tooltip: '1 bag is 20 pcs',
        value: 2,
        placeholder: 'Bag Quantity',
        label: 'Bag Quantity',
        colspan: 6

      }
    ]
  },
  {
    category: 'UnderPad',
    fields: [
      {
        component: 'select',
        name: 'size',
        placeholder: 'Underpad',
        label: 'Underpad',
        uom: 'BG',
        isMandatory: true,
        value: { name: 'Regular', value: 'Regular', label: 'Regular', category: 'underpad' },
        colspan: 6,
        options: [
          { name: 'Regular', value: 'Regular', label: 'Regular', category: 'underpad' },
          { name: 'Reusable', value: 'Reusable', label: 'Reusable', category: 'underpad' },
          { name: 'SPC', value: 'SPC', label: 'SPC', category: 'underpad' },
        ]
      },
      {
        component: 'textfield',
        type: 'number',
        isMandatory: true,
        name: 'quantity',
        value: 2,
        tooltip: '1 bag is 10 pcs',
        placeholder: 'Bag Quantity',
        label: 'Bag Quantity',
        colspan: 6

      }
    ]
  },
  {
    category: 'Underwear',
    fields: [
      {
        component: 'select',
        name: 'size',
        label: 'Size',
        isMandatory: true,
        placeholder: 'Size',
        colspan: 6,
        uom: 'BG',
        options: [
          { name: 'SM', value: 'SM', label: 'Small', category: 'size' },
          { name: 'MD', value: 'MD', label: 'Medium', category: 'size' },
          { name: 'LG', value: 'LG', label: 'Large', category: 'size' },
          { name: 'XLG', value: 'XLG', label: 'X-Large', category: 'size' },
          { name: '2XLG', value: '2XLG', label: '2X-Large', category: 'size' },
          { name: '3XLG', value: '3XLG', label: '3X-Large', category: 'size' },
          { name: '4XLG', value: '4XLG', label: '4X-Large', category: 'size' }
        ]
      },
      {
        component: 'textfield',
        type: 'number',
        name: 'quantity',
        isMandatory: true,
        tooltip: '1 bag is 20 pcs',
        value: 2,
        placeholder: 'Bag Quantity',
        label: 'Bag Quantity',
        colspan: 6

      }
    ]
  },
]