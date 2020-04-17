local-lambdas
=============
A test project demonstrating how to publish your lambdas to a localstack instance


## Prerequistes
- Docker and docker compose
- Localstack; our AWS simulator


## What do?

### 1. Localstack
Localstack is our AWS simulator, find out more [here](https://github.com/localstack/localstack). For this guide we're interested in the fact that localstack can run Lambdas locally. 

In the root of the project we have a docker compose file. Here we've defined how to boot the localstack docker image. Open a terminal in the project dir and run

```shell script
docker-compose up -d
```



License
=======
This code is open source software licensed under the Apache 2.0 License