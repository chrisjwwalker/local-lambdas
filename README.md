local-lambdas
=============
A test project demonstrating how to publish your lambdas to a localstack instance


## Prerequistes
- Docker and docker compose
- Localstack; our AWS simulator (used in the optional challenges)
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [NodeJS](https://nodejs.org/en/download/package-manager/)

## What do?

### 1. Localstack
Localstack is our AWS simulator, find out more [here](https://github.com/localstack/localstack). For this guide we're interested in the fact that localstack can run Lambdas locally. 

In the root of the project we have a docker compose file. Here we've defined how to boot the localstack docker image. Open a terminal in the project dir and run

```shell script
docker-compose up -d
```

### 2. Code Inspection
So what are we working with? In the `src/handlers` dir we have two lambdas defined; the `get-user` and `replay-event` functions. 

#### Get user
This function is exposed via a REST endpoint. Calling with a id query param of 1 returns the user John Smith. Calling with any other value for id returns a user not found error. Specifying no query param also returns an error.

#### Replay event
This is a very simple function. Passing an event to it returns the same event wrapped up. 

We have some basic unit tests for these lambdas. Lets ensure everything is working. Lets install our dependencies and run those tests.

```shell script
npm install
npm test
```

### 3. Formation template
In the root of the project we have the formation template `template.yml`. This file defines the AWS services we want to deploy. We have the code we want to execute in `src/handlers` and the `template.yml` tells AWS how to run the code. 

The formation template can be a comprehensive breakdown of how all of your services run and interconnect. For example you can define a lambda that exposed via API Gateway that's secured with Cognito with the lamda generating a message that gets dumped onto a SQA queue and so on and so forth. It can as simple or complex as you need.

Ours is the former. All ours does is define two lamdbas, one exposed via a REST GET request and the other not exposed via API. It defineds memory limit and timeouts along with the IAM roles to generated along side. 

### 4. Calling a lambda not exposed via an API
To do this we only need the AWS SAM CLI, we don't rely on localstack for this. Run the following command to invoke the ReplayEventFunction. 

```shell script
sam local invoke "ReplayEventFunction" -e events/event.json
```

Let break that down
- `sam` we're running the AWS SAM CLI
- `local` we're telling sam to spin something up locally
- `invoke "ReplayEventFunction"` we're invoking a lamdba with the name `ReplayEventFunction`. This name is set in the formation template
- `-e events/event.json` Using a json file from the events dir, we're calling the lambda with an event. This argument can be omitted to provide no event data.

You should see the result of the lambda invocation in the terminal output.

### 5. Calling a lambda exposed via an API
To do this we only need the AWS SAM CLI, we don't rely on localstack for this. Run the following command to invoke the GetUserFunction. 
Our GetUserFunction is configured to be exposed via API, but how do we do that locally? Let run the following command

```shell script
sam local start-api -t template.yaml -p 3000
```

Lets break this one down as well
- `sam` we're running the AWS SAM CLI
- `local` we're telling sam to spin something up locally
- `start-api` tells sam to a local http server
- `-t template.yml` tells sam what formation template to use so sam knows how to setup your lambdas
- `-p 3000` tells sam what port to expose the local http server on

Now that your lambdas are deployed to localstack and are exposed on port 3000, try calling the endpoint using curl, wget or postman.

```http request
http://localhost:3000/accounts/user?id=1  Will return the user John Smith
http://localhost:3000/accounts/user?id=2  Will return a user not found error
http://localhost:3000/accounts/user       Will return a no id param error
```

### 6. Challenges
1. Following the code structure and formation template patterns seen here. Have a go at writing and deploying a lamdba with the AWS SAM CLI. 
2. Going even further. AWS offers so much than running lambdas. Try integrating your lambda with another AWS service running on localstack. 

## Extending and contributing
Want to extend this repo and provide more info on using AWS services locally? Fork and raise a PR, it will be reviewed and considered for merging. 


License
=======
This code is open source software licensed under the Apache 2.0 License