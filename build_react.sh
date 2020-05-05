echo "Removing old production build"
rm -rf client/build testing/nginx/build

echo "Creating a new production build"
# create a production react build
npm run --silent --prefix client/ build > /dev/null

echo "press y to copy the new react build to the server"
read -n1 answer

if [[ $answer == 'y' ]]; then
    scp -r ./client/build jack@tritontalk.com:~/build_$USER
fi
