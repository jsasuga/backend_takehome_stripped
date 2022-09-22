#!/bin/bash

NODE_VERSION=v16.13.2
NPM_VERSION=8.1.2

install_n () {
    sudo npm install -g n

    # make cache folder (if missing) and take ownership
    sudo mkdir -p /usr/local/n
    sudo chown -R $(whoami) /usr/local/n
    # make sure the required folders exist (safe to execute even if they already exist)
    sudo mkdir -p /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
    # take ownership of Node.js install destination folders
    sudo chown -R $(whoami) /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
}

# You want this version to be your default node version.
#
# Make sure that `node -v` returns this version. If it does not, you can try a few things.
#
# Attempt One:
#  - run this command twice - once to install and once to set it as the default
#
# Attempt Two:
#  - run this command in your .bashrc
#
# Attempt Three:
#  - remove any pre-existing node installations
install_node () {
    n $NODE_VERSION
    # run twice on purpose
    n $NODE_VERSION
}

check_versions () {
    echo
    echo "checking versions..."
    if [[ $(npm -v) != "$NPM_VERSION" ]]; then
        echo "your default version of npm is incorrect; you have $(npm -v)"
        echo "you need to do some manual work"
    else
        echo "your npm version is correct"
    fi
    if [[ $(node -v) != "$NODE_VERSION" ]]; then
        echo "your default version of node is incorrect; you have $(node -v)"
        echo "you need to do some manual work"
    else
        echo "your node version is correct"
    fi
}

install_n
install_node
check_versions
