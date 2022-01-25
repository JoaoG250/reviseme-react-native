lint:
	python -m flake8 --ignore=E203,E501,W503 ./api
	python -m black ./ --check

black:
	python -m black ./
