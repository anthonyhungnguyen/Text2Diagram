#!/bin/bash

poetry run gunicorn -c gunicorn_config.py main:app