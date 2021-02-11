NPM ?= npm

.PHONY: compile
compile : node_modules/
	./node_modules/.bin/tsc \
		--outDir bin \
		-p .;
	
node_modules/ : 
	$(NPM) install;

.PHONY: lint
lint : node_modules/
	./node_modules/.bin/tslint \
		--fix \
		-c ./tslint.json \
		'src/**/*.ts';

.PHONY: clean
clean :
	rm -fv ./package-lock.json;
	rm -rfv ./node_modules/;
	rm -fv ./bin/;

.PHONY: monitor
monitor : node_modules/
	./node_modules/.bin/nodemon \
		--ext ts \
		--watch src/ \
		--exec "/usr/bin/make monitor-reload";

.PHONY: monitor-reload
monitor-reload : node_modules/
	$(MAKE) compile;
	. ./run;