echo "Cleaning out the old builds"
rm -rf client/build
rm -rf testing/nginx/build
# clean out the old build folder

echo "Creating a new production build"
# create a production react build
npm run --silent --prefix client/ build > /dev/null
# set up production react build to be served by nginx
cp -r client/build ./testing/nginx/build

echo "Rebuilding container with new production build"
# build the container
docker-compose -f .test-container-compose up --build
