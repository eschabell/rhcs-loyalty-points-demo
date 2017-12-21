Customer Travel Loyalty Points Demo
===================================
Experience the wonders of Blockchain and crypto ledger open technology based on Ethereum project as used to ensure the transfer of 
a travel agencies customer loyalty programs points safely to other third-party programs.

This demo installs on any OpenShift Container Platform (v3.7+) and leverages a node.js application and ethereum blockchain 
technology to access the crypto ledger and manipulate customer loyalty points in a fully trusted and secure fashion.


Step 1: Install Customer Loyalty Points project on OpenShift
------------------------------------------------------------
1. First ensure you have an OpenShift container based installation, such as one of the following installed first:

  - [OCP Install Demo](https://github.com/redhatdemocentral/ocp-install-demo)

  - or your own OpenShift installation.

2. [Download and unzip this demo.](https://github.com/eschabell/rhcs-loyalty-points-demo/archive/master.zip)

3. Run 'init.sh' or 'init.bat' file. 'init.bat' must be run with Administrative privileges:
```
   # The installation needs to be pointed to a running version
   # of OpenShift, so pass an IP address such as:
   #
   $ ./init.sh 192.168.99.100  # example for OCP.
```

Project and application installed. Access the loyalty points Node.js application at address provided by installation
script, such as:

  - http://dapp-ethe-demo.192.168.99.100.nip.io    


Notes
-----

Should your local network DNS not handle the resolution of the above address, giving you page not found errors, you can apply the
following to your local hosts file:

```
$ sudo vi /etc/hosts

# add host for OCP demo resulution
192.168.99.100   dapp-ethe-demo.192.168.99.100.nip.io 
```

-----

This project can be installed on any OpenShift platform, such as the OpenShift Container Platform. It's possible to install it on any available installation by pointing this installer to an OpenShift IP address:
```
  $ ./init.sh IP
```

-----


Supporting Articles
-------------------
TBD...


Released versions
-----------------
See the tagged releases for the following versions of the product:

- v1.0 - Node.js 6 app, blockchain setup using Ethereum project, and customer loyalty points demo on any OpenShift installation.


![OCP DEMO](https://github.com/eschabell/rhcs-loyalty-points-demo/blob/master/docs/demo-images/ocp-demo.png)

![OCP APP](https://github.com/eschabell/rhcs-loyalty-points-demo/blob/master/docs/demo-images/ocp-app.png)

![OCP OVERVIEW](https://github.com/eschabell/rhcs-loyalty-points-demo/blob/master/docs/demo-images/ocp-overview.png)

![OCP MONITORING](https://github.com/eschabell/rhcs-loyalty-points-demo/blob/master/docs/demo-images/ocp-monitoring.png)

![Cloud Suite](https://github.com/eschabell/rhcs-loyalty-points-demo/blob/master/docs/demo-images/rhcs-arch.png)
