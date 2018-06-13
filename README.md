## CLEAR CODE TAKS 

This Repository contains code of application that reads Reddit feed and mock commenting behaviour.

To run applicationplease follow these steps in your terminal:

```bash
cd .docker
cp .env.propduction.dist .env
cp docker-compose.yml.dist docker-compose.yml
docker-compose up -d
```

To check container logs you can use:
```bash 
docker logs clearcodetask_node_1 -f
```

To kill container please use:
```bash
 docker-compose down
```

Also if you don't want to use **docker** you can run:  
```bash
export NODE_ENV=production
yarn
```
in main application directory.
