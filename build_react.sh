echo "Creating a new production build"
# create a production react build
npm run --silent --prefix client/ build > /dev/null
# set up production react build to be served by nginx
cp -r client/build ./build

echo "press y to copy the new react build to the server"
read -n1 answer

if [[ $answer == 'y' ]]; then
    scp -r ./build jack@tritontalk.com:~/build_$USER
fi
