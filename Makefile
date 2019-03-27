run:
	docker run --rm -v $(shell pwd):/usr/share/nginx/html:ro -p 5500:80 -d nginx

stop:
	docker kill $(shell docker ps -q)