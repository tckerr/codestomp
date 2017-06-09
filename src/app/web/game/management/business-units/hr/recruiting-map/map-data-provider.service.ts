import {Injectable} from '@angular/core';

export interface IStateData {
   name: string;
   id: string;
   population: number;
   area: number;
   landArea: number;
   waterArea: number;
}

@Injectable()
export class MapDataProviderService {

   constructor() {
   }

   public get mapData(): IStateData[] {
      return [
         {
            'id': 'US.AL',
            'name': 'Alabama',
            'population': 4833722,
            'area': 135767,
            'landArea': 131170,
            'waterArea': 4597
         },
         {
            'id': 'US.AK',
            'name': 'Alaska',
            'population': 735132,
            'area': 1723337,
            'landArea': 1477950,
            'waterArea': 245383
         },
         {
            'id': 'US.AZ',
            'name': 'Arizona',
            'population': 6626624,
            'area': 295233,
            'landArea': 294207,
            'waterArea': 1026
         },
         {
            'id': 'US.AR',
            'name': 'Arkansas',
            'population': 2959373,
            'area': 137733,
            'landArea': 134770,
            'waterArea': 2960
         },
         {
            'id': 'US.CA',
            'name': 'California',
            'population': 38332521,
            'area': 423968,
            'landArea': 403466,
            'waterArea': 20502
         },
         {
            'id': 'US.CO',
            'name': 'Colorado',
            'population': 5268367,
            'area': 269602,
            'landArea': 268432,
            'waterArea': 1171
         },
         {
            'id': 'US.CT',
            'name': 'Connecticut',
            'population': 3596080,
            'area': 14356,
            'landArea': 12541,
            'waterArea': 1816
         },
         {
            'id': 'US.DE',
            'name': 'Delaware',
            'population': 925749,
            'area': 6446,
            'landArea': 5048,
            'waterArea': 1399
         },
         {
            'id': 'US.FL',
            'name': 'Florida',
            'population': 19552860,
            'area': 170312,
            'landArea': 138888,
            'waterArea': 31424
         },
         {
            'id': 'US.GA',
            'name': 'Georgia',
            'population': 9992167,
            'area': 153910,
            'landArea': 148958,
            'waterArea': 4950
         },
         {
            'id': 'US.HI',
            'name': 'Hawaii',
            'population': 1404054,
            'area': 28314,
            'landArea': 16635,
            'waterArea': 11678
         },
         {
            'id': 'US.ID',
            'name': 'Idaho',
            'population': 1612136,
            'area': 216443,
            'landArea': 214044,
            'waterArea': 2398
         },
         {
            'id': 'US.IL',
            'name': 'Illinois',
            'population': 12882135,
            'area': 149997,
            'landArea': 143794,
            'waterArea': 6203
         },
         {
            'id': 'US.IN',
            'name': 'Indiana',
            'population': 6570902,
            'area': 94327,
            'landArea': 92789,
            'waterArea': 1536
         },
         {
            'id': 'US.IA',
            'name': 'Iowa',
            'population': 3090416,
            'area': 145746,
            'landArea': 144669,
            'waterArea': 1077
         },
         {
            'id': 'US.KS',
            'name': 'Kansas',
            'population': 2893957,
            'area': 213099,
            'landArea': 211755,
            'waterArea': 1347
         },
         {
            'id': 'US.KY',
            'name': 'Kentucky',
            'population': 4395295,
            'area': 104656,
            'landArea': 102268,
            'waterArea': 2385
         },
         {
            'id': 'US.LA',
            'name': 'Louisiana',
            'population': 4625470,
            'area': 135658,
            'landArea': 111898,
            'waterArea': 23761
         },
         {
            'id': 'US.ME',
            'name': 'Maine',
            'population': 1328302,
            'area': 91634,
            'landArea': 79883,
            'waterArea': 11751
         },
         {
            'id': 'US.MD',
            'name': 'Maryland',
            'population': 5928814,
            'area': 32131,
            'landArea': 25141,
            'waterArea': 6990
         },
         {
            'id': 'US.MA',
            'name': 'Massachusetts',
            'population': 6692824,
            'area': 27335,
            'landArea': 20202,
            'waterArea': 7133
         },
         {
            'id': 'US.MI',
            'name': 'Michigan',
            'population': 9895622,
            'area': 250488,
            'landArea': 146435,
            'waterArea': 104053
         },
         {
            'id': 'US.MN',
            'name': 'Minnesota',
            'population': 5420380,
            'area': 225163,
            'landArea': 206233,
            'waterArea': 18930
         },
         {
            'id': 'US.MS',
            'name': 'Mississippi',
            'population': 2991207,
            'area': 125438,
            'landArea': 121530,
            'waterArea': 3908
         },
         {
            'id': 'US.MO',
            'name': 'Missouri',
            'population': 6021988,
            'area': 180540,
            'landArea': 178041,
            'waterArea': 2499
         },
         {
            'id': 'US.MT',
            'name': 'Montana',
            'population': 1015165,
            'area': 380832,
            'landArea': 376962,
            'waterArea': 3869
         },
         {
            'id': 'US.NE',
            'name': 'Nebraska',
            'population': 1868516,
            'area': 200330,
            'landArea': 198973,
            'waterArea': 1357
         },
         {
            'id': 'US.NV',
            'name': 'Nevada',
            'population': 2790136,
            'area': 286380,
            'landArea': 284331,
            'waterArea': 2049
         },
         {
            'id': 'US.NH',
            'name': 'New Hampshire',
            'population': 1323459,
            'area': 24214,
            'landArea': 23188,
            'waterArea': 1028
         },
         {
            'id': 'US.NJ',
            'name': 'New Jersey',
            'population': 8899339,
            'area': 22592,
            'landArea': 19047,
            'waterArea': 3543
         },
         {
            'id': 'US.NM',
            'name': 'New Mexico',
            'population': 2085287,
            'area': 314917,
            'landArea': 314160,
            'waterArea': 756
         },
         {
            'id': 'US.NY',
            'name': 'New York',
            'population': 19651127,
            'area': 141297,
            'landArea': 122056,
            'waterArea': 19241
         },
         {
            'id': 'US.NC',
            'name': 'North Carolina',
            'population': 9848060,
            'area': 139391,
            'landArea': 125920,
            'waterArea': 13471
         },
         {
            'id': 'US.ND',
            'name': 'North Dakota',
            'population': 723393,
            'area': 183107,
            'landArea': 178712,
            'waterArea': 4398
         },
         {
            'id': 'US.OH',
            'name': 'Ohio',
            'population': 11570808,
            'area': 116099,
            'landArea': 105830,
            'waterArea': 10269
         },
         {
            'id': 'US.OK',
            'name': 'Oklahoma',
            'population': 3850568,
            'area': 181038,
            'landArea': 177660,
            'waterArea': 3377
         },
         {
            'id': 'US.OR',
            'name': 'Oregon',
            'population': 3930065,
            'area': 254800,
            'landArea': 248608,
            'waterArea': 6193
         },
         {
            'id': 'US.PA',
            'name': 'Pennsylvania',
            'population': 12773801,
            'area': 119279,
            'landArea': 115884,
            'waterArea': 3398
         },
         {
            'id': 'US.RI',
            'name': 'Rhode Island',
            'population': 1051511,
            'area': 4002,
            'landArea': 2678,
            'waterArea': 1320
         },
         {
            'id': 'US.SC',
            'name': 'South Carolina',
            'population': 4774839,
            'area': 82931,
            'landArea': 77858,
            'waterArea': 5076
         },
         {
            'id': 'US.SD',
            'name': 'South Dakota',
            'population': 844877,
            'area': 199730,
            'landArea': 196350,
            'waterArea': 3380
         },
         {
            'id': 'US.TN',
            'name': 'Tennessee',
            'population': 6495978,
            'area': 109152,
            'landArea': 106798,
            'waterArea': 2354
         },
         {
            'id': 'US.TX',
            'name': 'Texas',
            'population': 26448193,
            'area': 695660,
            'landArea': 676588,
            'waterArea': 19075
         },
         {
            'id': 'US.UT',
            'name': 'Utah',
            'population': 2900872,
            'area': 219882,
            'landArea': 212819,
            'waterArea': 7063
         },
         {
            'id': 'US.VT',
            'name': 'Vermont',
            'population': 626630,
            'area': 24905,
            'landArea': 23872,
            'waterArea': 1036
         },
         {
            'id': 'US.VA',
            'name': 'Virginia',
            'population': 8260405,
            'area': 110787,
            'landArea': 102279,
            'waterArea': 8508
         },
         {
            'id': 'US.WA',
            'name': 'Washington',
            'population': 6971406,
            'area': 184661,
            'landArea': 172120,
            'waterArea': 12541
         },
         {
            'id': 'US.WV',
            'name': 'West Virginia',
            'population': 1854304,
            'area': 62755,
            'landArea': 62258,
            'waterArea': 497
         },
         {
            'id': 'US.WI',
            'name': 'Wisconsin',
            'population': 5742713,
            'area': 169634,
            'landArea': 140269,
            'waterArea': 29368
         },
         {
            'id': 'US.WY',
            'name': 'Wyoming',
            'population': 582658,
            'area': 253335,
            'landArea': 251470,
            'waterArea': 1865
         }
      ];
   }
}
