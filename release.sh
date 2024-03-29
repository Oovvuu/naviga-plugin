#!/bin/bash

set -e
# Configures a built branch for release

# Check for passed argument(s).
if [[ ${#} -eq 1 ]]; then
  # Step 1: Create the {version}-built branch
  git checkout production && git pull
  git checkout -B "v${@}-built"

  # Step 2: Remove .gitignore and use .deployignore
  rm .gitignore
  mv .deployignore .gitignore

  # Step 3: Remove all unnecessary files
  git ls-files -i --exclude-from=.gitignore | xargs git rm --cached

  # Step 4: Build the plugin
  npm ci
  npm run build
fi
