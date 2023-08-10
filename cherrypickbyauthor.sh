#!/usr/bin/env bash

# this script isn't working well. It gets confused if any individual cherry pick results in a merge conflict

if [ -z ${1} ]
then
    echo "Enter first argument which is author name";
    exit
fi
if [ -z ${2} ]
then 
    echo "enter second argument which is in which branch you want these commits to go"
    exit
fi

echo "Cherry picking commit for user ${1} from branch $(git symbolic-ref --short -q HEAD) will put into ${2}" ;

git log --committer=${1} --format=format:%H > ../cherry-pick.txt
git checkout ${2}
for commit in $(tail -r ../cherry-pick.txt) ; do
  hash=$(echo ${commit} | cut -d$'\t' -f 1)
  printf "${hash}\n"
  git cherry-pick ${hash}
  done