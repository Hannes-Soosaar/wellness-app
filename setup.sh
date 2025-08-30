#!/bin/bash
set -e


echo "The script will install and launch the wellness-app project. This require SUDO privileges on multiple occasions \n you can choose to keep the privileges alive throuhout the setup process. "
read -p "Give  sudo permission and continue with the setup (y/n)n): "node_answer
if [[ "$node_answer" =~ ^[Yy]$ ]]; then
sudo -v
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &
else
    echo "The script will continue, but sudo password will be required multiple times."
fi



echo "Updating system..."
sudo apt-get update -y
sudo apt-get upgrade -y

###############################################
# Install Node.js 20.x (NodeSource)
###############################################
echo "Your current Node.js version: $(node -v 2>/dev/null || echo "Not installed")"
echo "Your current npm version: $(npm -v 2>/dev/null || echo "Not installed")"

read -p "Do you want to Install/Update Node.js? (y/n): "node_answer
if [[ "$node_answer" =~ ^[Yy]$ ]]; then
    echo "Continuing..."
    sudo apt install -y nodejs
else
    echo "Exiting..."
fi

###############################################
# Install Docker
###############################################
echo "Your current Docker version: $(docker --version 2>/dev/null || echo "Not installed")"

read -p "Do you want Install/Update Docker? (y/n): " docker_answer
if [[ "$docker_answer" =~ ^[Yy]$ ]]; then
    echo "Continuing..."
# 1. Remove old versions
sudo apt-get remove docker docker-engine docker.io containerd runc

# 2. Update apt
sudo apt-get update

# 3. Install dependencies
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 4. Add Docker’s official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 5. Set up the repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 6. Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 7. Verify installation
docker --version
else
    echo "Exiting..."
fi

###############################################
# Install Make 
###############################################

echo "Your current Make version: $(make --version 2>/dev/null | head -n 1 || echo "Not installed")"
read -p "Do you want Install/Update Make? (y/n): " make_answer
if [[ "$make_answer" =~ ^[Yy]$ ]]; then
    echo "Continuing..."
    sudo apt install make
    else
    echo "Did not install Make"
fi


###############################################
# Set Make executable permissions 
###############################################

read -p "Make, the makefile executable? (y/n): " make_exe_answer
if [[ "$make_exe_answer" =~ ^[Yy]$ ]]; then
    echo "Continuing..."
    sudo chmod +x makefile
    else
    echo "Did not install Make"
fi


###############################################
# Install instal the frontend dependencies
###############################################


read -p "Do you want to install the frontend dependencies? (y/n): " fe_dep_answer
if [[ "$fe_dep_answer" =~ ^[Yy]$ ]]; then
    echo "Continuing..."
 cd frontend
 npm install
 cd ..
    else
    echo "The Frontend was not setup, set it up manually"
fi


###############################################
# Install instal the backend dependencies
###############################################


read -p "Do you want to install the backend dependencies? (y/n): " be_dep_answer
if [[ "$be_dep_answer" =~ ^[Yy]$ ]]; then
    echo "Continuing..."
 cd backend
 npm install
 cd ..
    else
    echo "The backend was not setup, set it up manually"
fi


###############################################
# Install the DB
###############################################


read -p "Do you want launch the database? (y/n): " db_inst_answer
if [[ "$db_inst_answer" =~ ^[Yy]$ ]]; then
    echo "Continuing..."
    sudo make up
    else
    echo "database not setup, set it up manually"
fi


###############################################
# Start Frontend in the background
###############################################
read -p "Do you want to start the Frontend (FE)? (y/n): " fe_start_answer
if [[ "$fe_start_answer" =~ ^[Yy]$ ]]; then
    echo "Starting Frontend in background..."
    make startFe &
    echo "Frontend started. Logs are in frontend.log"
else
    echo "Skipping Frontend start"
fi

###############################################
# Start Backend in the foreground
###############################################
read -p "Do you want to start the Backend (BE)? (y/n): " be_start_answer
if [[ "$be_start_answer" =~ ^[Yy]$ ]]; then
    echo "Starting Backend in foreground..."
    cd backend
    make startBe
else
    echo "Skipping Backend start"
fi


echo "Setup complete."
echo "To start the application once closed check the makefile for commands"

exit 0