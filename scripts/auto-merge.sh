#!/bin/bash

if [ "$TRAVIS_BRANCH" != "build" ]; then 
    exit 0;
fi

export GIT_COMMITTER_EMAIL=""
export GIT_COMMITTER_NAME="traviscibot"

git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* || exit
git fetch --all || exit

git checkout master || exit
git merge --no-ff "$TRAVIS_COMMIT" || exit

git push @github.com/">https://${GITHUB_TOKEN}@github.com/becksteadn/glimpseid.git