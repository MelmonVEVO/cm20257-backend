.PHONY: lint

.PHONY: compile
compile : node_modules/
	./node_modules/.bin/tsc \
		--outDir bin \
		-p .;

node_modules/ : 
	$(NPM) install;

lint : node_modules/
	./node_modules/.bin/tslint \
		--fix \
		-c ./tslint.json \
		'src/**/*.ts';