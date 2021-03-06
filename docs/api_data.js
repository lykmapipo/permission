define({ "api": [
  {
    "type": "delete",
    "url": "/permissions/:id",
    "title": "Delete Existing Permission",
    "version": "1.0.0",
    "name": "DeletePermission",
    "group": "Permission",
    "description": "<p>Delete existing permission</p>",
    "filename": "lib/permission.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://permision.herokuapp.com/v1/permissions/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique permission identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "resource",
            "description": "<p>Resource constrained by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Action(or permit) constrained(or granted) by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a permission if available i.e additional details that clarify what a permission for</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "wildcard",
            "description": "<p>System generated unique identifier of a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when permission was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when permission was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b622350480e576243f10d8b\",\n  \"resource\": \"Task\",\n  \"action\": \"create\",\n  \"description\": \"In quos quae sed consectetur voluptas praesentium.\",\n  \"wildcard\": \"task:create\",\n  \"updatedAt\": \"2018-08-01T21:17:04.729Z\",\n  \"createdAt\": \"2018-08-01T21:17:04.729Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/permissions/:id",
    "title": "Get Existing Permission",
    "version": "1.0.0",
    "name": "GetPermission",
    "group": "Permission",
    "description": "<p>Get existing permission</p>",
    "filename": "lib/permission.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://permision.herokuapp.com/v1/permissions/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique permission identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "resource",
            "description": "<p>Resource constrained by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Action(or permit) constrained(or granted) by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a permission if available i.e additional details that clarify what a permission for</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "wildcard",
            "description": "<p>System generated unique identifier of a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when permission was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when permission was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b622350480e576243f10d8b\",\n  \"resource\": \"Task\",\n  \"action\": \"create\",\n  \"description\": \"In quos quae sed consectetur voluptas praesentium.\",\n  \"wildcard\": \"task:create\",\n  \"updatedAt\": \"2018-08-01T21:17:04.729Z\",\n  \"createdAt\": \"2018-08-01T21:17:04.729Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/permissions/schema",
    "title": "Get Permission Schema",
    "version": "1.0.0",
    "name": "GetPermissionSchema",
    "group": "Permission",
    "description": "<p>Returns permission json schema definition</p>",
    "filename": "lib/permission.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://permision.herokuapp.com/v1/permissions/schema"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/permissions",
    "title": "List Permissions",
    "version": "1.0.0",
    "name": "GetPermissions",
    "group": "Permission",
    "description": "<p>Returns a list of permissions</p>",
    "filename": "lib/permission.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://permision.herokuapp.com/v1/permissions"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>List of permissions</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>Unique permission identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.resource",
            "description": "<p>Resource constrained by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.action",
            "description": "<p>Action(or permit) constrained(or granted) by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.description",
            "description": "<p>A brief summary about a permission if available i.e additional details that clarify what a permission for</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "data.wildcard",
            "description": "<p>System generated unique identifier of a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.createdAt",
            "description": "<p>Date when permission was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "data.updatedAt",
            "description": "<p>Date when permission was last updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>Total number of permission</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of permissions returned</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Query limit used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Query skip/offset used</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Page number</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pages",
            "description": "<p>Total number of pages</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "lastModified",
            "description": "<p>Date and time at which latest permission was last modified</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n    {\n      \"_id\": \"5b622350480e576243f10d8b\",\n      \"resource\": \"Task\",\n      \"action\": \"create\",\n      \"description\": \"In quos quae sed consectetur voluptas praesentium.\",\n      \"wildcard\": \"task:create\",\n      \"updatedAt\": \"2018-08-01T21:17:04.729Z\",\n      \"createdAt\": \"2018-08-01T21:17:04.729Z\"\n    }\n  ],\n  \"total\": 20,\n  \"size\": 10,\n  \"limit\": 10,\n  \"skip\": 0,\n  \"page\": 1,\n  \"pages\": 2,\n  \"lastModified\": \"2018-07-29T10:11:38.111Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/permissions/:id",
    "title": "Patch Existing Permission",
    "version": "1.0.0",
    "name": "PatchPermission",
    "group": "Permission",
    "description": "<p>Patch existing permission</p>",
    "filename": "lib/permission.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://permision.herokuapp.com/v1/permissions/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique permission identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "resource",
            "description": "<p>Resource constrained by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Action(or permit) constrained(or granted) by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a permission if available i.e additional details that clarify what a permission for</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "wildcard",
            "description": "<p>System generated unique identifier of a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when permission was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when permission was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b622350480e576243f10d8b\",\n  \"resource\": \"Task\",\n  \"action\": \"create\",\n  \"description\": \"In quos quae sed consectetur voluptas praesentium.\",\n  \"wildcard\": \"task:create\",\n  \"updatedAt\": \"2018-08-01T21:17:04.729Z\",\n  \"createdAt\": \"2018-08-01T21:17:04.729Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/permissions/:id",
    "title": "Put Existing Permission",
    "version": "1.0.0",
    "name": "PutPermission",
    "group": "Permission",
    "description": "<p>Put existing permission</p>",
    "filename": "lib/permission.http.router.js",
    "groupTitle": "",
    "sampleRequest": [
      {
        "url": "https://permision.herokuapp.com/v1/permissions/:id"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept",
            "defaultValue": "application/json",
            "description": "<p>Accepted content type</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Accept-Encoding",
            "defaultValue": "gzip, deflate",
            "description": "<p>Accepted encoding type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Accept\": \"application/json\"\n  \"Authorization\": \"Bearer ey6utFreRdy5\"\n  \"Accept-Encoding\": \"gzip, deflate\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique permission identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "resource",
            "description": "<p>Resource constrained by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Action(or permit) constrained(or granted) by a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>A brief summary about a permission if available i.e additional details that clarify what a permission for</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "wildcard",
            "description": "<p>System generated unique identifier of a permission</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "createdAt",
            "description": "<p>Date when permission was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>Date when permission was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"_id\": \"5b622350480e576243f10d8b\",\n  \"resource\": \"Task\",\n  \"action\": \"create\",\n  \"description\": \"In quos quae sed consectetur voluptas praesentium.\",\n  \"wildcard\": \"task:create\",\n  \"updatedAt\": \"2018-08-01T21:17:04.729Z\",\n  \"createdAt\": \"2018-08-01T21:17:04.729Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "JWTExpired",
            "description": "<p>Authorization token has expired</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthorizationHeaderRequired",
            "description": "<p>Authorization header is required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"jwt expired\",\n  \"error\":{}\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"success\":false,\n  \"message :\"Authorization header required\",\n  \"error\":{}\n}",
          "type": "json"
        }
      ]
    }
  }
] });
