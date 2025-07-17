## Ways to manually start the system.

Purpose	            Command	                                                Notes
Dev Run	            npx tsx src/index.ts	                                No build needed, runs TS directly
Dev + Watch	        npx nodemon --exec "npx tsx src/index.ts"	            Live reload
Build for Prod	    npx tsc	                                                Emits .js into dist/
Run on Server	    node dist/index.js	                                    Uses the compiled JavaScript
