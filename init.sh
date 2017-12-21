#!/bin/sh 
DEMO="Customer Loyalty Points Demo"
AUTHORS="Andrew Block, Eric D. Schabell, Woh Shon Phoon"
PROJECT="git@github.com:redhatdemocentral/rhcs-loyalty-points-demo.git"

# Adjust these variables to point to an OCP instance.
OPENSHIFT_USER=openshift-dev
OPENSHIFT_PWD=devel
HOST_IP=yourhost.com
OCP_DESCRIPTION="Blockchain Customer Loyalty Points"
OCP_PRJ=ethe-demo
OCP_BOOT=bootnode
OCP_PVT=pvt
OCP_APP=dapp

# prints the documentation for this script.
function print_docs() 
{
	echo "This project can be installed on any OpenShift platform, such as OpenShift"
	echo "Container Platform or Red Hat Container Development Kit. It's possible to"
	echo "install it on any available installation by pointing this installer to an"
	echo "OpenShift IP address:"
	echo
	echo "   $ ./init.sh IP"
	echo
	echo "If using Red Hat OCP, IP should look like: 192.168.99.100"
	echo
}

# check for a valid passed IP address.
function valid_ip()
{
	local  ip=$1
	local  stat=1

	if [[ $ip =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
		OIFS=$IFS
		IFS='.'
		ip=($ip)
		IFS=$OIFS
		[[ ${ip[0]} -le 255 && ${ip[1]} -le 255 && ${ip[2]} -le 255 && ${ip[3]} -le 255 ]]
		stat=$?
	fi

	return $stat
}

# wipe screen.
clear 

echo
echo "#######################################################################"
echo "##                                                                   ##"   
echo "##  Setting up the ${DEMO}                      ##"
echo "##                                                                   ##"   
echo "##                                                                   ##"   
echo "##  ####  #      ###   #### #   #  #### #   #  ###  ##### #   #      ##"
echo "##  #   # #     #   # #     #  #  #     #   # #   #   #   ##  #      ##"
echo "##  ####  #     #   # #     ###   #     ##### #####   #   # # #      ##"
echo "##  #   # #     #   # #     #  #  #     #   # #   #   #   #  ##      ##"
echo "##  ####  #####  ###   #### #   #  #### #   # #   # ##### #   #      ##"
echo "##                                                                   ##"   
echo "##  brought to you by,                                               ##"   
echo "##             ${AUTHORS}        ##"
echo "##                                                                   ##"   
echo "##  ${PROJECT}    ##"
echo "##                                                                   ##"   
echo "#######################################################################"
echo

# validate OpenShift host IP.
if [ $# -eq 1 ]; then
	if valid_ip "$1" || [ "$1" == "$HOST_IP" ]; then
		echo "OpenShift host given is a valid IP or matches HOST_IP variable..."
		HOST_IP=$1
		echo
		echo "Proceeding with OpenShift host: $HOST_IP..."
		echo
	else
		# bad argument passed.
		echo "Please provide a valid IP that points to an OpenShift installation..."
		echo
		print_docs
		echo
		exit
	fi
elif [ $# -gt 1 ]; then
	print_docs
	echo
	exit
else
	# no arguments, prodeed with default host.
	print_docs
	echo
	exit
fi

# make some checks first before proceeding.	
command -v oc -v >/dev/null 2>&1 || { echo >&2 "OpenShift command line tooling is required but not installed yet... download here: https://access.redhat.com/downloads/content/290"; exit 1; }

echo "OpenShift commandline tooling is installed..."
echo 
echo 
echo "Logging in to OpenShift as system:admin..."
echo
oc login -u system:admin

if [ "$?" -ne "0" ]; then
	echo
	echo "Error occurred during 'oc login' command!"
	exit
fi

echo
echo "Setting up cluster admin rights..."
echo
oc adm policy add-scc-to-user anyuid -z default -n "$OCP_PRJ"

if [ "$?" -ne "0" ]; then
	echo
	echo "Error occurred during setup cluster admin rights!"
	exit
fi

echo
echo "Logging in to OpenShift as $OPENSHIFT_USER..."
echo
oc login "$HOST_IP":8443 --password="$OPENSHIFT_PWD" --username="$OPENSHIFT_USER"

if [ "$?" -ne "0" ]; then
	echo
	echo "Error occurred during 'oc login' command!"
	exit
fi

echo
echo "Creating a new project..."
echo
oc new-project "$OCP_PRJ" --display-name="$OCP_DESCRIPTION" --description="Blockchain crypto ledger example based on Ethereum
project for travel customer loyalty points program demo."

echo
echo "Setting up a new app..."
echo
oc delete bc "$OCP_APP" -n "$OCP_PRJ" >/dev/null 2>&1
oc delete imagestreams "$OCP_APP" >/dev/null 2>&1
oc new-app wohshon/go-ethereum:"$OCP_BOOT" --name="$OCP_BOOT"

if [ "$?" -ne "0" ]; then
	echo
	echo "Error occurred during 'oc new-app' command!"
	exit
fi

# need to wait a bit for new app to deploy.
sleep 20 

echo
echo "Deploying private chain..."
echo 
oc new-app wohshon/go-ethereum:private --name="$OCP_PVT" -e "$OCP_BOOT"=$(oc get svc "$OCP_BOOT" |  sed '1d' | awk '{print $2}' )

if [ "$?" -ne "0" ]; then
	echo
	echo "Error occurred during deployment of private chain!"
	exit
fi

echo
echo "Creating an externally facing route by exposing a service..."
echo
oc expose service "$OCP_PVT"

if [ "$?" -ne "0" ]; then
	echo
	echo "Error occurred during 'oc expose service' command!"
	exit
fi

echo
echo "Deploying an S2I node.js customer loyalty application..."
echo
oc new-app --name=$OCP_APP https://gitlab.com/destinasia/destinasia-repo.git --context-dir=$OCP_APP 

if [ "$?" -ne "0" ]; then
	echo
	echo "Error occurred during S2I node.js 'oc new-app' command!"
	exit
fi

echo
echo "Creating an externally facing route by exposing a service..."
echo
oc expose service $OCP_APP

if [ "$?" -ne "0" ]; then
	echo
	echo "Error occurred during 'oc expose service' command!"
	exit
fi

echo
echo "========================================================================================="
echo "=                                                                                       ="
echo "=  This completes the Customer Loyalty Points demo installation, the customer loyalty   ="
echo "=  points app can be found here:                                                        ="
echo "=                                                                                       ="
echo "=      http://$OCP_APP-$OCP_PRJ.$HOST_IP.nip.io                                    ="
echo "=                                                                                       ="
echo "=  The blockchain end point that the node.js application uses is here:                  ="
echo "=                                                                                       ="
echo "=      http://pvt-$OCP_PRJ.$HOST_IP.nip.io                                       ="
echo "=                                                                                       ="
echo "=  Note: it takes a few minutes to expose the service...                                ="
echo "=                                                                                       ="
echo "========================================================================================="

