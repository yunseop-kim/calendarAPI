# Calendar API
## description
- Database: MySQL
    - SQL File Path : calendar.sql

## API
**Login Representation**
----
  Inquire Login Representation.

* **URL**

  /login

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/login",
            "links": [
                {
                    "rel": "up",
                    "href": "http://localhost:8080"
                },
                {
                    "rel": "template",
                    "href": "http://localhost:8080/login/template"
                }
            ]
        }
    }
    ```
----

**Login Template**
----
  Inquire Login Template.

* **URL**

  /login/template

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/login/template",
            "links": [
                {
                    "rel": "up",
                    "href": "http://localhost:8080/login"
                }
            ],
            "template": {
                "data": [
                    {
                        "name": "email",
                        "value": "",
                        "prompt": "Email"
                    },
                    {
                        "name": "password",
                        "value": "",
                        "prompt": "Password"
                    }
                ]
            }
        }
    }
    ```
----

**Login**
----
  Login to Calendar App.

* **URL**

  /login

* **Method:**

  `POST`
  
* **Body**

```
{
	"template": {
      "data": [
        {
          "name": "email",
          "value": "",
          "prompt": "group name"
        },
        {
          "name": "password",
          "value": "",
          "prompt": "show selected"
        }
      ]
    }
}
```

* **Success Response:**

  * **Code:** 201 <br />

----

**Calendar**
----
  Inquire Calendar Representation.

* **URL**

  /calendar

* **Method:**

  `GET`

* **Query Params**

  `date`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/calendar",
            "links": [
                {
                    "rel": "up",
                    "href": "http://localhost:8080"
                },
                {
                    "rel": "template",
                    "href": "http://localhost:8080/calendar/template"
                },
                {
                    "rel": "prev",
                    "href": "http://localhost:8080/calendar/2017/05"
                },
                {
                    "rel": "current",
                    "href": "http://localhost:8080/calendar/2017/06"
                },
                {
                    "rel": "next",
                    "href": "http://localhost:8080/calendar/2017/07"
                }
            ],
            "queries": [
                {
                    "rel": "find by date",
                    "prompt": "find by date",
                    "href": "http://localhost:8080/calendar",
                    "data": [
                        {
                            "name": "date",
                            "value": "",
                            "prompt": "input date. format: YYYY-MM"
                        }
                    ]
                },
                {
                    "rel": "find by query",
                    "prompt": "find by query",
                    "href": "http://localhost:8080/calendar/find",
                    "data": [
                        {
                            "name": "query",
                            "value": "",
                            "prompt": "input query."
                        }
                    ]
                }
            ]
        }
    }
    ```
----

**Find Schedule**
----
  Find Schedule

* **URL**

  /calendar/find

* **Method:**

  `GET`

* **Query Params**

  `query`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/calendar/find",
            "links": [
                {
                    "rel": "up",
                    "href": "http://localhost:8080/calendar"
                },
                {
                    "rel": "template",
                    "href": "http://localhost:8080/calendar/template"
                }
            ],
            "items": [
                {
                    "href": "http://localhost:8080/calendar/2",
                    "data": [
                        {
                            "name": "title",
                            "value": "schedule 2",
                            "prompt": "title"
                        }
                    ]
                },
                {
                    "href": "http://localhost:8080/calendar/5",
                    "data": [
                        {
                            "name": "title",
                            "value": "schedule 5",
                            "prompt": "title"
                        }
                    ]
                }
            ]
        }
    }
    ```
----

**Calendar Template**
----
  Inquire Calendar Template.

* **URL**

  /calendar/template

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/calendar/template",
            "links": [
                {
                    "rel": "up",
                    "href": "http://localhost:8080/calendar"
                }
            ],
            "template": {
                "data": [
                    {
                        "name": "title",
                        "value": "",
                        "prompt": "Title"
                    },
                    {
                        "name": "startDate",
                        "value": "",
                        "prompt": "Start Date"
                    },
                    {
                        "name": "endDate",
                        "value": "",
                        "prompt": "End Date"
                    },
                    {
                        "name": "groupName",
                        "value": "",
                        "prompt": "select group name"
                    }
                ]
            }
        }
    }
    ```
----

**Calendar Detail**
----
  Inquire Calendar Detail.

* **URL**

  /calendar/:idx

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/calendar/1",
            "links": [
                {
                    "rel": "up",
                    "href": "http://localhost:8080/calendar"
                }
            ],
            "items": [
                {
                    "href": "http://localhost:8080/calendar/1",
                    "data": [
                        {
                            "name": "title",
                            "value": "my title",
                            "prompt": "title"
                        },
                        {
                            "name": "startDate",
                            "value": "2017-06-11T20:15:45.000Z",
                            "prompt": "start date"
                        },
                        {
                            "name": "endDate",
                            "value": "2017-06-11T20:15:45.000Z",
                            "prompt": "end date"
                        },
                        {
                            "name": "groupName",
                            "value": "",
                            "prompt": "group name"
                        }
                    ]
                }
            ]
        }
    }
    ```
* **Error Response:**

  * **Code:** 404 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/calendar/166",
            "error": {
                "code": "3002",
                "title": "Server Processing Error",
                "message": "The resource you want requested is not found"
            }
        }
    }
    ```
----

**Inquire Monthly**
----
  Inquire Monthly

* **URL**

  /calendar/:year/:month

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/calendar/2017/06",
            "links": [
                {
                    "rel": "up",
                    "href": "http://localhost:8080"
                },
                {
                    "rel": "today",
                    "href": "http://localhost:8080/calendar/2017/06/12"
                },
                {
                    "rel": "template",
                    "href": "http://localhost:8080/template"
                }
            ],
            "items": [
                {
                    "href": "http://localhost:8080/calendar/2017/06/01"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/02"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/03"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/04"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/05"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/06"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/07"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/08"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/09"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/10"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/11"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/12"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/13"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/14"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/15"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/16"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/17"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/18"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/19"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/20"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/21"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/22"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/23"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/24"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/25"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/26"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/27"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/28"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/29"
                },
                {
                    "href": "http://localhost:8080/calendar/2017/06/30"
                }
            ]
        }
    }
    ```
* **Error Response:**
<!-- todo: validation check of year, month, day-->
  * **Code:** 400 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/calendar/2017/12",
            "error": {
                "code": "2001",
                "title": "Client Input Error",
                "message": "The resource you want requested is not found"
            }
        }
    }
    ```
----

**Inquire Daily**
----
  Inquire Daily

* **URL**

  /calendar/:year/:month/:day

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/calendar/2017/06/09",
            "links": [
                {
                    "rel": "up",
                    "href": "http://localhost:8080/calendar/2017/06"
                },
                {
                    "rel": "template",
                    "href": "http://localhost:8080/template"
                }
            ],
            "items": [
                {
                    "href": "http://localhost:8080/5",
                    "data": [
                        {
                            "name": "title",
                            "value": "schedule 5",
                            "prompt": "title"
                        }
                    ]
                }
            ]
        }
    }
    ```
* **Error Response:**
<!-- todo: validation check of year, month, day-->
  * **Code:** 400 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/calendar/2017/12/11",
            "error": {
                "code": "2001",
                "title": "Client Input Error",
                "message": "The resource you want requested is not found"
            }
        }
    }
    ```
----

**Enroll Schedule**
----
  Enroll Schedule.

* **URL**

  /calendar

* **Method:**

  `POST`
  
* **Body**

```
{
	"template": {
        "data": [
            {
                "name": "title",
                "value": "",
                "prompt": "Title"
            },
            {
                "name": "startDate",
                "value": "",
                "prompt": "Start Date"
            },
            {
                "name": "endDate",
                "value": "",
                "prompt": "End Date"
            },
            {
                "name": "groupName",
                "value": "",
                "prompt": "select group name"
            }
        ]
    }
}
```

* **Success Response:**

  * **Code:** 201 <br />

----


**Modify Schedule**
----
  Modify Schedule.

* **URL**

  /calendar/:idx

* **URL Params**

  idx=[integer]

* **Method:**

  `PUT`
  
* **Body**

```
{
	"template": {
        "data": [
            {
                "name": "title",
                "value": "",
                "prompt": "Title"
            },
            {
                "name": "startDate",
                "value": "",
                "prompt": "Start Date"
            },
            {
                "name": "endDate",
                "value": "",
                "prompt": "End Date"
            },
            {
                "name": "groupName",
                "value": "",
                "prompt": "select group name"
            }
        ]
    }
}
```

* **Success Response:**

  * **Code:** 204 <br />

----

**Delete Schedule**
----
  Delete Schedule.

* **URL**

  /calendar/:idx

* **URL Params**

  idx=[integer]

* **Method:**

  `DELETE`

* **Success Response:**

  * **Code:** 204 <br />

----


**Group**
----
  Inquire Group Representation.

* **URL**

  /group

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/group",
            "links": [
                {
                    "rel": "up",
                    "href": "http://localhost:8080"
                },
                {
                    "rel": "template",
                    "href": "http://localhost:8080/group/template"
                },
                {
                    "rel": "list",
                    "href": "http://localhost:8080/group/list"
                }
            ]
        }
    }
    ```
----

**Enroll Group**
----
  Enroll Group.

* **URL**

  /group

* **Method:**

  `POST`
  
* **Body**

```
{
	"template": {
      "data": [
        {
          "name": "name",
          "value": "owww",
          "prompt": "group name"
        },
        {
          "name": "selected",
          "value": true,
          "prompt": "show selected"
        }
      ]
    }
}
```

* **Success Response:**

  * **Code:** 201 <br />

----

**Modify Group**
----
  Modify Group.

* **URL**

  /group/:idx

* **URL Params**

  idx=[integer]

* **Method:**

  `PUT`
  
* **Body**

```
{
	"template": {
      "data": [
        {
          "name": "name",
          "value": "owww",
          "prompt": "group name"
        },
        {
          "name": "selected",
          "value": true,
          "prompt": "show selected"
        }
      ]
    }
}
```

* **Success Response:**

  * **Code:** 204 <br />

----

**Delete Group**
----
  Delete Group.

* **URL**

  /group/:idx

* **URL Params**

  idx=[integer]

* **Method:**

  `DELETE`

* **Success Response:**

  * **Code:** 204 <br />

----

**Group Template**
----
  Inquire Group Template.

* **URL**

  /group/template

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/group/template",
            "links": [
                {
                    "rel": "up",
                    "href": "http://localhost:8080/group"
                }
            ],
            "template": {
                "data": [
                    {
                        "name": "name",
                        "value": "",
                        "prompt": "group name"
                    },
                    {
                        "name": "selected",
                        "value": true,
                        "prompt": "show selected"
                    }
                ]
            }
        }
    }
    ```

**Group List**
----
  Inquire Group List.

* **URL**

  /group/list

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content**
    ```
    {
        "collection": {
            "version": "1.0",
            "href": "http://localhost:8080/group/list",
            "links": [
                {
                    "rel": "up",
                    "href": "http://localhost:8080/group"
                },
                {
                    "rel": "template",
                    "href": "http://localhost:8080/group/template"
                }
            ],
            "items": [
                {
                    "href": "http://localhost:8080/group/8",
                    "data": [
                        {
                            "name": "name",
                            "value": "ttteeesssttt",
                            "prompt": "group name"
                        }
                    ]
                },
                {
                    "href": "http://localhost:8080/group/6",
                    "data": [
                        {
                            "name": "name",
                            "value": "group3",
                            "prompt": "group name"
                        }
                    ]
                },
                {
                    "href": "http://localhost:8080/group/5",
                    "data": [
                        {
                            "name": "name",
                            "value": "group2",
                            "prompt": "group name"
                        }
                    ]
                }
            ]
        }
    }
    ```
----
