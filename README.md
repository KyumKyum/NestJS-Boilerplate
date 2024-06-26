
## NestJS Boilerplate
#### Customized by Jay Lim (for personnal uses.)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align='center'>
<img alt="Typescript" src ="https://img.shields.io/badge/Typescript-3178C6.svg?&style=for-the-badge&logo=Typescript&logoColor=white"/>
<img alt="PostgreSQL" src ="https://img.shields.io/badge/PostgreSQL-4169E1.svg?&style=for-the-badge&logo=PostgreSQL&logoColor=white"/>
<img alt="Redis" src ="https://img.shields.io/badge/Redis-DC382D.svg?&style=for-the-badge&logo=Redis&logoColor=white"/>
<img alt="TypeORM" src ="https://img.shields.io/badge/TypeORM-FFA500.svg?&style=for-the-badge&logo=TypeOrm&logoColor=white"/>
<img alt="Passport" src ="https://img.shields.io/badge/Passport-34E27A.svg?&style=for-the-badge&logo=passport&logoColor=white"/>
<img alt="Swagger" src ="https://img.shields.io/badge/Swagger-85EA2D.svg?&style=for-the-badge&logo=swagger&logoColor=black"/>
<img alt="Docker / Docker Compose" src ="https://img.shields.io/badge/Docker / Docker Compose-2496ED.svg?&style=for-the-badge&logo=Docker&logoColor=white"/>
<img alt="Kubernetes" src ="https://img.shields.io/badge/Kubernetes-326CE5.svg?&style=for-the-badge&logo=Kubernetes&logoColor=white"/>
<img alt="Terraform" src ="https://img.shields.io/badge/Terraform-844FBA.svg?&style=for-the-badge&logo=Terraform&logoColor=white"/>
</p>

#### Installation

```bash
$ npm install
```

#### Before Start
###### 1. Dev - ProstgresQL, Redis
```bash
sh src/script/setup.sh
```
###### 2. Dev - PostgresQL, Redis, Kafka
```bash
docker compose up -d
```
> Don't forget to shut down all containers after developement! (docker compose down)

#### Running the app

```bash
# For development
$ npm run start:dev

# For production
$ npm run start:prod
```

#### Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

 This boilerplate had been inspired by code from [nestjs-boilerplate](https://github.com/brocoders/nestjs-boilerplate). I made this boilerplate for my personal uses. 
