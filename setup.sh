echo "Installing dependencies"

npm --prefix backend/ install
npm --prefix client/ install

echo "To run: do npm run start in both client/ and backend/ folders (in 2 different terminals)"
