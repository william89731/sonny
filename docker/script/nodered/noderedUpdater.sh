#!/bin/bash

CONTAINER_NAME=nodered; #set name container
DIRECTORY=/home/$USER/docker/.nodered; # set directory nodered
BASE_DIR=${BASE_DIR:-${DIRECTORY}}; 
function info { echo -e "\e[32m[info] $*\e[39m"; }
function warn  { echo -e "\e[33m[warn] $*\e[39m"; }
function error { echo -e "\e[31m[error] $*\e[39m"; exit 1; }

echo "
███╗   ██╗ ██████╗ ██████╗ ███████╗██████╗ ███████╗██████╗ 
████╗  ██║██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗
██╔██╗ ██║██║   ██║██║  ██║█████╗  ██████╔╝█████╗  ██║  ██║
██║╚██╗██║██║   ██║██║  ██║██╔══╝  ██╔══██╗██╔══╝  ██║  ██║
██║ ╚████║╚██████╔╝██████╔╝███████╗██║  ██║███████╗██████╔╝
╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚═════╝ 
"

sleep 2

if [[ -z $BASE_DIR ]]; then
  warn "directory nodered not set"
  sleep 2
  echo -n "set directory nodered or ctl+c to esc: ";
  read;
  BASE_DIR=${BASE_DIR:-${REPLY}}

fi  

sleep 2

info "check directory..."

sleep 2

if [[ -d $BASE_DIR ]]; then
  info "ok"
else 
  error "directory not found";
fi  

info "you are about to update nodered nodes..."

sleep 2

info "let's start"

sleep 2

cd $BASE_DIR

ncu

ncu -u 

npm install

#npm outdated

#npm update

info "check type installation..."

sleep 2

if [[ -n $CONTAINER_NAME ]]; then
  info "nodered dockerized"
  sleep 2
  docker restart $CONTAINER_NAME
#  docker logs $CONTAINER_NAME
else 
  info "nodered installed with npm"
  sleep 2
  node-red-restart

fi  

sleep 2

echo "
 ██████╗  ██████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███████╗██╗
██╔════╝ ██╔═══██╗██╔═══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝██╔════╝██║
██║  ███╗██║   ██║██║   ██║██║  ██║██████╔╝ ╚████╔╝ █████╗  ██║
██║   ██║██║   ██║██║   ██║██║  ██║██╔══██╗  ╚██╔╝  ██╔══╝  ╚═╝
╚██████╔╝╚██████╔╝╚██████╔╝██████╔╝██████╔╝   ██║   ███████╗██╗
 ╚═════╝  ╚═════╝  ╚═════╝ ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝╚═╝
"