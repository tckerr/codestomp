import {Injectable} from '@angular/core';

export interface IStateData {
   name: string;
   id: string;
   flag: string;
   capital: string;
   largest_city: string;
   statehood: string;
   population: number;
   area: string;
   land_area: string;
   water_area: string;
   house_seats: string;
}

@Injectable()
export class MapDataProviderService {

   constructor() {
   }

   public get mapData(): IStateData[] {
      return [{
         name: 'Alabama',
         id: 'US.AL',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Alabama.png',
         capital: 'Montgomery',
         largest_city: 'Birmingham',
         statehood: 'December 14, 1819',
         population: 4833722,
         area: '135767',
         land_area: '131170',
         water_area: '4597',
         house_seats: '7'
      }, {
         name: 'Alaska',
         id: 'US.AK',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Alaska.png',
         capital: 'Juneau',
         largest_city: 'Anchorage',
         statehood: 'January 3, 1959',
         population: 735132,
         area: '1723337',
         land_area: '1477950',
         water_area: '245383',
         house_seats: '1'
      }, {
         name: 'Arizona',
         id: 'US.AZ',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Arizona.png',
         capital: 'Phoenix',
         largest_city: 'Phoenix',
         statehood: 'February 14, 1912',
         population: 6626624,
         area: '295233',
         land_area: '294207',
         water_area: '1026',
         house_seats: '9'
      }, {
         name: 'Arkansas',
         id: 'US.AR',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Arkansas.png',
         capital: 'Little Rock',
         largest_city: 'Little Rock',
         statehood: 'June 15, 1836',
         population: 2959373,
         area: '137733',
         land_area: '134770',
         water_area: '2960',
         house_seats: '4'
      }, {
         name: 'California',
         id: 'US.CA',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_California.png',
         capital: 'Sacramento',
         largest_city: 'Los Angeles',
         statehood: 'September 9, 1850',
         population: 38332521,
         area: '423968',
         land_area: '403466',
         water_area: '20502',
         house_seats: '53'
      }, {
         name: 'Colorado',
         id: 'US.CO',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Colorado.png',
         capital: 'Denver',
         largest_city: 'Denver',
         statehood: 'August 1, 1876',
         population: 5268367,
         area: '269602',
         land_area: '268432',
         water_area: '1171',
         house_seats: '7'
      }, {
         name: 'Connecticut',
         id: 'US.CT',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Connecticut.png',
         capital: 'Hartford',
         largest_city: 'Bridgeport',
         statehood: 'January 9, 1788',
         population: 3596080,
         area: '14356',
         land_area: '12541',
         water_area: '1816',
         house_seats: '5'
      }, {
         name: 'Delaware',
         id: 'US.DE',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Delaware.png',
         capital: 'Dover',
         largest_city: 'Wilmington',
         statehood: 'December 7, 1787',
         population: 925749,
         area: '6446',
         land_area: '5048',
         water_area: '1399',
         house_seats: '1'
      }, {
         name: 'Florida',
         id: 'US.FL',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Florida.png',
         capital: 'Tallahassee',
         largest_city: 'Jacksonville',
         statehood: 'March 3, 1845',
         population: 19552860,
         area: '170312',
         land_area: '138888',
         water_area: '31424',
         house_seats: '27'
      }, {
         name: 'Georgia',
         id: 'US.GA',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Georgia.png',
         capital: 'Atlanta',
         largest_city: 'Atlanta',
         statehood: 'January 2, 1788',
         population: 9992167,
         area: '153910',
         land_area: '148958',
         water_area: '4950',
         house_seats: '14'
      }, {
         name: 'Hawaii',
         id: 'US.HI',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Hawaii.png',
         capital: 'Honolulu',
         largest_city: 'Honolulu',
         statehood: 'August 21, 1959',
         population: 1404054,
         area: '28314',
         land_area: '16635',
         water_area: '11678',
         house_seats: '2'
      }, {
         name: 'Idaho',
         id: 'US.ID',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Idaho.png',
         capital: 'Boise',
         largest_city: 'Boise',
         statehood: 'July 3, 1890',
         population: 1612136,
         area: '216443',
         land_area: '214044',
         water_area: '2398',
         house_seats: '2'
      }, {
         name: 'Illinois',
         id: 'US.IL',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Illinois.png',
         capital: 'Springfield',
         largest_city: 'Chicago',
         statehood: 'December 3, 1818',
         population: 12882135,
         area: '149997',
         land_area: '143794',
         water_area: '6203',
         house_seats: '18'
      }, {
         name: 'Indiana',
         id: 'US.IN',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Indiana.png',
         capital: 'Indianapolis',
         largest_city: 'Indianapolis',
         statehood: 'December 11, 1816',
         population: 6570902,
         area: '94327',
         land_area: '92789',
         water_area: '1536',
         house_seats: '9'
      }, {
         name: 'Iowa',
         id: 'US.IA',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Iowa.png',
         capital: 'Des Moines',
         largest_city: 'Des Moines',
         statehood: 'December 28, 1846',
         population: 3090416,
         area: '145746',
         land_area: '144669',
         water_area: '1077',
         house_seats: '4'
      }, {
         name: 'Kansas',
         id: 'US.KS',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Kansas.png',
         capital: 'Topeka',
         largest_city: 'Wichita',
         statehood: 'January 29, 1861',
         population: 2893957,
         area: '213099',
         land_area: '211755',
         water_area: '1347',
         house_seats: '4'
      }, {
         name: 'Kentucky',
         id: 'US.KY',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Kentucky.png',
         capital: 'Frankfort',
         largest_city: 'Louisville',
         statehood: 'June 1, 1792',
         population: 4395295,
         area: '104656',
         land_area: '102268',
         water_area: '2385',
         house_seats: '6'
      }, {
         name: 'Louisiana',
         id: 'US.LA',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Louisiana.png',
         capital: 'Baton Rouge',
         largest_city: 'New Orleans',
         statehood: 'April 30, 1812',
         population: 4625470,
         area: '135658',
         land_area: '111898',
         water_area: '23761',
         house_seats: '6'
      }, {
         name: 'Maine',
         id: 'US.ME',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Maine.png',
         capital: 'Augusta',
         largest_city: 'Portland',
         statehood: 'March 15, 1820',
         population: 1328302,
         area: '91634',
         land_area: '79883',
         water_area: '11751',
         house_seats: '2'
      }, {
         name: 'Maryland',
         id: 'US.MD',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Maryland.png',
         capital: 'Annapolis',
         largest_city: 'Baltimore',
         statehood: 'April 28, 1788',
         population: 5928814,
         area: '32131',
         land_area: '25141',
         water_area: '6990',
         house_seats: '8'
      }, {
         name: 'Massachusetts',
         id: 'US.MA',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Massachusetts.png',
         capital: 'Boston',
         largest_city: 'Boston',
         statehood: 'February 6, 1788',
         population: 6692824,
         area: '27335',
         land_area: '20202',
         water_area: '7133',
         house_seats: '9'
      }, {
         name: 'Michigan',
         id: 'US.MI',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Michigan.png',
         capital: 'Lansing',
         largest_city: 'Detroit',
         statehood: 'January 26, 1837',
         population: 9895622,
         area: '250488',
         land_area: '146435',
         water_area: '104053',
         house_seats: '14'
      }, {
         name: 'Minnesota',
         id: 'US.MN',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Minnesota.png',
         capital: 'St. Paul',
         largest_city: 'Minneapolis',
         statehood: 'May 11, 1858',
         population: 5420380,
         area: '225163',
         land_area: '206233',
         water_area: '18930',
         house_seats: '8'
      }, {
         name: 'Mississippi',
         id: 'US.MS',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Mississippi.png',
         capital: 'Jackson',
         largest_city: 'Jackson',
         statehood: 'December 10, 1817',
         population: 2991207,
         area: '125438',
         land_area: '121530',
         water_area: '3908',
         house_seats: '4'
      }, {
         name: 'Missouri',
         id: 'US.MO',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Missouri.png',
         capital: 'Jefferson City',
         largest_city: 'Kansas City',
         statehood: 'August 10, 1821',
         population: 6021988,
         area: '180540',
         land_area: '178041',
         water_area: '2499',
         house_seats: '8'
      }, {
         name: 'Montana',
         id: 'US.MT',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Montana.png',
         capital: 'Helena',
         largest_city: 'Billings',
         statehood: 'November 8, 1889',
         population: 1015165,
         area: '380832',
         land_area: '376962',
         water_area: '3869',
         house_seats: '1'
      }, {
         name: 'Nebraska',
         id: 'US.NE',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Nebraska.png',
         capital: 'Lincoln',
         largest_city: 'Omaha',
         statehood: 'March 1, 1867',
         population: 1868516,
         area: '200330',
         land_area: '198973',
         water_area: '1357',
         house_seats: '3'
      }, {
         name: 'Nevada',
         id: 'US.NV',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Nevada.png',
         capital: 'Carson City',
         largest_city: 'Las Vegas',
         statehood: 'October 31, 1864',
         population: 2790136,
         area: '286380',
         land_area: '284331',
         water_area: '2049',
         house_seats: '4'
      }, {
         name: 'New Hampshire',
         id: 'US.NH',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_New_Hampshire.png',
         capital: 'Concord',
         largest_city: 'Manchester',
         statehood: 'June 21, 1788',
         population: 1323459,
         area: '24214',
         land_area: '23188',
         water_area: '1028',
         house_seats: '2'
      }, {
         name: 'New Jersey',
         id: 'US.NJ',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_New_Jersey.png',
         capital: 'Trenton',
         largest_city: 'Newark',
         statehood: 'December 18, 1787',
         population: 8899339,
         area: '22592',
         land_area: '19047',
         water_area: '3543',
         house_seats: '12'
      }, {
         name: 'New Mexico',
         id: 'US.NM',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_New_Mexico.png',
         capital: 'Santa Fe',
         largest_city: 'Albuquerque',
         statehood: 'January 6, 1912',
         population: 2085287,
         area: '314917',
         land_area: '314160',
         water_area: '756',
         house_seats: '3'
      }, {
         name: 'New York',
         id: 'US.NY',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_New_York.png',
         capital: 'Albany',
         largest_city: 'New York',
         statehood: 'July 26, 1788',
         population: 19651127,
         area: '141297',
         land_area: '122056',
         water_area: '19241',
         house_seats: '27'
      }, {
         name: 'North Carolina',
         id: 'US.NC',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_North_Carolina.png',
         capital: 'Raleigh',
         largest_city: 'Charlotte',
         statehood: 'November 21, 1789',
         population: 9848060,
         area: '139391',
         land_area: '125920',
         water_area: '13471',
         house_seats: '13'
      }, {
         name: 'North Dakota',
         id: 'US.ND',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_North_Dakota.png',
         capital: 'Bismarck',
         largest_city: 'Fargo',
         statehood: 'November 2, 1889',
         population: 723393,
         area: '183107',
         land_area: '178712',
         water_area: '4398',
         house_seats: '1'
      }, {
         name: 'Ohio',
         id: 'US.OH',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Ohio.png',
         capital: 'Columbus',
         largest_city: 'Columbus',
         statehood: 'March 1, 1803',
         population: 11570808,
         area: '116099',
         land_area: '105830',
         water_area: '10269',
         house_seats: '16'
      }, {
         name: 'Oklahoma',
         id: 'US.OK',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Oklahoma.png',
         capital: 'Oklahoma City',
         largest_city: 'Oklahoma City',
         statehood: 'November 16, 1907',
         population: 3850568,
         area: '181038',
         land_area: '177660',
         water_area: '3377',
         house_seats: '5'
      }, {
         name: 'Oregon',
         id: 'US.OR',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Oregon.png',
         capital: 'Salem',
         largest_city: 'Portland',
         statehood: 'February 14, 1859',
         population: 3930065,
         area: '254800',
         land_area: '248608',
         water_area: '6193',
         house_seats: '5'
      }, {
         name: 'Pennsylvania',
         id: 'US.PA',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Pennsylvania.png',
         capital: 'Harrisburg',
         largest_city: 'Philadelphia',
         statehood: 'December 12, 1787',
         population: 12773801,
         area: '119279',
         land_area: '115884',
         water_area: '3398',
         house_seats: '18'
      }, {
         name: 'Rhode Island',
         id: 'US.RI',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Rhode_Island.png',
         capital: 'Providence',
         largest_city: 'Providence',
         statehood: 'May 29, 1790',
         population: 1051511,
         area: '4002',
         land_area: '2678',
         water_area: '1320',
         house_seats: '2'
      }, {
         name: 'South Carolina',
         id: 'US.SC',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_South_Carolina.png',
         capital: 'Columbia',
         largest_city: 'Columbia',
         statehood: 'May 23, 1788',
         population: 4774839,
         area: '82931',
         land_area: '77858',
         water_area: '5076',
         house_seats: '7'
      }, {
         name: 'South Dakota',
         id: 'US.SD',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_South_Dakota.png',
         capital: 'Pierre',
         largest_city: 'Sioux Falls',
         statehood: 'November 2, 1889',
         population: 844877,
         area: '199730',
         land_area: '196350',
         water_area: '3380',
         house_seats: '1'
      }, {
         name: 'Tennessee',
         id: 'US.TN',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Tennessee.png',
         capital: 'Nashville',
         largest_city: 'Memphis',
         statehood: 'June 1, 1796',
         population: 6495978,
         area: '109152',
         land_area: '106798',
         water_area: '2354',
         house_seats: '9'
      }, {
         name: 'Texas',
         id: 'US.TX',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Texas.png',
         capital: 'Austin',
         largest_city: 'Houston',
         statehood: 'December 29, 1845',
         population: 26448193,
         area: '695660',
         land_area: '676588',
         water_area: '19075',
         house_seats: '36'
      }, {
         name: 'Utah',
         id: 'US.UT',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Utah.png',
         capital: 'Salt Lake City',
         largest_city: 'Salt Lake City',
         statehood: 'January 4, 1896',
         population: 2900872,
         area: '219882',
         land_area: '212819',
         water_area: '7063',
         house_seats: '4'
      }, {
         name: 'Vermont',
         id: 'US.VT',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Vermont.png',
         capital: 'Montpelier',
         largest_city: 'Burlington',
         statehood: 'March 4, 1791',
         population: 626630,
         area: '24905',
         land_area: '23872',
         water_area: '1036',
         house_seats: '1'
      }, {
         name: 'Virginia',
         id: 'US.VA',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Virginia.png',
         capital: 'Richmond',
         largest_city: 'Virginia Beach',
         statehood: 'June 25, 1788',
         population: 8260405,
         area: '110787',
         land_area: '102279',
         water_area: '8508',
         house_seats: '11'
      }, {
         name: 'Washington',
         id: 'US.WA',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Washington.png',
         capital: 'Olympia',
         largest_city: 'Seattle',
         statehood: 'November 11, 1889',
         population: 6971406,
         area: '184661',
         land_area: '172120',
         water_area: '12541',
         house_seats: '10'
      }, {
         name: 'West Virginia',
         id: 'US.WV',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_West_Virginia.png',
         capital: 'Charleston',
         largest_city: 'Charleston',
         statehood: 'June 20, 1863',
         population: 1854304,
         area: '62755',
         land_area: '62258',
         water_area: '497',
         house_seats: '3'
      }, {
         name: 'Wisconsin',
         id: 'US.WI',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Wisconsin.png',
         capital: 'Madison',
         largest_city: 'Milwaukee',
         statehood: 'May 29, 1848',
         population: 5742713,
         area: '169634',
         land_area: '140269',
         water_area: '29368',
         house_seats: '8'
      }, {
         name: 'Wyoming',
         id: 'US.WY',
         flag: 'http://static.anychart.com/images/maps_samples/States_of_United_States_Dashboard_with_MultiSelect/Flag_of_Wyoming.png',
         capital: 'Cheyenne',
         largest_city: 'Cheyenne',
         statehood: 'July 10, 1890',
         population: 582658,
         area: '253335',
         land_area: '251470',
         water_area: '1865',
         house_seats: '1'
      }];
   }
}
