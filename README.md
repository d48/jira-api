## Introduction

A cli tool in node.js to query the Jira REST api

## Usage

1. Add config.json under libs with
    ```
    {
        "username": "yourname",
        "password": "yourpassword",
        "host": "jira.host.com"
    }
    ```
2. $ node index.js

## Todo 

* create cli wrapper so can run commands like `$ jira issues <projectname|sprintname>`
* getIssues api with parameters to filter results 
