BASE_URL="http://localhost:5500"

run:
	docker run --rm -v $(shell pwd)/src:/usr/share/nginx/html:ro -p 5500:80 -d nginx

stop kill:
	docker kill $(shell docker ps -q)

test:
	BASE_URL=${BASE_URL} python3 tests/test.py

local:
	BASE_URL=${BASE_URL}/src/ python3 tests/test.py
