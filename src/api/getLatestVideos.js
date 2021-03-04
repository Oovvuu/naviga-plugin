// import request from './graphql.js'

/**
 * Gets the latest videos based on a keyword search.
 *
 * @param  {string} keywords A string of keywords.
 * @return {Promise} The API request.
 */
const getLatestVideos = (keywords) => {
    const query = `
    query ($input: VideoSetInput!, $playbackInput: PlaybackInput! ) {
      videoSet (input: $input) {
        totalCount
        pageResults {
          ...VideoDetailFragment
        }
        cursor
        hasMorePages
      }
    }
    fragment VideoDetailFragment on Video {
      id
      title
      description
      summary
      tags
      thumbnail(input: { width: 500, height: 281 }) {
        url
      }
      preview (input: $playbackInput) {
        brightcoveVideoId
        brightcovePlayerId
        brightcoveAccountId
      }
      collection {
        id
        provider {
          id
          name
          legalName
          logo(input: { width: 100, height: 100 }) {
            url
          }
        }
      }
      genres
      duration
      created
      modified
      activeSince
      providerAssetId
    }
    `

    const variables = {
        "input": {
            "limit": 25,
            "sort": {
                "sort": "id",
                "ascending": false
            },
            "filter": {
                "keywordMatch": keywords,
                "status": [
                    "Active"
                ]
            }
        },
        "playbackInput": {
            "domain": window.location.origin
        }
    }

    const mockLatestVideos = {
        "data": {
            "videoSet": {
                "totalCount": 189,
                "pageResults": [
                    {
                        "id": "100062",
                        "title": "Detectives look at ‘black box’ from Tiger Woods crash",
                        "description": "Detectives in the US are looking at data from the so-called black box from Tiger Woods’s SUV to get a clearer picture of what occurred during the crash in which the golf star was seriously injured last week, authorities have said.\n\nThe Los Angeles County Sheriff’s Department said traffic investigators executed a search warrant on Monday to retrieve the data from the device from the Genesis SUV that Woods was driving.",
                        "summary": "Detectives in the US are looking at data from the so-called black box from Tiger Woods’s SUV to get a clearer picture of what occurred during the crash in which the golf star was seriously injured last week, authorities have said.\n\nThe Los Angeles County Sheriff’s Department said traffic investigators executed a search warrant on Monday to retrieve the data from the device from the Genesis SUV that Woods was driving.",
                        "tags": [
                            "black box",
                            "golfer",
                            "los angeles",
                            "suv",
                            "tiger woods",
                            "united states"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/12/b8e3f7cb-698b-4249-8c5d-5f469b36cf53.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6237026183001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "26",
                            "provider": {
                                "id": "12",
                                "name": "Press Association",
                                "legalName": "Press Association",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/12/de19d53d-c02f-4fe3-ad55-9a5b1f48ecfc.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "Sport"
                        ],
                        "duration": 64,
                        "created": "2021-03-03T23:48:29.458183+00:00",
                        "modified": "2021-03-03T23:55:25.500871+00:00",
                        "activeSince": "2021-03-03T23:49:52.413218+00:00",
                        "providerAssetId": "97850"
                    },
                    {
                        "id": "100056",
                        "title": "Crash Investigators Obtain 'Black Box' From Vehicle Of Tiger Woods",
                        "description": "The so-called \"black box\" is similar to those found on airplanes and stores data about a vehicles speed, steering angle, acceleration and more.",
                        "summary": "The so-called \"black box\" is similar to those found on airplanes and stores data about a vehicles speed, steering angle, acceleration and more.",
                        "tags": [
                            "accident",
                            "black box",
                            "california",
                            "car",
                            "cedars sinai medical center",
                            "celebrity",
                            "crash",
                            "data",
                            "entertainment",
                            "golf",
                            "los angeles",
                            "newsy",
                            "recorder",
                            "rollover",
                            "sheriffs department",
                            "sports",
                            "suv",
                            "tiger woods",
                            "vehicle"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/18/c2ab2e43-f59d-4bca-a1ac-9fadbd1a40b6.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6237025332001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "30",
                            "provider": {
                                "id": "18",
                                "name": "Newsy",
                                "legalName": "Media Convergence Group, Inc.d.b.a. Newsy",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/18/580869c0-1610-49d5-baea-617d2bb6a272.jpg?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 33,
                        "created": "2021-03-03T23:14:38.437940+00:00",
                        "modified": "2021-03-03T23:16:38.723376+00:00",
                        "activeSince": "2021-03-03T23:15:27.081287+00:00",
                        "providerAssetId": "https://www.newsy.com/stories/investigators-obtain-black-box-from-tiger-woods-vehicle/"
                    },
                    {
                        "id": "97771",
                        "title": "Tourists can 'golf quarantine' in Thailand",
                        "description": "At six in the morning, Heo Kwang-eum tees off another day in Thailand in hotel quarantine - literally. He's one of dozens of South Korean visitors spending two weeks in isolation playing golf at a resort an hour north of Bangkok. Megan Revell reports.",
                        "summary": "At six in the morning, Heo Kwang-eum tees off another day in Thailand in hotel quarantine - literally. He's one of dozens of South Korean visitors spending two weeks in isolation playing golf at a resort an hour north of Bangkok. Megan Revell reports.",
                        "tags": [
                            "coronavirus",
                            "covid 19",
                            "golf quarantine",
                            "south korea",
                            "thailand",
                            "tourism"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/6/5cd8c3d6-8260-4f8c-88c2-c8ae4ec64608.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6235283379001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "7",
                            "provider": {
                                "id": "6",
                                "name": "Reuters",
                                "legalName": "Reuters",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/6/80858aae-74ac-4f0a-8bb7-cf729c15b004.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 130,
                        "created": "2021-02-25T16:43:16.297978+00:00",
                        "modified": "2021-02-25T16:44:51.825213+00:00",
                        "activeSince": "2021-02-25T16:44:51.828128+00:00",
                        "providerAssetId": "tag:reuters.com,2021:newsml_OVE15CI97"
                    },
                    {
                        "id": "97714",
                        "title": "WGC-Workday Championship starts in Lakewood Ranch",
                        "description": "While the number of spectators on site will be small over at The Concession Golf Club, the number of eyes watching around the world is not. Bruce Cassidy, the owner of the golf club, where the championship is being held discusses the big tournament.",
                        "summary": "While the number of spectators on site will be small over at The Concession Golf Club, the number of eyes watching around the world is not. Bruce Cassidy, the owner of the golf club, where the championship is being held discusses the big tournament.",
                        "tags": [
                            "good day",
                            "video",
                            "videoelephant",
                            "wtvt"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/65/7f21a52d-70ef-42d0-81b9-41d0366f5db7.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6235239206001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "63",
                            "provider": {
                                "id": "65",
                                "name": "Fox 13 Tampa Bay",
                                "legalName": "Fox 13 Tampa Bay  (via TCA)",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/65/7a83f6b5-2ef2-49ca-bd5d-e59f605eae21.jpg?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 187,
                        "created": "2021-02-25T14:49:12.984365+00:00",
                        "modified": "2021-02-25T14:50:45.959484+00:00",
                        "activeSince": "2021-02-25T14:50:45.962330+00:00",
                        "providerAssetId": "202102250946TRONC___VIDEO___tcavdvgrir_23660"
                    },
                    {
                        "id": "97592",
                        "title": "Tiger Woods’ health is priority right now, not his return to golf – Rory McIlroy",
                        "description": "Rory McIlroy believes thoughts of Tiger Woods resuming his career following his horrifying car accident should not be “even on the map at this point”.\n\nWoods underwent surgery on significant injuries to his right leg after the single-vehicle accident in Los Angeles on Tuesday morning.",
                        "summary": "Rory McIlroy believes thoughts of Tiger Woods resuming his career following his horrifying car accident should not be “even on the map at this point”.\n\nWoods underwent surgery on significant injuries to his right leg after the single-vehicle accident in Los Angeles on Tuesday morning.",
                        "tags": [
                            "accident",
                            "car crash",
                            "golf",
                            "pga tour",
                            "rory mcilroy",
                            "sport",
                            "tiger woods"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/12/5065b08b-8321-44a8-8a38-4f737ca2cc52.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6235167571001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "26",
                            "provider": {
                                "id": "12",
                                "name": "Press Association",
                                "legalName": "Press Association",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/12/de19d53d-c02f-4fe3-ad55-9a5b1f48ecfc.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "Sport"
                        ],
                        "duration": 30,
                        "created": "2021-02-25T09:24:50.373585+00:00",
                        "modified": "2021-02-25T09:31:29.745732+00:00",
                        "activeSince": "2021-02-25T09:25:38.649052+00:00",
                        "providerAssetId": "97362"
                    },
                    {
                        "id": "97572",
                        "title": "Tiger Woods: Golf's comeback king",
                        "description": "Take a look at the career of the 15-time major winner and former world number one.",
                        "summary": "Take a look at the career of the 15-time major winner and former world number one.",
                        "tags": [
                            "golf",
                            "oovvuu",
                            "profile",
                            "sport",
                            "tiger woods"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/1/008bbebc-9c1c-43dc-9af5-337072cd9424.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6235136996001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "8",
                            "provider": {
                                "id": "1",
                                "name": "Oovvuu Originals / Press Association",
                                "legalName": "Oovvuu Pty Ltd",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/1/dab1fd03-7b87-4944-9e3b-793083378f85.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "Sport",
                            "Celebrities",
                            "News"
                        ],
                        "duration": 155,
                        "created": "2021-02-25T07:01:46.859397+00:00",
                        "modified": "2021-02-25T07:27:24.473587+00:00",
                        "activeSince": "2021-02-25T07:03:55.027814+00:00",
                        "providerAssetId": "97351"
                    },
                    {
                        "id": "97451",
                        "title": "Black golfer: Woods excelled in an all white sport",
                        "description": "The founder of a Black golfing group says if Tiger Woods isn’t able to comeback from injuries suffered in a car accident, his legacy has been cemented. (Feb. 24)",
                        "summary": "The founder of a Black golfing group says if Tiger Woods isn’t able to comeback from injuries suffered in a car accident, his legacy has been cemented. (Feb. 24)",
                        "tags": [
                            "akron",
                            "new york",
                            "north america",
                            "ohio",
                            "united states"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/5/3b1b8474-cce0-417c-b7fd-59e51f896db8.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6235078631001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "9",
                            "provider": {
                                "id": "5",
                                "name": "Associated Press",
                                "legalName": "Associated Press",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/5/09122567-84bb-48c1-9e1e-4e508b2dfde5.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 88,
                        "created": "2021-02-25T01:01:30.913909+00:00",
                        "modified": "2021-02-25T01:03:25.520954+00:00",
                        "activeSince": "2021-02-25T01:03:25.532129+00:00",
                        "providerAssetId": "urn:publicid:ap.org:1f151ea896ab41e489c3552e5078ee1b"
                    },
                    {
                        "id": "97359",
                        "title": "Ticket Tuesday: The Hardline's Corby Davidson",
                        "description": "The Hardline's Corby Davidson stops by for Ticket Tuesday to discuss the car crash that sent golfer Tiger Woods to the hospital Wednesday. We also talk about Woods legacy and his future.",
                        "summary": "The Hardline's Corby Davidson stops by for Ticket Tuesday to discuss the car crash that sent golfer Tiger Woods to the hospital Wednesday. We also talk about Woods legacy and his future.",
                        "tags": [
                            "corby davidson",
                            "fox 4",
                            "golf",
                            "kdfw",
                            "mike doocy",
                            "pga tour",
                            "sam gannon",
                            "sports",
                            "ticket tuesday",
                            "tiger woods",
                            "video",
                            "videoelephant"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/74/aa141aa0-6fc4-418a-9c4a-882bf04381d7.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234979602001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "72",
                            "provider": {
                                "id": "74",
                                "name": "Fox 4 Dallas-Fort Worth",
                                "legalName": "Fox 4 Dallas-Fort Worth (via TCA)",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/74/6bd42128-9575-4cf1-aa70-c3d895ab8a79.jpg?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 376,
                        "created": "2021-02-24T22:06:05.697979+00:00",
                        "modified": "2021-02-24T22:08:03.327767+00:00",
                        "activeSince": "2021-02-24T22:08:03.329369+00:00",
                        "providerAssetId": "202102241651TRONC___VIDEO___tcavdvgwir_61835"
                    },
                    {
                        "id": "97346",
                        "title": "Justin Thomas' awkward press conference after learning about Tiger Woods accident",
                        "description": "Justin Thomas' awkward press conference after learning about Tiger Woods accident",
                        "summary": "Justin Thomas' awkward press conference after learning about Tiger Woods accident",
                        "tags": [
                            "awkward interview",
                            "car crash",
                            "close friend",
                            "golf tournament",
                            "justin thomas",
                            "press conference",
                            "professional golfer",
                            "tiger woods",
                            "videoelephant"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/44/a9135b75-c92f-42ae-ab89-16f3062f1a4e.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234972282001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "43",
                            "provider": {
                                "id": "44",
                                "name": "New York Post",
                                "legalName": "New York Post (via TCA)",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/44/8fb6f821-b553-4b54-9144-47e9fdc22ab2.jpg?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 88,
                        "created": "2021-02-24T21:35:54.236305+00:00",
                        "modified": "2021-02-24T21:36:42.288375+00:00",
                        "activeSince": "2021-02-24T21:36:42.289946+00:00",
                        "providerAssetId": "202102241613TRONC___VIDEO___tcavdvitir_10223"
                    },
                    {
                        "id": "97237",
                        "title": "Tiger Woods set for 'long road' to recovery, says leading sport surgeon",
                        "description": "Tiger Woods is at the “beginning of a long road” to recovery after a car crash which left the 15-time major winner with serious injuries to his right leg, according to leading sport surgeon Professor Bill Ribbans.",
                        "summary": "Tiger Woods is at the “beginning of a long road” to recovery after a car crash which left the 15-time major winner with serious injuries to his right leg, according to leading sport surgeon Professor Bill Ribbans.",
                        "tags": [
                            "bill ribbans",
                            "car crash",
                            "crash",
                            "golf",
                            "michael scumacher",
                            "professor bill ribbans",
                            "sport",
                            "surgeon",
                            "surgery",
                            "tiger woods"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/12/ec27743c-2499-49e5-a9b3-666c05148c94.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234933466001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "26",
                            "provider": {
                                "id": "12",
                                "name": "Press Association",
                                "legalName": "Press Association",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/12/de19d53d-c02f-4fe3-ad55-9a5b1f48ecfc.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "Sport"
                        ],
                        "duration": 78,
                        "created": "2021-02-24T16:48:38.738210+00:00",
                        "modified": "2021-02-24T16:49:56.545123+00:00",
                        "activeSince": "2021-02-24T16:49:56.550439+00:00",
                        "providerAssetId": "97327"
                    },
                    {
                        "id": "97210",
                        "title": "Tiger Woods 'awake and responsive' after successful surgery following horror crash",
                        "description": "Tiger Woods is \"awake and responsive\" after successfully undergoing a \"long surgical procedure\" on his right leg and ankle following a horror car crash on Tuesday.",
                        "summary": "Tiger Woods is \"awake and responsive\" after successfully undergoing a \"long surgical procedure\" on his right leg and ankle following a horror car crash on Tuesday.",
                        "tags": [
                            "awake",
                            "california",
                            "car",
                            "cash",
                            "cps1604971",
                            "genesis",
                            "golf",
                            "horror",
                            "rancho palos verdes",
                            "responsive",
                            "sportsman",
                            "successful",
                            "surgery",
                            "surgical procedure",
                            "tigerwoods"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/11/6c1dcaf9-fd0b-42fd-a70e-f47ae9978898.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234928566001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "38",
                            "provider": {
                                "id": "11",
                                "name": "Cover Media",
                                "legalName": "Cover Media",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/11/c7826d24-6a6f-4259-83f5-08a9e07a3fec.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "Celebrities",
                            "Entertainment"
                        ],
                        "duration": 48,
                        "created": "2021-02-24T16:15:43.847971+00:00",
                        "modified": "2021-02-24T16:16:24.283271+00:00",
                        "activeSince": "2021-02-24T16:16:24.289524+00:00",
                        "providerAssetId": "236861-video"
                    },
                    {
                        "id": "97207",
                        "title": "Tiger Woods 'awake, responsive' after surgery following car crash",
                        "description": "( - image credit)  Tiger Woods underwent surgery on both legs after his SUV rolled several times and ended up on its side down a steep roadway in the Los Angeles suburbs Tuesday morning. Golf journalist Lorne Rubenstein said it's possible Woods's injuries could end his career but, 'You can never say never with Tiger.'",
                        "summary": "( - image credit)  Tiger Woods underwent surgery on both legs after his SUV rolled several times and ended up on its side down a steep roadway in the Los Angeles suburbs Tuesday morning. Golf journalist Lorne Rubenstein said it's possible Woods's injuries could end his career but, 'You can never say never with Tiger.'",
                        "tags": [
                            "cbc news",
                            "injury",
                            "sports",
                            "tiger",
                            "videoelephant"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/48/701da011-96e6-49b1-b1aa-ee9771817384.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234922565001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "47",
                            "provider": {
                                "id": "48",
                                "name": "CBC",
                                "legalName": "Canadian Broadcasting Corporation (via TCA)",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/48/ad1b67d6-e828-4c08-b851-e87b38574772.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 530,
                        "created": "2021-02-24T16:05:48.718161+00:00",
                        "modified": "2021-02-24T16:08:16.361404+00:00",
                        "activeSince": "2021-02-24T16:08:16.368025+00:00",
                        "providerAssetId": "202102241054TRONC___VIDEO___tcavdvdsir_55461"
                    },
                    {
                        "id": "97174",
                        "title": "Tiger Woods Recovering After Leg Surgery",
                        "description": "Woods has multiple fractures to his right leg.",
                        "summary": "Woods has multiple fractures to his right leg.",
                        "tags": [
                            "accidents",
                            "accidents and disasters",
                            "arts and entertainment",
                            "automotive accidents",
                            "celebrity",
                            "entertainment",
                            "golf",
                            "los angeles",
                            "mens golf",
                            "mens sports",
                            "newsy",
                            "sports",
                            "sports news",
                            "tiger woods",
                            "transportation",
                            "transportation accidents"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/18/b2a634c2-586d-4425-9b75-199e9123ee1f.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234913328001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "30",
                            "provider": {
                                "id": "18",
                                "name": "Newsy",
                                "legalName": "Media Convergence Group, Inc.d.b.a. Newsy",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/18/580869c0-1610-49d5-baea-617d2bb6a272.jpg?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 22,
                        "created": "2021-02-24T14:58:49.484888+00:00",
                        "modified": "2021-02-24T14:59:34.359732+00:00",
                        "activeSince": "2021-02-24T14:59:34.365459+00:00",
                        "providerAssetId": "https://www.newsy.com/stories/tiger-woods-recovering-after-leg-surgery/"
                    },
                    {
                        "id": "97160",
                        "title": "Tiger Woods Is ‘Awake And Responsive’ Following Serious Car Crash",
                        "description": "A miracle. Tiger Woods’ team and a doctor gave an update on the pro golfer’s condition after he was involved in a rollover car crash on Tuesday, February 23.",
                        "summary": "A miracle. Tiger Woods’ team and a doctor gave an update on the pro golfer’s condition after he was involved in a rollover car crash on Tuesday, February 23.",
                        "tags": [
                            "car accident",
                            "celeb news",
                            "golf",
                            "news",
                            "powr",
                            "rec",
                            "tiger woods"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/84/08881bd2-b7ed-4a73-93bd-5c592a47adae.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234905414001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "79",
                            "provider": {
                                "id": "84",
                                "name": "Us Weekly",
                                "legalName": "A360 Media, LLC (Us Weekly)",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/84/462b8693-2aef-45cd-9ff0-68b343087cd9.jpg?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "Entertainment",
                            "Celebrities"
                        ],
                        "duration": 114,
                        "created": "2021-02-24T14:24:26.647230+00:00",
                        "modified": "2021-02-24T14:26:11.053997+00:00",
                        "activeSince": "2021-02-24T14:26:11.059800+00:00",
                        "providerAssetId": "VhkeEkof"
                    },
                    {
                        "id": "97140",
                        "title": "Tiger Woods is in hospital with serious leg injuries",
                        "description": "Tiger Woods is in hospital with serious leg injuries.",
                        "summary": "Tiger Woods is in hospital with serious leg injuries.",
                        "tags": [
                            "alex villanueva",
                            "aljazeera",
                            "al jazeera",
                            "aljazeeracom",
                            "al jazeera english",
                            "aljazeera english",
                            "aljazeera live",
                            "aljazeera news",
                            "califrnia",
                            "genesis gv80 suv",
                            "golfer",
                            "los angeles",
                            "nocms",
                            "tiger woods",
                            "tiger woods california crash",
                            "tiger woods car crash",
                            "tiger woods golf legacy",
                            "tiger woods los angeles crash",
                            "united states of america",
                            "us latest news",
                            "videoelephant",
                            "youtube"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/43/ea4b7b83-54e2-46b7-b32c-32153e1c68fd.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234902061001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "42",
                            "provider": {
                                "id": "43",
                                "name": "Al Jazeera",
                                "legalName": "Al Jazeera  (via TCA)",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/43/fba41f64-2139-4d4a-9df0-2b840625b713.jpg?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 167,
                        "created": "2021-02-24T13:43:51.880237+00:00",
                        "modified": "2021-02-24T13:45:04.957075+00:00",
                        "activeSince": "2021-02-24T13:45:04.961835+00:00",
                        "providerAssetId": "202102240835TRONC___VIDEO___tcavdvnoir_20966"
                    },
                    {
                        "id": "97105",
                        "title": "Woods 'awake, responsive' after car wreck surgery",
                        "description": "Golf icon Tiger Woods is awake, responsive and recovering after surgery following the serious car accident he suffered on Tuesday in LA. Woods needed to have fractures of his tibia and fibula bones stabilized with a rod after Tuesday's crash. Adam Reed reports.",
                        "summary": "Golf icon Tiger Woods is awake, responsive and recovering after surgery following the serious car accident he suffered on Tuesday in LA. Woods needed to have fractures of his tibia and fibula bones stabilized with a rod after Tuesday's crash. Adam Reed reports.",
                        "tags": [
                            "car accident",
                            "tiger woods",
                            "woods statement"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/6/f1a92a00-f8a7-4282-9358-c4da52749cdc.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234889719001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "7",
                            "provider": {
                                "id": "6",
                                "name": "Reuters",
                                "legalName": "Reuters",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/6/80858aae-74ac-4f0a-8bb7-cf729c15b004.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 96,
                        "created": "2021-02-24T12:03:56.895359+00:00",
                        "modified": "2021-02-24T12:05:08.394053+00:00",
                        "activeSince": "2021-02-24T12:05:08.399101+00:00",
                        "providerAssetId": "tag:reuters.com,2021:newsml_OVE10CR57"
                    },
                    {
                        "id": "97045",
                        "title": "Tiger Woods 'fortunate to be alive' after crashing SUV in California",
                        "description": "American golf legend Tiger Woods is \"fortunate to be alive\" after a car crash in California which saw firefighters having to cut him free from the wreckage of an SUV. \n\nWoods, 45, was taken to hospital and underwent surgery for what his agent confirmed were serious injuries to his legs.  \n\nHe was driving alone at around 7 am on Tuesday morning when his SUV crossed two oncoming lanes of traffic and rolled several times. Woods had to be taken from the wreckage through the windscreen. \n\n“I will say that it’s very fortunate that Mr. Woods was able to come out of this alive,” said  Los Angeles County Sheriff’s Deputy Carlos Gonzalez. \n\nEarlier, Gonzales told a press conference that he had initially not recognised the golf star and asked his name, to which he was able to weakly respond: \"Tiger\".  \n\n“At that moment, it clicked in my mind and I immediately recognized him as Tiger Woods,” he said.  \n\nThe surgery will be the 10th Woods has undergone in his injury-plagued career, which has seen him wrestle with problems with his neck, back, and knee for over a decade.  \n\nThere was no immediate evidence that Woods was impaired. Authorities said they checked for any odor of alcohol or other signs he was under the influence of a substance and found none. They didn’t say how fast he was driving. \n\nWoods was in Los Angeles over the weekend as the host of a golf tournament, where he presented the trophy. He was to spend Monday and Tuesday filming with Discovery-owned GOLFTV, with whom he has an endorsement contract. \n\nThis is the third time Woods has been involved in a car crash, including in 2009 when his SUV ran over a fire hydrant and hit a tree. \n\nIn May 2017, Florida police found him asleep behind the wheel of a car parked awkwardly on the side of the road.  \n\nHe was arrested on a charge of driving under the influence and said later he had an unexpected reaction to prescription medicine for his back pain. \n\nThe golfer later pleaded guilty to reckless driving and checked into a clinic to get help with prescription medication and a sleep disorder. \n\nThoughts and prayers came in from Jack Nicklaus and Michael Jordan, Mike Tyson, and former Presidents Barack Obama and Donald Trump, who has played golf with Woods and awarded him the Presidential Medal of Freedom in 2019.",
                        "summary": "American golf legend Tiger Woods is \"fortunate to be alive\" after a car crash in California which saw firefighters having to cut him free from the wreckage of an SUV. \n\nWoods, 45, was taken to hospital and underwent surgery for what his agent confirmed were serious injuries to his legs.  \n\nHe was driving alone at around 7 am on Tuesday morning when his SUV crossed two oncoming lanes of traffic and rolled several times. Woods had to be taken from the wreckage through the windscreen. \n\n“I will say that it’s very fortunate that Mr. Woods was able to come out of this alive,” said  Los Angeles County Sheriff’s Deputy Carlos Gonzalez. \n\nEarlier, Gonzales told a press conference that he had initially not recognised the golf star and asked his name, to which he was able to weakly respond: \"Tiger\".  \n\n“At that moment, it clicked in my mind and I immediately recognized him as Tiger Woods,” he said.  \n\nThe surgery will be the 10th Woods has undergone in his injury-plagued career, which has seen him wrestle with problems with his neck, back, and knee for over a decade.  \n\nThere was no immediate evidence that Woods was impaired. Authorities said they checked for any odor of alcohol or other signs he was under the influence of a substance and found none. They didn’t say how fast he was driving. \n\nWoods was in Los Angeles over the weekend as the host of a golf tournament, where he presented the trophy. He was to spend Monday and Tuesday filming with Discovery-owned GOLFTV, with whom he has an endorsement contract. \n\nThis is the third time Woods has been involved in a car crash, including in 2009 when his SUV ran over a fire hydrant and hit a tree. \n\nIn May 2017, Florida police found him asleep behind the wheel of a car parked awkwardly on the side of the road.  \n\nHe was arrested on a charge of driving under the influence and said later he had an unexpected reaction to prescription medicine for his back pain. \n\nThe golfer later pleaded guilty to reckless driving and checked into a clinic to get help with prescription medication and a sleep disorder. \n\nThoughts and prayers came in from Jack Nicklaus and Michael Jordan, Mike Tyson, and former Presidents Barack Obama and Donald Trump, who has played golf with Woods and awarded him the Presidential Medal of Freedom in 2019.",
                        "tags": [
                            "accident",
                            "golf",
                            "tiger woods"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/7/1d2e1da2-f6e0-4e20-902c-77a2d80d761d.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234865508001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "5",
                            "provider": {
                                "id": "7",
                                "name": "Euronews",
                                "legalName": "Euronews",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/7/ad9c61be-b463-43bc-81e7-85c9a2ea2fa3.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 86,
                        "created": "2021-02-24T08:49:16.703377+00:00",
                        "modified": "2021-02-24T08:52:20.887382+00:00",
                        "activeSince": "2021-02-24T08:52:20.887834+00:00",
                        "providerAssetId": "euronews-5401424"
                    },
                    {
                        "id": "97041",
                        "title": "Tiger Woods in surgery after suffering multiple leg injuries in car accident",
                        "description": "Tiger Woods was injured in a single-car crash on Tuesday morning near Los Angeles.",
                        "summary": "Tiger Woods was injured in a single-car crash on Tuesday morning near Los Angeles.",
                        "tags": [
                            "accident",
                            "angeles",
                            "car",
                            "crash",
                            "features",
                            "golf",
                            "in",
                            "injuries",
                            "leg",
                            "los",
                            "multiple",
                            "near",
                            "offbeat",
                            "spots",
                            "surgery",
                            "tiger",
                            "tuesday",
                            "woods"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/11/747183d0-b07a-4446-b511-677dc42c45e8.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234865442001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "38",
                            "provider": {
                                "id": "11",
                                "name": "Cover Media",
                                "legalName": "Cover Media",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/11/c7826d24-6a6f-4259-83f5-08a9e07a3fec.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "Entertainment",
                            "Celebrities"
                        ],
                        "duration": 76,
                        "created": "2021-02-24T08:30:38.695386+00:00",
                        "modified": "2021-02-24T08:31:45.217068+00:00",
                        "activeSince": "2021-02-24T08:31:45.218298+00:00",
                        "providerAssetId": "236816-video"
                    },
                    {
                        "id": "97037",
                        "title": "Tiger Woods suffers serious leg injuries in car crash",
                        "description": "Golfer’s car veered off road and rolled over several times in early morning crash in California, authorities say.",
                        "summary": "Golfer’s car veered off road and rolled over several times in early morning crash in California, authorities say.",
                        "tags": [
                            "alex villanueva",
                            "aljazeera",
                            "al jazeera",
                            "al jazeera english",
                            "aljazeera english",
                            "aljazeera live",
                            "aljazeera news",
                            "califrnia",
                            "genesis gv80 suv",
                            "golfer",
                            "los angeles",
                            "nocms",
                            "tiger woods",
                            "tiger woods california crash",
                            "tiger woods car crash",
                            "tiger woods golf legacy",
                            "tiger woods los angeles crash",
                            "united states of america",
                            "us latest news",
                            "videoelephant",
                            "youtube"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/43/e94a86b9-9940-49fb-b890-8a709af5512b.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234857518001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "42",
                            "provider": {
                                "id": "43",
                                "name": "Al Jazeera",
                                "legalName": "Al Jazeera  (via TCA)",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/43/fba41f64-2139-4d4a-9df0-2b840625b713.jpg?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 141,
                        "created": "2021-02-24T08:02:47.487155+00:00",
                        "modified": "2021-02-24T08:04:34.164198+00:00",
                        "activeSince": "2021-02-24T08:04:34.165231+00:00",
                        "providerAssetId": "202102240254TRONC___VIDEO___tcavdvnoir_23110"
                    },
                    {
                        "id": "97005",
                        "title": "Tiger Woods hospitalized after car crash",
                        "description": "Golf superstar Tiger Woods needed surgery after a car crash in Los Angeles on Tuesday that left him with multiple leg injuries. Officials say he was conscious when pulled from the wrecked SUV and the injuries are not life threatening.",
                        "summary": "Golf superstar Tiger Woods needed surgery after a car crash in Los Angeles on Tuesday that left him with multiple leg injuries. Officials say he was conscious when pulled from the wrecked SUV and the injuries are not life threatening.",
                        "tags": [
                            "cbc news",
                            "cbc sports",
                            "ellen mauro",
                            "the national",
                            "tiger woods",
                            "tiger woods accident",
                            "tiger woods car crash",
                            "tiger woods condition",
                            "tiger woods future",
                            "tiger woods injured",
                            "tiger woods leg injury",
                            "tiger woods surgery",
                            "tiger woods update",
                            "videoelephant"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/48/ee656052-6c13-42f7-a659-cfc1b6b074ca.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234841023001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "47",
                            "provider": {
                                "id": "48",
                                "name": "CBC",
                                "legalName": "Canadian Broadcasting Corporation (via TCA)",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/48/ad1b67d6-e828-4c08-b851-e87b38574772.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News",
                            "Celebrities",
                            "Sport"
                        ],
                        "duration": 122,
                        "created": "2021-02-24T05:59:38.163393+00:00",
                        "modified": "2021-02-24T07:17:28.954438+00:00",
                        "activeSince": "2021-02-24T06:00:57.936676+00:00",
                        "providerAssetId": "202102240056TRONC___VIDEO___tcavdvdsir_10928"
                    },
                    {
                        "id": "96846",
                        "title": "Tiger Woods in surgery after car accident",
                        "description": "Tiger Woods is in surgery after suffering multiple leg injuries in a car accident in Los Angeles.",
                        "summary": "Tiger Woods is in surgery after suffering multiple leg injuries in a car accident in Los Angeles.",
                        "tags": [
                            "celebrity",
                            "celebrity news",
                            "entertainment",
                            "entertainment news",
                            "golf",
                            "golfing",
                            "golfing news",
                            "golf news",
                            "golf pro",
                            "los angeles",
                            "mark steinberg",
                            "pga tour",
                            "sport",
                            "sports star",
                            "tiger woods"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/9/6a54c4f0-aa15-456a-b70f-5a03c2fb0029.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234790972001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "10",
                            "provider": {
                                "id": "9",
                                "name": "Bang Media",
                                "legalName": "Bang Media",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/9/1c3ce997-70b8-4337-8dab-43df4dc26608.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "Celebrities",
                            "Entertainment"
                        ],
                        "duration": 86,
                        "created": "2021-02-24T00:45:47.292448+00:00",
                        "modified": "2021-02-24T00:48:14.629719+00:00",
                        "activeSince": "2021-02-24T00:48:14.630655+00:00",
                        "providerAssetId": "2246991"
                    },
                    {
                        "id": "96818",
                        "title": "Tiger Woods injured in serious car crash",
                        "description": "( - image credit)  Golf pro Tiger Woods was involved in a single-vehicle car crash Tuesday in suburban Los Angeles and had to be extricated with the help of the Jaws of Life. He suffered non-life threatening leg injuries but was to undergo surgery in hospital.",
                        "summary": "( - image credit)  Golf pro Tiger Woods was involved in a single-vehicle car crash Tuesday in suburban Los Angeles and had to be extricated with the help of the Jaws of Life. He suffered non-life threatening leg injuries but was to undergo surgery in hospital.",
                        "tags": [
                            "car accident",
                            "car crash",
                            "cbc",
                            "cbc news",
                            "golf",
                            "golf pro",
                            "jaws of life",
                            "los angeles",
                            "serious car crash",
                            "single vehicle car crash",
                            "surgery",
                            "tiger woods",
                            "tiger woods car accident",
                            "tiger woods car crash",
                            "videoelephant",
                            "woods"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/48/4821ca39-dc88-433d-96ee-73ea5a624655.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234779716001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "47",
                            "provider": {
                                "id": "48",
                                "name": "CBC",
                                "legalName": "Canadian Broadcasting Corporation (via TCA)",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/48/ad1b67d6-e828-4c08-b851-e87b38574772.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 503,
                        "created": "2021-02-23T23:45:45.747722+00:00",
                        "modified": "2021-02-23T23:48:35.424829+00:00",
                        "activeSince": "2021-02-23T23:48:35.431789+00:00",
                        "providerAssetId": "202102231821TRONC___VIDEO___tcavdvdsir_62370"
                    },
                    {
                        "id": "96730",
                        "title": "Tiger Woods taken to hospital after Calif. car crash",
                        "description": "Tiger Woods' manager says the golf star has suffered leg injuries in a vehicle rollover and is undergoing surgery. The Los Angeles County Sheriff's Department says Woods was alone and had to be extricated from the vehicle Tuesday. (Feb. 23)",
                        "summary": "Tiger Woods' manager says the golf star has suffered leg injuries in a vehicle rollover and is undergoing surgery. The Los Angeles County Sheriff's Department says Woods was alone and had to be extricated from the vehicle Tuesday. (Feb. 23)",
                        "tags": [
                            "california",
                            "los angeles",
                            "mark steinberg",
                            "north america",
                            "united states"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/5/06b6b015-542b-4a57-9323-80451885ab4b.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234744913001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "9",
                            "provider": {
                                "id": "5",
                                "name": "Associated Press",
                                "legalName": "Associated Press",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/5/09122567-84bb-48c1-9e1e-4e508b2dfde5.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "News"
                        ],
                        "duration": 57,
                        "created": "2021-02-23T21:19:09.155540+00:00",
                        "modified": "2021-02-23T21:20:36.143424+00:00",
                        "activeSince": "2021-02-23T21:20:36.142675+00:00",
                        "providerAssetId": "urn:publicid:ap.org:2b60026ceb81454abbfdb37696c7ca56"
                    },
                    {
                        "id": "96719",
                        "title": "Injured Tiger Woods cut out from rolled car",
                        "description": "Tiger Woods has been hospitalised after being cut from his car following an accident in Los Angeles, officials have confirmed.",
                        "summary": "Tiger Woods has been hospitalised after being cut from his car following an accident in Los Angeles, officials have confirmed.",
                        "tags": [
                            "car accident",
                            "golf",
                            "hospital",
                            "los angeles",
                            "sport",
                            "tiger woods",
                            "usa"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/12/a0213bb8-2442-40dd-af07-8b34f7338140.jpeg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234732111001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "26",
                            "provider": {
                                "id": "12",
                                "name": "Press Association",
                                "legalName": "Press Association",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/12/de19d53d-c02f-4fe3-ad55-9a5b1f48ecfc.png?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "Sport",
                            "Celebrities",
                            "News"
                        ],
                        "duration": 42,
                        "created": "2021-02-23T20:42:22.746955+00:00",
                        "modified": "2021-02-23T22:22:37.367684+00:00",
                        "activeSince": "2021-02-23T20:43:23.044337+00:00",
                        "providerAssetId": "97273"
                    },
                    {
                        "id": "96718",
                        "title": "Tiger Woods Injured In Car Crash, Extracted From Wreck With ‘Jaws Of Life’",
                        "description": "Tiger Woods has been injured in a car crash and extracted from the wreck with 'jaws of life.'",
                        "summary": "Tiger Woods has been injured in a car crash and extracted from the wreck with 'jaws of life.'",
                        "tags": [
                            "car accident",
                            "celeb news",
                            "golf",
                            "news",
                            "powr",
                            "rec",
                            "tiger woods"
                        ],
                        "thumbnail": {
                            "url": "https://oovvuu-thumbnails-prod.imgix.net/84/3952a7d4-07b4-43fb-b698-6e514c03d314.jpg?h=281&w=500"
                        },
                        "preview": {
                            "brightcoveVideoId": "6234731957001",
                            "brightcovePlayerId": "7zGH8Eafb",
                            "brightcoveAccountId": "6146357338001"
                        },
                        "collection": {
                            "id": "79",
                            "provider": {
                                "id": "84",
                                "name": "Us Weekly",
                                "legalName": "A360 Media, LLC (Us Weekly)",
                                "logo": {
                                    "url": "https://oovvuu-logos-prod.imgix.net/84/462b8693-2aef-45cd-9ff0-68b343087cd9.jpg?h=100&w=100"
                                }
                            }
                        },
                        "genres": [
                            "Celebrities",
                            "Entertainment"
                        ],
                        "duration": 76,
                        "created": "2021-02-23T20:24:12.121390+00:00",
                        "modified": "2021-02-23T20:25:17.991167+00:00",
                        "activeSince": "2021-02-23T20:25:17.990939+00:00",
                        "providerAssetId": "uLGPXbFc"
                    }
                ],
                "cursor": "{\"v\":1,\"last\":{\"id\":96718}}",
                "hasMorePages": true
            }
        }
    };

    return Promise.resolve(mockLatestVideos);

    // return request(query, variables);
}

export default getLatestVideos;
