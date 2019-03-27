run:
	docker run --rm -v $(shell pwd)/src:/usr/share/nginx/html:ro -p 5500:80 -d nginx

stop kill:
	docker kill $(shell docker ps -q)