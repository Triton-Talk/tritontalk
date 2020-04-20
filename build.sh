echo "Cleaning out the old builds"
# clean out the old build folder

echo "Creating a new production build"
# create a production react build
npm run --silent --prefix client/ build > /dev/null
# set up production react build to be served by nginx
cp -r client/build .

echo "Rebuilding container with new production build"
# build the container
docker build -t tttvlw-production backend/
docker tag tritontalk/tritontalk
docker push tritontalk/tritontalk
