# copyDir src dst
copyDir() {
  if [ -d $2 ]; then
    rm -rf $2
  fi
  for path in $(ls $1)
  do
    if [ -d "$1/$path" ]; then
      copyDir "$1/$path" "$2/$path"
    fi 
    if [ -f "$1/$path" ] && [[ ! $path =~ '.spec.' ]]; then
      if [ ! -d $2 ]; then
        mkdir -p $2
      fi
      cp "$1/$path" "$2/$path"
    fi
  done
}

linkDir() {
  if [ -L $2 ]; then
    unlink $2
  fi
  curpath=$(pwd)
  abspath=$(cd $1;pwd)
  cd $curpath
  ln -sv $abspath $2
}
