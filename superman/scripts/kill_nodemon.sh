#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Use this script to kill nodemon processes.
#
# call this script like this:
#   $ ./kill_nodedemon.sh app.js
#
# That will kill any program that was run with "nodedemon app.js"

source $DIR/get_os.sh

COLS_PARAM="--cols"
if [[ $IS_MAC == "1" ]]; then
    COLS_PARAM="-cols"
fi

set +x
echo "killing these processes:"
ps -ef $COLS_PARAM 6000 | grep "node $1" | grep -v "grep" | grep -v "kill_nodemon"
ps -ef $COLS_PARAM 6000 | grep "nodemon $1" | grep -v "grep" | grep -v "kill_nodemon"
set -x
ps -ef $COLS_PARAM 6000 | grep "nodemon $1" | grep -v "grep" | grep -v "kill_nodemon" | awk -F " " '{print $2}' | xargs kill || true
ps -ef $COLS_PARAM 6000 | grep "node $1" | grep -v "grep" | grep -v "kill_nodemon" | awk -F " " '{print $2}' | xargs kill || true
set +x
