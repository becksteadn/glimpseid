run:
	docker run --rm -v $(shell pwd):/usr/share/nginx/html:ro -p 5500:80 nginx
	#docker run -t --rm -v "$PWD":/usr/src/app -p "5500:4000" starefossen/github-pages