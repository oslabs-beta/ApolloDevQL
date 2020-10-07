const fakeNetworkEvent = {
  "1602033685234": {
    "requestId": "1602033684963",
    "eventId": "1602033685234",
    "request": {
      "bodySize": 421,
      "headersSize": 547,
      "method": "POST",
      "operation": {
        "operationName": "GetLaunchList",
        "variables": {},
        "query": "query GetLaunchList($after: String) {\n  launches(after: $after) {\n    cursor\n    hasMore\n    launches {\n      ...LaunchTile\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment LaunchTile on Launch {\n  __typename\n  id\n  isBooked\n  rocket {\n    id\n    name\n    __typename\n  }\n  mission {\n    name\n    missionPatch\n    __typename\n  }\n}\n"
      },
      "url": "http://localhost:4000/graphql"
    },
    "response": {
      "bodySize": 30375,
      "headersSize": 226,
      "content": {
        "data": {
          "launches": {
            "cursor": "1573484160",
            "hasMore": true,
            "launches": [{
                "__typename": "Launch",
                "id": "103",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-12 (v1.0)",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "102",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-11 (v1.0)",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "101",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "SAOCOM 1B, GNOMES-1, Tyvak-0172",
                  "missionPatch": "https://images2.imgbox.com/43/33/36WPntCu_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "100",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-10 (v1.0) & SkySat 19-21",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "99",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-9 (v1.0) & BlackSky Global 5-6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "98",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "ANASIS-II",
                  "missionPatch": "https://images2.imgbox.com/ad/77/CDzoMWTH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "97",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "GPS III SV03 (Columbus)",
                  "missionPatch": "https://images2.imgbox.com/5f/63/UmHyB3Y6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "96",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink-8 & SkySat 16-18",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "95",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 7",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "94",
                "isBooked": true,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CCtCap Demo Mission 2",
                  "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "93",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 6",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "92",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 5",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "91",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-20",
                  "missionPatch": "https://images2.imgbox.com/15/2b/NAcsTEB6_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "90",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 4",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "89",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 3",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "88",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Crew Dragon In Flight Abort Test",
                  "missionPatch": "https://images2.imgbox.com/9d/04/DNXjbXDY_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "87",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 2",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "86",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "JCSat 18 / Kacific 1",
                  "missionPatch": "https://images2.imgbox.com/49/eb/evB1Wi95_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "85",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "CRS-19",
                  "missionPatch": "https://images2.imgbox.com/1f/40/3mc9OSdH_o.png",
                  "__typename": "Mission"
                }
              },
              {
                "__typename": "Launch",
                "id": "84",
                "isBooked": false,
                "rocket": {
                  "id": "falcon9",
                  "name": "Falcon 9",
                  "__typename": "Rocket"
                },
                "mission": {
                  "name": "Starlink 1",
                  "missionPatch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
                  "__typename": "Mission"
                }
              }
            ],
            "__typename": "LaunchConnection"
          }
        },
        "extensions": {
          "tracing": {
            "version": 1,
            "startTime": "2020-10-07T01:21:24.969Z",
            "endTime": "2020-10-07T01:21:25.231Z",
            "duration": 262019744,
            "execution": {
              "resolvers": [{
                  "path": [
                    "launches"
                  ],
                  "parentType": "Query",
                  "fieldName": "launches",
                  "returnType": "LaunchConnection!",
                  "startOffset": 148232,
                  "duration": 245149494
                },
                {
                  "path": [
                    "launches",
                    "cursor"
                  ],
                  "parentType": "LaunchConnection",
                  "fieldName": "cursor",
                  "returnType": "String!",
                  "startOffset": 245329383,
                  "duration": 14510
                },
                {
                  "path": [
                    "launches",
                    "hasMore"
                  ],
                  "parentType": "LaunchConnection",
                  "fieldName": "hasMore",
                  "returnType": "Boolean!",
                  "startOffset": 245347711,
                  "duration": 5984
                },
                {
                  "path": [
                    "launches",
                    "launches"
                  ],
                  "parentType": "LaunchConnection",
                  "fieldName": "launches",
                  "returnType": "[Launch]!",
                  "startOffset": 245355726,
                  "duration": 9990
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    0,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 245387946,
                  "duration": 6547
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    0,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 245398800,
                  "duration": 15867305
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    0,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 245546669,
                  "duration": 7166
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    0,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 245564099,
                  "duration": 3993
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    0,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 245572109,
                  "duration": 2855
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    0,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 245578761,
                  "duration": 5247
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    0,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 245592191,
                  "duration": 2792
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    0,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 245597559,
                  "duration": 4086
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    1,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 245614588,
                  "duration": 4022
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    1,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 245621563,
                  "duration": 16346106
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    1,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 245704509,
                  "duration": 6559
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    1,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 245714480,
                  "duration": 4789
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    1,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 245720935,
                  "duration": 2391
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    1,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 245727523,
                  "duration": 2887
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    1,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 245734213,
                  "duration": 3649
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    1,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 245739957,
                  "duration": 4105
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    2,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 245755549,
                  "duration": 4394
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    2,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 245762530,
                  "duration": 16200575
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    2,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 245837730,
                  "duration": 7101
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    2,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 245848080,
                  "duration": 3100
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    2,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 245854227,
                  "duration": 2339
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    2,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 245860583,
                  "duration": 2662
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    2,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 245865385,
                  "duration": 3770
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    2,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 245870783,
                  "duration": 2109
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    3,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 246819763,
                  "duration": 13556
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    3,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 246837441,
                  "duration": 15129335
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    3,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 246932886,
                  "duration": 9712
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    3,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 246946866,
                  "duration": 3918
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    3,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 246954257,
                  "duration": 2825
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    3,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 246960372,
                  "duration": 4732
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    3,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 246967634,
                  "duration": 2628
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    3,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 246973785,
                  "duration": 2175
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    4,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 246986618,
                  "duration": 5514
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    4,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 246995138,
                  "duration": 14274183
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    4,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 247071719,
                  "duration": 5643
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    4,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 247082138,
                  "duration": 3162
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    4,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 247086988,
                  "duration": 3675
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    4,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 247093506,
                  "duration": 2686
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    4,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 247100026,
                  "duration": 2240
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    4,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 247103798,
                  "duration": 3905
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    5,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 247117374,
                  "duration": 3699
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    5,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 247125335,
                  "duration": 14678670
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    5,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 247198646,
                  "duration": 5493
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    5,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 247207327,
                  "duration": 4606
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    5,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 247213573,
                  "duration": 2471
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    5,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 247220258,
                  "duration": 2707
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    5,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 247226434,
                  "duration": 2322
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    5,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 247230418,
                  "duration": 3642
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    6,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 247244581,
                  "duration": 3806
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    6,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 247251115,
                  "duration": 14718377
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    6,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 247321296,
                  "duration": 6630
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    6,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 247331085,
                  "duration": 3073
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    6,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 247337618,
                  "duration": 2282
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    6,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 247343852,
                  "duration": 2652
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    6,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 247348684,
                  "duration": 3328
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    6,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 247353513,
                  "duration": 2133
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    7,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 247364833,
                  "duration": 4617
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    7,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 247372039,
                  "duration": 14596625
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    7,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 247440987,
                  "duration": 7623
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    7,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 247451819,
                  "duration": 3098
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    7,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 247458108,
                  "duration": 2455
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    7,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 247463232,
                  "duration": 4358
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    7,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 247469931,
                  "duration": 2256
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    7,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 247475289,
                  "duration": 2086
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    8,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 247486080,
                  "duration": 7171
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    8,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 247495885,
                  "duration": 14474773
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    8,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 248263591,
                  "duration": 8951
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    8,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248280425,
                  "duration": 6989
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    8,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248289738,
                  "duration": 8828
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    8,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 248304136,
                  "duration": 3583
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    8,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248321056,
                  "duration": 2924
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    8,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 248325942,
                  "duration": 10357
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    9,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248348105,
                  "duration": 5130
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    9,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 248357962,
                  "duration": 13597518
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    9,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 248450068,
                  "duration": 5797
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    9,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248459137,
                  "duration": 4573
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    9,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248465487,
                  "duration": 2406
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    9,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 248471922,
                  "duration": 2674
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    9,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248476802,
                  "duration": 4211
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    9,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 248482520,
                  "duration": 3560
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    10,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248495599,
                  "duration": 3690
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    10,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 248503590,
                  "duration": 13453290
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    10,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 248578573,
                  "duration": 5383
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    10,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248586925,
                  "duration": 4726
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    10,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248593263,
                  "duration": 2446
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    10,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 248599772,
                  "duration": 2660
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    10,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248604609,
                  "duration": 3690
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    10,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 248609773,
                  "duration": 2065
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    11,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248624019,
                  "duration": 3977
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    11,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 248630559,
                  "duration": 13327308
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    11,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 248702509,
                  "duration": 7053
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    11,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248712588,
                  "duration": 3051
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    11,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248718884,
                  "duration": 2317
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    11,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 248723744,
                  "duration": 3927
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    11,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248729754,
                  "duration": 2169
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    11,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 248734889,
                  "duration": 2209
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    12,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248746194,
                  "duration": 4960
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    12,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 248753742,
                  "duration": 13205005
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    12,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 248822550,
                  "duration": 5276
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    12,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248832310,
                  "duration": 3280
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    12,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248837140,
                  "duration": 3984
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    12,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 248843687,
                  "duration": 2658
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    12,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248850104,
                  "duration": 2277
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    12,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 248853920,
                  "duration": 3254
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    13,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248865760,
                  "duration": 3397
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    13,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 248873099,
                  "duration": 13086373
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    13,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 248940822,
                  "duration": 5157
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    13,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248948935,
                  "duration": 4464
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    13,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248955079,
                  "duration": 2303
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    13,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 248961373,
                  "duration": 2741
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    13,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 248966283,
                  "duration": 3504
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    13,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 248971282,
                  "duration": 1974
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    14,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 248983242,
                  "duration": 3422
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    14,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 248988974,
                  "duration": 12971330
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    14,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 249055862,
                  "duration": 6822
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    14,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 249065631,
                  "duration": 3052
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    14,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249071824,
                  "duration": 2306
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    14,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 249076556,
                  "duration": 4411
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    14,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249083235,
                  "duration": 4321
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    14,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 249089130,
                  "duration": 2008
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    15,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 249101421,
                  "duration": 5625
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    15,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 249109883,
                  "duration": 12851192
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    15,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 249179192,
                  "duration": 8382
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    15,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 249190596,
                  "duration": 3158
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    15,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249196595,
                  "duration": 2734
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    15,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 249203961,
                  "duration": 2960
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    15,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249209289,
                  "duration": 4191
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    15,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 249215588,
                  "duration": 2850
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    16,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 249229725,
                  "duration": 5813
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    16,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 249238250,
                  "duration": 12723647
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    16,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 249313407,
                  "duration": 5981
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    16,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 249324879,
                  "duration": 3615
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    16,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249330266,
                  "duration": 5438
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    16,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 249338305,
                  "duration": 4418
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    16,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249345585,
                  "duration": 3223
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    16,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 249352671,
                  "duration": 2312
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    17,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 249365808,
                  "duration": 7272
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    17,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 249375571,
                  "duration": 12590368
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    17,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 249456635,
                  "duration": 7028
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    17,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 249466792,
                  "duration": 2952
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    17,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249472941,
                  "duration": 2232
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    17,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 249477750,
                  "duration": 3665
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    17,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249483687,
                  "duration": 2096
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    17,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 249489031,
                  "duration": 2083
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    18,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 249499819,
                  "duration": 4997
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    18,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 249507250,
                  "duration": 12457075
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    18,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 249578339,
                  "duration": 6196
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    18,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 249591039,
                  "duration": 3529
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    18,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249596923,
                  "duration": 5314
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    18,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 249606834,
                  "duration": 4421
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    18,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249616938,
                  "duration": 4897
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    18,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 249623480,
                  "duration": 5797
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    19,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 249643368,
                  "duration": 4380
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    19,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 249655770,
                  "duration": 12309329
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    19,
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 249748763,
                  "duration": 6393
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    19,
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 249759392,
                  "duration": 5848
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    19,
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249767835,
                  "duration": 4441
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    19,
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 249781174,
                  "duration": 3767
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    19,
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 249788631,
                  "duration": 4230
                },
                {
                  "path": [
                    "launches",
                    "launches",
                    19,
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 249795380,
                  "duration": 5547
                }
              ]
            }
          }
        },
        "size": 30375
      }
    },
    "startedDateTime": "2020-10-07T01:21:24.963Z",
    "time": 269.3750000325963,
    "timings": {
      "blocked": 2.620000014849007,
      "dns": -1,
      "ssl": -1,
      "connect": -1,
      "send": 0.04300000000000001,
      "wait": 266.36399998724835,
      "receive": 0.3480000304989517,
      "_blocked_queueing": 2.494000014849007
    }
  },
  "1602033690009": {
    "requestId": "1602033689851",
    "eventId": "1602033690009",
    "request": {
      "bodySize": 428,
      "headersSize": 557,
      "method": "POST",
      "operation": {
        "operationName": "LaunchDetails",
        "variables": {
          "launchId": "101"
        },
        "query": "query LaunchDetails($launchId: ID!) {\n  launch(id: $launchId) {\n    site\n    rocket {\n      type\n      __typename\n    }\n    ...LaunchTile\n    __typename\n  }\n}\n\nfragment LaunchTile on Launch {\n  __typename\n  id\n  isBooked\n  rocket {\n    id\n    name\n    __typename\n  }\n  mission {\n    name\n    missionPatch\n    __typename\n  }\n}\n"
      },
      "url": "http://localhost:4000/graphql"
    },
    "response": {
      "bodySize": 1979,
      "headersSize": 224,
      "content": {
        "data": {
          "launch": {
            "site": "CCAFS SLC 40",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "101",
            "isBooked": true,
            "mission": {
              "name": "SAOCOM 1B, GNOMES-1, Tyvak-0172",
              "missionPatch": "https://images2.imgbox.com/43/33/36WPntCu_o.png",
              "__typename": "Mission"
            }
          }
        },
        "extensions": {
          "tracing": {
            "version": 1,
            "startTime": "2020-10-07T01:21:29.863Z",
            "endTime": "2020-10-07T01:21:30.006Z",
            "duration": 143107176,
            "execution": {
              "resolvers": [{
                  "path": [
                    "launch"
                  ],
                  "parentType": "Query",
                  "fieldName": "launch",
                  "returnType": "Launch",
                  "startOffset": 203651,
                  "duration": 141214544
                },
                {
                  "path": [
                    "launch",
                    "site"
                  ],
                  "parentType": "Launch",
                  "fieldName": "site",
                  "returnType": "String",
                  "startOffset": 141470763,
                  "duration": 17059
                },
                {
                  "path": [
                    "launch",
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 141496448,
                  "duration": 8461
                },
                {
                  "path": [
                    "launch",
                    "rocket",
                    "type"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "type",
                  "returnType": "String",
                  "startOffset": 141518985,
                  "duration": 6838
                },
                {
                  "path": [
                    "launch",
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 141530370,
                  "duration": 4123
                },
                {
                  "path": [
                    "launch",
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 141538351,
                  "duration": 3500
                },
                {
                  "path": [
                    "launch",
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 141547482,
                  "duration": 7971
                },
                {
                  "path": [
                    "launch",
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 141560423,
                  "duration": 1517034
                },
                {
                  "path": [
                    "launch",
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 141736290,
                  "duration": 11115
                },
                {
                  "path": [
                    "launch",
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 141758507,
                  "duration": 7299
                },
                {
                  "path": [
                    "launch",
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 141769673,
                  "duration": 4232
                }
              ]
            }
          }
        },
        "size": 1979
      }
    },
    "startedDateTime": "2020-10-07T01:21:29.851Z",
    "time": 155.92600003583357,
    "timings": {
      "blocked": 8.374000044275075,
      "dns": -1,
      "ssl": -1,
      "connect": -1,
      "send": 0.043999999999999984,
      "wait": 147.18900000725688,
      "receive": 0.3189999843016267,
      "_blocked_queueing": 8.040000044275075
    }
  },
  "1602033690759": {
    "requestId": "1602033690624",
    "eventId": "1602033690759",
    "request": {
      "bodySize": 257,
      "headersSize": 557,
      "method": "POST",
      "operation": {
        "operationName": "cancel",
        "variables": {
          "launchId": "101"
        },
        "query": "mutation cancel($launchId: ID!) {\n  cancelTrip(launchId: $launchId) {\n    success\n    message\n    launches {\n      id\n      isBooked\n      __typename\n    }\n    __typename\n  }\n}\n"
      },
      "url": "http://localhost:4000/graphql"
    },
    "response": {
      "bodySize": 1244,
      "headersSize": 224,
      "content": {
        "data": {
          "cancelTrip": {
            "success": true,
            "message": "trip cancelled",
            "launches": [{
              "id": "101",
              "isBooked": false,
              "__typename": "Launch"
            }],
            "__typename": "TripUpdateResponse"
          }
        },
        "extensions": {
          "tracing": {
            "version": 1,
            "startTime": "2020-10-07T01:21:30.630Z",
            "endTime": "2020-10-07T01:21:30.756Z",
            "duration": 126063546,
            "execution": {
              "resolvers": [{
                  "path": [
                    "cancelTrip"
                  ],
                  "parentType": "Mutation",
                  "fieldName": "cancelTrip",
                  "returnType": "TripUpdateResponse!",
                  "startOffset": 192248,
                  "duration": 124528239
                },
                {
                  "path": [
                    "cancelTrip",
                    "success"
                  ],
                  "parentType": "TripUpdateResponse",
                  "fieldName": "success",
                  "returnType": "Boolean!",
                  "startOffset": 124749899,
                  "duration": 13802
                },
                {
                  "path": [
                    "cancelTrip",
                    "message"
                  ],
                  "parentType": "TripUpdateResponse",
                  "fieldName": "message",
                  "returnType": "String",
                  "startOffset": 124767400,
                  "duration": 4635
                },
                {
                  "path": [
                    "cancelTrip",
                    "launches"
                  ],
                  "parentType": "TripUpdateResponse",
                  "fieldName": "launches",
                  "returnType": "[Launch]",
                  "startOffset": 124774784,
                  "duration": 7406
                },
                {
                  "path": [
                    "cancelTrip",
                    "launches",
                    0,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 124805027,
                  "duration": 8331
                },
                {
                  "path": [
                    "cancelTrip",
                    "launches",
                    0,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 124818150,
                  "duration": 1221464
                }
              ]
            }
          }
        },
        "size": 1244
      }
    },
    "startedDateTime": "2020-10-07T01:21:30.624Z",
    "time": 133.13000003108755,
    "timings": {
      "blocked": 2.642000007234514,
      "dns": -1,
      "ssl": -1,
      "connect": -1,
      "send": 0.04500000000000001,
      "wait": 130.11099999877067,
      "receive": 0.3320000250823796,
      "_blocked_queueing": 2.4930000072345138
    }
  },
  "1602033693621": {
    "requestId": "1602033693350",
    "eventId": "1602033693621",
    "request": {
      "bodySize": 270,
      "headersSize": 551,
      "method": "POST",
      "operation": {
        "operationName": "BookTrips",
        "variables": {
          "launchIds": [
            "101"
          ]
        },
        "query": "mutation BookTrips($launchIds: [ID]!) {\n  bookTrips(launchIds: $launchIds) {\n    success\n    message\n    launches {\n      id\n      isBooked\n      __typename\n    }\n    __typename\n  }\n}\n"
      },
      "url": "http://localhost:4000/graphql"
    },
    "response": {
      "bodySize": 1246,
      "headersSize": 224,
      "content": {
        "data": {
          "bookTrips": {
            "success": true,
            "message": "trips booked successfully",
            "launches": [{
              "id": "101",
              "isBooked": true,
              "__typename": "Launch"
            }],
            "__typename": "TripUpdateResponse"
          }
        },
        "extensions": {
          "tracing": {
            "version": 1,
            "startTime": "2020-10-07T01:21:33.355Z",
            "endTime": "2020-10-07T01:21:33.618Z",
            "duration": 263614847,
            "execution": {
              "resolvers": [{
                  "path": [
                    "bookTrips"
                  ],
                  "parentType": "Mutation",
                  "fieldName": "bookTrips",
                  "returnType": "TripUpdateResponse!",
                  "startOffset": 191755,
                  "duration": 261959697
                },
                {
                  "path": [
                    "bookTrips",
                    "success"
                  ],
                  "parentType": "TripUpdateResponse",
                  "fieldName": "success",
                  "returnType": "Boolean!",
                  "startOffset": 262182275,
                  "duration": 12973
                },
                {
                  "path": [
                    "bookTrips",
                    "message"
                  ],
                  "parentType": "TripUpdateResponse",
                  "fieldName": "message",
                  "returnType": "String",
                  "startOffset": 262200617,
                  "duration": 4540
                },
                {
                  "path": [
                    "bookTrips",
                    "launches"
                  ],
                  "parentType": "TripUpdateResponse",
                  "fieldName": "launches",
                  "returnType": "[Launch]",
                  "startOffset": 262207772,
                  "duration": 9403
                },
                {
                  "path": [
                    "bookTrips",
                    "launches",
                    0,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 262239374,
                  "duration": 8838
                },
                {
                  "path": [
                    "bookTrips",
                    "launches",
                    0,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 262252355,
                  "duration": 1334816
                }
              ]
            }
          }
        },
        "size": 1246
      }
    },
    "startedDateTime": "2020-10-07T01:21:33.350Z",
    "time": 269.44899995578453,
    "timings": {
      "blocked": 1.4909999986328184,
      "dns": -1,
      "ssl": -1,
      "connect": -1,
      "send": 0.059,
      "wait": 267.57900002344326,
      "receive": 0.31999993370845914,
      "_blocked_queueing": 1.3069999986328185
    }
  },
  "1602033696539": {
    "requestId": "1602033696385",
    "eventId": "1602033696539",
    "request": {
      "bodySize": 427,
      "headersSize": 556,
      "method": "POST",
      "operation": {
        "operationName": "LaunchDetails",
        "variables": {
          "launchId": "94"
        },
        "query": "query LaunchDetails($launchId: ID!) {\n  launch(id: $launchId) {\n    site\n    rocket {\n      type\n      __typename\n    }\n    ...LaunchTile\n    __typename\n  }\n}\n\nfragment LaunchTile on Launch {\n  __typename\n  id\n  isBooked\n  rocket {\n    id\n    name\n    __typename\n  }\n  mission {\n    name\n    missionPatch\n    __typename\n  }\n}\n"
      },
      "url": "http://localhost:4000/graphql"
    },
    "response": {
      "bodySize": 1965,
      "headersSize": 224,
      "content": {
        "data": {
          "launch": {
            "site": "KSC LC 39A",
            "rocket": {
              "type": "FT",
              "__typename": "Rocket",
              "id": "falcon9",
              "name": "Falcon 9"
            },
            "__typename": "Launch",
            "id": "94",
            "isBooked": true,
            "mission": {
              "name": "CCtCap Demo Mission 2",
              "missionPatch": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png",
              "__typename": "Mission"
            }
          }
        },
        "extensions": {
          "tracing": {
            "version": 1,
            "startTime": "2020-10-07T01:21:36.398Z",
            "endTime": "2020-10-07T01:21:36.537Z",
            "duration": 138501333,
            "execution": {
              "resolvers": [{
                  "path": [
                    "launch"
                  ],
                  "parentType": "Query",
                  "fieldName": "launch",
                  "returnType": "Launch",
                  "startOffset": 280675,
                  "duration": 136543472
                },
                {
                  "path": [
                    "launch",
                    "site"
                  ],
                  "parentType": "Launch",
                  "fieldName": "site",
                  "returnType": "String",
                  "startOffset": 136863874,
                  "duration": 14198
                },
                {
                  "path": [
                    "launch",
                    "rocket"
                  ],
                  "parentType": "Launch",
                  "fieldName": "rocket",
                  "returnType": "Rocket",
                  "startOffset": 136884646,
                  "duration": 7040
                },
                {
                  "path": [
                    "launch",
                    "rocket",
                    "type"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "type",
                  "returnType": "String",
                  "startOffset": 136904698,
                  "duration": 4547
                },
                {
                  "path": [
                    "launch",
                    "rocket",
                    "id"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 136915720,
                  "duration": 4046
                },
                {
                  "path": [
                    "launch",
                    "rocket",
                    "name"
                  ],
                  "parentType": "Rocket",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 136922058,
                  "duration": 5256
                },
                {
                  "path": [
                    "launch",
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 136930959,
                  "duration": 7563
                },
                {
                  "path": [
                    "launch",
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 136945529,
                  "duration": 1530797
                },
                {
                  "path": [
                    "launch",
                    "mission"
                  ],
                  "parentType": "Launch",
                  "fieldName": "mission",
                  "returnType": "Mission",
                  "startOffset": 137117103,
                  "duration": 9091
                },
                {
                  "path": [
                    "launch",
                    "mission",
                    "name"
                  ],
                  "parentType": "Mission",
                  "fieldName": "name",
                  "returnType": "String",
                  "startOffset": 137139211,
                  "duration": 5038
                },
                {
                  "path": [
                    "launch",
                    "mission",
                    "missionPatch"
                  ],
                  "parentType": "Mission",
                  "fieldName": "missionPatch",
                  "returnType": "String",
                  "startOffset": 137149907,
                  "duration": 3815
                }
              ]
            }
          }
        },
        "size": 1965
      }
    },
    "startedDateTime": "2020-10-07T01:21:36.385Z",
    "time": 152.24100003251806,
    "timings": {
      "blocked": 9.303000015981496,
      "dns": -1,
      "ssl": -1,
      "connect": -1,
      "send": 0.04500000000000001,
      "wait": 142.5739999740273,
      "receive": 0.3190000425092876,
      "_blocked_queueing": 9.160000015981495
    }
  },
  "1602033697391": {
    "requestId": "1602033697236",
    "eventId": "1602033697391",
    "request": {
      "bodySize": 256,
      "headersSize": 556,
      "method": "POST",
      "operation": {
        "operationName": "cancel",
        "variables": {
          "launchId": "94"
        },
        "query": "mutation cancel($launchId: ID!) {\n  cancelTrip(launchId: $launchId) {\n    success\n    message\n    launches {\n      id\n      isBooked\n      __typename\n    }\n    __typename\n  }\n}\n"
      },
      "url": "http://localhost:4000/graphql"
    },
    "response": {
      "bodySize": 1244,
      "headersSize": 224,
      "content": {
        "data": {
          "cancelTrip": {
            "success": true,
            "message": "trip cancelled",
            "launches": [{
              "id": "94",
              "isBooked": false,
              "__typename": "Launch"
            }],
            "__typename": "TripUpdateResponse"
          }
        },
        "extensions": {
          "tracing": {
            "version": 1,
            "startTime": "2020-10-07T01:21:37.241Z",
            "endTime": "2020-10-07T01:21:37.388Z",
            "duration": 147152115,
            "execution": {
              "resolvers": [{
                  "path": [
                    "cancelTrip"
                  ],
                  "parentType": "Mutation",
                  "fieldName": "cancelTrip",
                  "returnType": "TripUpdateResponse!",
                  "startOffset": 210055,
                  "duration": 145268132
                },
                {
                  "path": [
                    "cancelTrip",
                    "success"
                  ],
                  "parentType": "TripUpdateResponse",
                  "fieldName": "success",
                  "returnType": "Boolean!",
                  "startOffset": 145540183,
                  "duration": 18514
                },
                {
                  "path": [
                    "cancelTrip",
                    "message"
                  ],
                  "parentType": "TripUpdateResponse",
                  "fieldName": "message",
                  "returnType": "String",
                  "startOffset": 145563415,
                  "duration": 7838
                },
                {
                  "path": [
                    "cancelTrip",
                    "launches"
                  ],
                  "parentType": "TripUpdateResponse",
                  "fieldName": "launches",
                  "returnType": "[Launch]",
                  "startOffset": 145574627,
                  "duration": 8255
                },
                {
                  "path": [
                    "cancelTrip",
                    "launches",
                    0,
                    "id"
                  ],
                  "parentType": "Launch",
                  "fieldName": "id",
                  "returnType": "ID!",
                  "startOffset": 145608704,
                  "duration": 12956
                },
                {
                  "path": [
                    "cancelTrip",
                    "launches",
                    0,
                    "isBooked"
                  ],
                  "parentType": "Launch",
                  "fieldName": "isBooked",
                  "returnType": "Boolean!",
                  "startOffset": 145627132,
                  "duration": 1495766
                }
              ]
            }
          }
        },
        "size": 1244
      }
    },
    "startedDateTime": "2020-10-07T01:21:37.236Z",
    "time": 153.44999998342246,
    "timings": {
      "blocked": 1.6689999511018396,
      "dns": -1,
      "ssl": -1,
      "connect": -1,
      "send": 0.05600000000000002,
      "wait": 151.27399997422845,
      "receive": 0.4510000580921769,
      "_blocked_queueing": 1.4459999511018395
    }
  }
}


export default fakeNetworkEvent;