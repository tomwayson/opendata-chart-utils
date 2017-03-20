#!/bin/bash

# config
BRANCH=$(git rev-parse --abbrev-ref HEAD)
VERSION=$(node --eval "console.log(require('./package.json').version);")
NAME=$(node --eval "console.log(require('./package.json').name);")

# build and test
npm run test || exit 1

# checkout temp branch for release
git checkout -b gh-release

# force add files
git add dist -f

# commit changes with a versioned commit message
git commit -m "build $VERSION"

# push commit so it exists on GitHub when we run gh-release
git push origin gh-release

# create a ZIP archive of the dist files
zip -r $NAME-v$VERSION.zip dist

# run gh-release to create the tag and push release to github
gh-release --assets $NAME-v$VERSION.zip

# checkout prev branch and delete release branch locally and on GitHub
git checkout $BRANCH
git branch -D gh-release
git push origin :gh-release

# re-run build in prev branch before publishing
npm run build:release

# publish release on NPM
npm publish
