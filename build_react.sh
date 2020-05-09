echo "Removing old production build"
rm -rf client/build testing/nginx/build
echo 
echo

echo "Creating a new production build, this will take a while!"
# create a production react build
npm run -prefix client/ build

cp -r client/build testing/nginx/
echo
echo

echo "Making new docker images for your changes"

docker build -t tritontalk/tritontalk:frontend testing/nginx
docker push tritontalk/tritontalk:frontend

echo "press y to copy the new react build to the server"
read -n1 answer

if [[ $answer == 'y' ]]; then
    scp -r ./client/build jack@tritontalk.com:~/build_$USER
fi
