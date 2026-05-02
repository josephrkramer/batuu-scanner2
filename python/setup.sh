#! /bin/bash

sudo apt update
sudo apt install ghostscript python3-pip python3-venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
